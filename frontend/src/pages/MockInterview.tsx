import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getInterviewById } from '../services/interview.service';
import { Button } from '../components/ui/Button';
import { Send, LogOut, CheckCircle, Video, Mic, MicOff } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MockInterview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interviewStatus, setInterviewStatus] = useState<string>('In Progress');
  const [feedback, setFeedback] = useState<any>(null);
  
  // Voice / Video State
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  const isVideoModeRef = useRef(isVideoMode);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [isVideoMode, mediaStream]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: interview, isLoading } = useQuery({
    queryKey: ['interview', id],
    queryFn: () => getInterviewById(id as string),
    enabled: !!id,
  });

  useEffect(() => {
    isVideoModeRef.current = isVideoMode;
  }, [isVideoMode]);

  useEffect(() => {
    if (interview && messages.length === 0) {
      // Filter out the initial system prompt from UI
      const uiMessages = interview.messages.filter((m: any) => m.role !== 'system');
      setMessages(uiMessages);
      setInterviewStatus(interview.status);
      if (interview.feedback) setFeedback(interview.feedback);
    }
  }, [interview]);

  // Setup Speech Recognition
  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setInputMessage((prev) => prev + finalTranscript + ' ');
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      // Cleanup media tracks and speech synthesis on unmount
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }

      window.speechSynthesis?.cancel();
    };
  }, []);

  const speak = (text: string) => {
    if (isVideoModeRef.current && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVideoMode = async () => {
    if (!isVideoMode) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMediaStream(stream);
        setIsVideoMode(true);
      } catch (error) {
        console.error("Error accessing media devices", error);
        alert("Could not access camera/microphone. Please grant permissions.");
      }
    } else {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      setMediaStream(null);
      setIsVideoMode(false);
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
      window.speechSynthesis?.cancel();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  useEffect(() => {
    if (!id || interviewStatus === 'Completed') return;

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket');
      newSocket.emit('join_interview', { interviewId: id });
    });

    newSocket.on('receive_message', (message: any) => {
      setMessages((prev) => [...prev, message]);
      if (message.role === 'ai') {
        setIsTyping(false);
        speak(message.content);
      }
    });

    newSocket.on('interview_ended', (data: any) => {
      setInterviewStatus('Completed');
      setFeedback(data.feedback);
      setIsTyping(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [id, interviewStatus]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !socket || interviewStatus === 'Completed') return;

    // If using auto-listen, we could stop listening while sending, but let's keep it manual
    socket.emit('send_message', { interviewId: id, message: inputMessage });
    setInputMessage('');
    setIsTyping(true);
  };

  const handleEndInterview = () => {
    if (window.confirm('Are you sure you want to end the interview? The AI will generate your feedback.')) {
      setIsTyping(true);
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        setMediaStream(null);
      }
      setIsVideoMode(false);
      window.speechSynthesis?.cancel();
      socket?.emit('end_interview', { interviewId: id });
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-[#0A0F1C] relative">
      {/* Floating Video Element */}
      <AnimatePresence>
        {isVideoMode && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-8 w-64 h-48 bg-black rounded-xl overflow-hidden shadow-2xl border-4 border-primary/20 z-50"
          >
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }} // Mirror the local video
            />
            {isListening && (
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 px-2 py-1 rounded text-xs text-white">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Listening</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="h-16 bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shadow-sm z-10">
        <div>
          <h1 className="font-bold text-gray-900 dark:text-white">Mock Interview: {interview?.jobRole}</h1>
          <p className="text-xs text-gray-500">{interview?.company} • {interview?.difficulty} • {interview?.type}</p>
        </div>
        <div className="flex space-x-3">
          {interviewStatus !== 'Completed' && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleVideoMode} 
              className={isVideoMode ? "text-primary border-primary bg-primary/10" : ""}
            >
              <Video size={16} className="mr-2" /> {isVideoMode ? "Disable Video Mode" : "Start Video Mode"}
            </Button>
          )}
          {interviewStatus !== 'Completed' ? (
            <Button variant="outline" size="sm" onClick={handleEndInterview} className="text-danger border-danger hover:bg-danger/10">
              <LogOut size={16} className="mr-2" /> End Interview
            </Button>
          ) : (
            <Button size="sm" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          )}
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6 flex flex-col">
          
          {interviewStatus === 'Completed' && feedback && (
             <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-4 shadow-sm"
             >
               <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4 flex items-center">
                 <CheckCircle className="mr-2" /> Interview Completed - Feedback
               </h2>
               <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="bg-white dark:bg-card-dark p-4 rounded-lg text-center shadow-sm">
                   <p className="text-sm text-gray-500">Overall Score</p>
                   <p className="text-2xl font-bold text-primary">{feedback.overallScore}/100</p>
                 </div>
                 <div className="bg-white dark:bg-card-dark p-4 rounded-lg text-center shadow-sm">
                   <p className="text-sm text-gray-500">Technical</p>
                   <p className="text-2xl font-bold text-blue-600">{feedback.technicalScore}/100</p>
                 </div>
                 <div className="bg-white dark:bg-card-dark p-4 rounded-lg text-center shadow-sm">
                   <p className="text-sm text-gray-500">Communication</p>
                   <p className="text-2xl font-bold text-purple-600">{feedback.communicationScore}/100</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Strengths</h3>
                   <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                     {feedback.strengths?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                   </ul>
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Areas for Improvement</h3>
                   <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                     {feedback.weaknesses?.map((w: string, i: number) => <li key={i}>{w}</li>)}
                   </ul>
                 </div>
               </div>
               
               <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Actionable Suggestions</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    {feedback.suggestions?.map((s: string, i: number) => <li key={i}>{s}</li>)}
                  </ul>
               </div>
             </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
              className="flex justify-start"
            >
              <div className="bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 p-4 rounded-2xl rounded-tl-sm shadow-sm flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      {interviewStatus !== 'Completed' && (
        <footer className="bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end space-x-4">
            {isVideoMode && (
              <Button 
                type="button" 
                variant="outline"
                onClick={toggleListening} 
                title="Tap to speak"
                className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all ${isListening ? 'bg-red-50 border-red-500 text-red-500 animate-pulse' : ''}`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </Button>
            )}
            
            <div className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-shadow">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e as any);
                  }
                }}
                placeholder={isListening ? "Listening... (speak now)" : "Type your response... (Press Enter to send)"}
                className="w-full max-h-32 min-h-[56px] bg-transparent border-none focus:ring-0 resize-none p-4 text-sm dark:text-white"
                rows={1}
              />
            </div>
            
            <Button type="submit" disabled={!inputMessage.trim() || isTyping} className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg">
              <Send size={20} className={inputMessage.trim() && !isTyping ? "ml-1" : ""} />
            </Button>
          </form>
        </footer>
      )}
    </div>
  );
};

export default MockInterview;
