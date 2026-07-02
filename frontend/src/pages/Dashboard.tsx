import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardStats, addUpcomingInterview, deleteUpcomingInterview } from '../services/user.service';
import { useAuthStore } from '../store/authStore';
import { Calendar, TrendingUp, Award, Clock, Plus, Trash2, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '../components/ui/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUpcoming, setNewUpcoming] = useState({ role: '', company: '', date: '' });
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats,
  });

  const addMutation = useMutation({
    mutationFn: addUpcomingInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      setIsModalOpen(false);
      setNewUpcoming({ role: '', company: '', date: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUpcomingInterview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    }
  });

  const handleAddUpcoming = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(newUpcoming);
  };

  const handleDeleteUpcoming = (id: string) => {
    if (window.confirm('Remove this upcoming interview?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger p-8">Failed to load dashboard statistics.</div>;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-primary text-white rounded-2xl p-8 shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-primary-100 opacity-90">Ready to ace your next interview? Here is your progress so far.</p>
          </div>
          <div className="hidden md:block">
            <Award size={64} className="opacity-80" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Score</p>
              <p className="text-2xl font-bold">{stats?.averageScore}%</p>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Interviews</p>
              <p className="text-2xl font-bold">{stats?.totalInterviews}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming</p>
              <p className="text-2xl font-bold">{stats?.upcomingInterviews?.length || 0}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours Spent</p>
              {/* Approximated as 30 mins (0.5 hrs) per total interview */}
              <p className="text-2xl font-bold">{(stats?.totalInterviews || 0) * 0.5}h</p>
            </div>
          </div>
        </div>

        {/* Charts & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Performance Chart */}
          <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 lg:col-span-2">
            <h2 className="text-xl font-bold mb-6">Performance Trend</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Interviews & Skills */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upcoming Interviews</h2>
                <button onClick={() => setIsModalOpen(true)} className="p-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {stats?.upcomingInterviews?.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming interviews.</p>
                )}
                {stats?.upcomingInterviews?.map((interview: any) => (
                  <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{interview.role}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {interview.company} • {new Date(interview.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteUpcoming(interview.id)}
                      className="p-2 text-gray-400 hover:text-danger hover:bg-danger/10 rounded-full transition-colors"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold mb-4">Top Skills</h2>
              {stats?.skills?.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Upload a resume to see your top skills here.</p>
              ) : (
                <div className="h-[200px]">
                   <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats?.skills} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fontSize: 13 }} />
                      <Tooltip cursor={{fill: 'transparent'}} />
                      <Bar dataKey="level" fill="#06B6D4" radius={[0, 4, 4, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Add Upcoming Interview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-card-dark p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Upcoming Interview</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddUpcoming} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role / Position</label>
                <input 
                  required 
                  type="text" 
                  value={newUpcoming.role} 
                  onChange={e => setNewUpcoming({...newUpcoming, role: e.target.value})} 
                  className="w-full p-2.5 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  placeholder="e.g. Frontend Engineer" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                <input 
                  required 
                  type="text" 
                  value={newUpcoming.company} 
                  onChange={e => setNewUpcoming({...newUpcoming, company: e.target.value})} 
                  className="w-full p-2.5 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  placeholder="e.g. Google" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date & Time</label>
                <input 
                  required 
                  type="datetime-local" 
                  value={newUpcoming.date} 
                  onChange={e => setNewUpcoming({...newUpcoming, date: e.target.value})} 
                  className="w-full p-2.5 bg-gray-50 dark:bg-[#0A0F1C] border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                />
              </div>
              <Button type="submit" className="w-full mt-2 h-11" disabled={addMutation.isPending}>
                {addMutation.isPending ? 'Adding...' : 'Add Interview'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
