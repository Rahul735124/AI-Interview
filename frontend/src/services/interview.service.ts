import api from './api';

export const createInterview = async (data: { resumeId?: string; jobRole: string; company: string; difficulty: string; type: string }) => {
  const response = await api.post('/interviews', data);
  return response.data;
};

export const getMyInterviews = async () => {
  const response = await api.get('/interviews');
  return response.data;
};

export const getInterviewById = async (id: string) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};

export const deleteInterview = async (id: string) => {
  const response = await api.delete(`/interviews/${id}`);
  return response.data;
};
