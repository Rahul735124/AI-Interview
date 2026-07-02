import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { getMyInterviews, deleteInterview } from '../services/interview.service';
import { MessageSquare, Plus, ChevronRight, BarChart, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const InterviewsList: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: interviews, isLoading } = useQuery({
    queryKey: ['interviews'],
    queryFn: getMyInterviews,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviews'] });
    },
    onError: (error) => {
      console.error('Failed to delete interview:', error);
      alert('Failed to delete interview');
    }
  });

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this interview?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Mock Interviews</h1>
            <p className="text-gray-500 dark:text-gray-400">Review past interviews, read detailed AI feedback, and track your progress.</p>
          </div>
          <Button onClick={() => navigate('/interviews/new')}>
            <Plus size={16} className="mr-2" /> New Interview
          </Button>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : interviews?.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">You haven't completed any mock interviews yet.</p>
              <Button className="mt-6" onClick={() => navigate('/interviews/new')}>Start First Interview</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews?.map((interview: any) => (
                <div key={interview._id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-5 flex items-center justify-between hover:border-primary/30 transition-colors group">
                  <div className="flex items-center space-x-5">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center space-x-2">
                        <span>{interview.jobRole} @ {interview.company}</span>
                        {interview.status === 'Completed' && (
                          <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Completed</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {interview.type} • {interview.difficulty} • {new Date(interview.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {interview.status === 'Completed' ? (
                      <>
                        <div className="text-center hidden sm:block">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Score</p>
                          <p className={`font-bold ${interview.feedback?.overallScore >= 80 ? 'text-success' : interview.feedback?.overallScore >= 60 ? 'text-warning' : 'text-danger'}`}>
                            {interview.feedback?.overallScore || 0}/100
                          </p>
                        </div>
                        <Link to={`/interviews/${interview._id}/feedback`}>
                          <Button variant="outline" size="sm">
                            <BarChart size={16} className="mr-2" /> Feedback
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link to={`/interview/${interview._id}`}>
                        <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                          Continue <ChevronRight size={16} className="ml-1" />
                        </Button>
                      </Link>
                    )}
                    <button 
                      onClick={(e) => handleDelete(interview._id, e)}
                      className="p-2 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-full transition-colors"
                      title="Delete interview"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewsList;
