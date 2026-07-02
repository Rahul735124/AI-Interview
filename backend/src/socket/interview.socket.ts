import { Server, Socket } from 'socket.io';
import Interview from '../models/interview.model.js';
import { interactWithAI } from '../services/ai.service.js';

export const setupInterviewSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected to interview socket: ${socket.id}`);

    // Join a specific interview room
    socket.on('join_interview', async ({ interviewId }) => {
      socket.join(interviewId);
      console.log(`Socket ${socket.id} joined interview ${interviewId}`);

      // If the interview has only the system prompt, start it by triggering AI
      try {
        const interview = await Interview.findById(interviewId);
        if (interview && interview.messages.length === 1 && interview.messages[0].role === 'system') {
          // Trigger first AI message
          const aiResponse = await interactWithAI(interview.messages);
          
          const aiMessage = { role: 'ai' as const, content: aiResponse, timestamp: new Date() };
          interview.messages.push(aiMessage);
          await interview.save();

          io.to(interviewId).emit('receive_message', aiMessage);
        }
      } catch (error) {
        console.error('Error initializing interview:', error);
      }
    });

    // Handle user sending a message
    socket.on('send_message', async ({ interviewId, message }) => {
      try {
        const interview = await Interview.findById(interviewId);
        if (!interview) return;

        // Save user message
        const userMessage = { role: 'user' as const, content: message, timestamp: new Date() };
        interview.messages.push(userMessage);
        await interview.save();

        // Emit to room that user sent a message (so other clients if any can sync)
        io.to(interviewId).emit('receive_message', userMessage);

        // Get AI response
        const aiResponse = await interactWithAI(interview.messages);
        
        const aiMessage = { role: 'ai' as const, content: aiResponse, timestamp: new Date() };
        interview.messages.push(aiMessage);
        await interview.save();

        // Send AI message back to room
        io.to(interviewId).emit('receive_message', aiMessage);

      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('error', 'Failed to process message');
      }
    });

    // Handle finishing the interview
    socket.on('end_interview', async ({ interviewId }) => {
      try {
        const interview = await Interview.findById(interviewId);
        if (!interview) return;

        interview.status = 'Completed';
        
        // Generate feedback
        const feedbackPrompt = { 
          role: 'user', 
          content: 'The interview is over. Based on our conversation, provide a strict JSON response with feedback. Expected format: {"overallScore": 85, "communicationScore": 90, "technicalScore": 80, "strengths": ["Clear communication"], "weaknesses": ["Needs more depth"], "suggestions": ["Study React Hooks"]}. No markdown.' 
        };
        const allMessages = [...interview.messages, feedbackPrompt];
        
        const feedbackResponseText = await interactWithAI(allMessages);
        
        try {
          const cleanedText = feedbackResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
          const feedbackJson = JSON.parse(cleanedText);
          interview.feedback = feedbackJson;
        } catch (e) {
          console.error('Failed to parse feedback JSON:', e);
        }

        await interview.save();
        io.to(interviewId).emit('interview_ended', interview);

      } catch (error) {
        console.error('Error ending interview:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected from interview socket: ${socket.id}`);
    });
  });
};
