import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getInterviewById } from '../services/interview.service';
import { Button } from '../components/ui/Button';
import { ChevronLeft, CheckCircle, AlertCircle, BarChart } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const InterviewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: interview, isLoading } = useQuery({
    queryKey: ['interview', id],
    queryFn: () => getInterviewById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  if (!interview || interview.status !== 'Completed') {
    return <div className="p-8">Interview not found or not completed.</div>;
  }

  const { feedback } = interview;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/interviews')} className="px-2">
              <ChevronLeft size={24} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Feedback</h1>
              <p className="text-gray-500">{interview.jobRole} @ {interview.company}</p>
            </div>
          </div>
          <Button onClick={() => navigate('/interviews/new')}>Start New Interview</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overview & Scores */}
          <div className="space-y-8 lg:col-span-1">
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Overall Score</h2>
              <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{name: 'Score', value: feedback.overallScore}, {name: 'Left', value: 100 - feedback.overallScore}]}
                      cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={90} endAngle={-270}
                      dataKey="value" stroke="none"
                    >
                      <Cell fill={feedback.overallScore >= 80 ? '#10B981' : feedback.overallScore >= 60 ? '#F59E0B' : '#EF4444'} />
                      <Cell fill="#F3F4F6" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-4xl font-bold text-gray-900 dark:text-white">
                  {feedback.overallScore}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Technical</p>
                  <p className="text-xl font-bold">{feedback.technicalScore}/100</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Communication</p>
                  <p className="text-xl font-bold">{feedback.communicationScore}/100</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="font-bold mb-4 flex items-center"><BarChart size={18} className="mr-2 text-primary" /> Performance Data</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-500">Difficulty</span>
                  <span className="font-medium text-gray-900 dark:text-white">{interview.difficulty}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 dark:text-white">{interview.type}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">Approx. 15m</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900 dark:text-white">{new Date(interview.createdAt).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feedback details */}
          <div className="space-y-8 lg:col-span-2">
            
            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800/30 p-6">
                <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 flex items-center">
                  <CheckCircle size={20} className="mr-2" /> Key Strengths
                </h3>
                <ul className="space-y-2">
                  {feedback.strengths?.map((s: string, idx: number) => (
                    <li key={idx} className="flex items-start text-sm text-green-900 dark:text-green-300">
                      <span className="mr-2 mt-1 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-800/30 p-6">
                <h3 className="font-bold text-red-800 dark:text-red-400 mb-4 flex items-center">
                  <AlertCircle size={20} className="mr-2" /> Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {feedback.weaknesses?.map((w: string, idx: number) => (
                    <li key={idx} className="flex items-start text-sm text-red-900 dark:text-red-300">
                      <span className="mr-2 mt-1 w-1.5 h-1.5 bg-red-500 rounded-full shrink-0"></span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actionable Suggestions */}
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
               <h3 className="text-xl font-bold mb-4">Actionable Recommendations</h3>
               <div className="space-y-4">
                 {feedback.suggestions?.map((suggestion: string, idx: number) => (
                   <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-primary">
                     <p className="text-sm text-gray-800 dark:text-gray-200">{suggestion}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Transcript Preview */}
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
               <h3 className="text-xl font-bold mb-4">Interview Transcript</h3>
               <div className="space-y-4 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
                 {interview.messages.filter((m: any) => m.role !== 'system').map((msg: any, idx: number) => (
                   <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                     <span className="text-[10px] uppercase font-bold text-gray-400 mb-1 ml-1">{msg.role === 'user' ? 'You' : 'Rahul-InterviewPrep AI'}</span>
                     <div className={`p-3 rounded-xl max-w-[85%] text-sm ${
                       msg.role === 'user' 
                         ? 'bg-primary text-white rounded-tr-sm' 
                         : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                     }`}>
                       {msg.content}
                     </div>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
