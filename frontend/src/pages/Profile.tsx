import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { updateProfile } from '../services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [file, setFile] = useState<File | null>(null);
  
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      setPassword('');
      alert('Profile updated successfully!');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Update failed');
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setAvatarPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (password) {
      formData.append('password', password);
    }
    if (file) {
      formData.append('avatar', file);
    }
    
    updateMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile Settings</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center sm:flex-row sm:space-x-6">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Camera size={24} />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-left">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">Profile Photo</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Recommended 300x300px, up to 5MB.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input 
                type="text" 
                value={user?.email} 
                disabled 
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700" 
              />
            </div>

            <Input 
              label="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />

            <Input 
              label="New Password" 
              type="password" 
              placeholder="Leave blank to keep same" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" isLoading={updateMutation.isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
