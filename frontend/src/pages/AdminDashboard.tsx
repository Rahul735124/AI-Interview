import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser } from '../services/admin.service';
import { Trash2, Users, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';

const AdminDashboard: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Delete failed');
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center space-x-3 mb-8">
          <ShieldAlert className="text-danger" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-500">Manage users and system resources.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold">{users?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold">User Management</h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                    <th className="p-4 font-medium">User</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Joined</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user: any) => (
                    <tr key={user._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/20">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img src={user.avatar} alt="avatar" className="h-10 w-10 rounded-full bg-gray-200" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        {user.role !== 'admin' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-danger border-danger hover:bg-danger hover:text-white"
                            onClick={() => handleDelete(user._id)}
                            isLoading={deleteMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
