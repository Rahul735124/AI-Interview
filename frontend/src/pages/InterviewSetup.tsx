import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyResumes } from '../services/resume.service';
import { createInterview } from '../services/interview.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Briefcase, Building, Layers, Settings, FileText } from 'lucide-react';

const InterviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: '',
    company: '',
    difficulty: 'Medium',
    type: 'Technical',
    resumeId: '',
  });

  const { data: resumes } = useQuery({
    queryKey: ['resumes'],
    queryFn: getMyResumes,
  });

  const mutation = useMutation({
    mutationFn: createInterview,
    onSuccess: (data) => {
      navigate(`/interview/${data._id}`);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Failed to create interview');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jobRole || !formData.company) {
      alert('Please fill all required fields');
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-card-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 overflow-hidden relative">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Configure Mock Interview</h1>
            <p className="text-gray-500 dark:text-gray-400">Tailor the AI interviewer to match your upcoming real-world interview.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input 
                    label="Target Role / Position" 
                    placeholder="e.g. Frontend Engineer" 
                    value={formData.jobRole}
                    onChange={(e) => setFormData({...formData, jobRole: e.target.value})}
                  />
                  <Briefcase size={18} className="absolute right-3 top-9 text-gray-400" />
                </div>
                
                <div className="relative">
                  <Input 
                    label="Target Company" 
                    placeholder="e.g. Google, Stripe" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                  <Building size={18} className="absolute right-3 top-9 text-gray-400" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interview Type</label>
                  <div className="relative">
                    <select 
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white appearance-none"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="HR">HR / Culture Fit</option>
                      <option value="Technical">Technical</option>
                      <option value="Behavioral">Behavioral (Leadership)</option>
                    </select>
                    <Settings size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Difficulty</label>
                  <div className="relative">
                    <select 
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white appearance-none"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    >
                      <option value="Easy">Easy (Intern/Junior)</option>
                      <option value="Medium">Medium (Mid-level)</option>
                      <option value="Hard">Hard (Senior/Staff)</option>
                    </select>
                    <Layers size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base on Resume (Optional)</label>
              <div className="relative">
                <select 
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white appearance-none"
                  value={formData.resumeId}
                  onChange={(e) => setFormData({...formData, resumeId: e.target.value})}
                >
                  <option value="">Do not use resume context</option>
                  {resumes?.map((r: any) => (
                    <option key={r._id} value={r._id}>{r.originalName} (Parsed)</option>
                  ))}
                </select>
                <FileText size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Providing a resume allows the AI to ask personalized questions based on your experience.</p>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end space-x-4">
              <Button variant="outline" type="button" onClick={() => navigate('/dashboard')}>Cancel</Button>
              <Button type="submit" isLoading={mutation.isPending}>Start Interview</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;
