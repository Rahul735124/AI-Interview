import api from './api';

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (formData: FormData) => {
  const response = await api.put('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/users/dashboard');
  return response.data;
};

export const addUpcomingInterview = async (data: { role: string; company: string; date: string }) => {
  const response = await api.post('/users/upcoming', data);
  return response.data;
};

export const deleteUpcomingInterview = async (id: string) => {
  const response = await api.delete(`/users/upcoming/${id}`);
  return response.data;
};

