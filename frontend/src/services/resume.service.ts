import api from './api';

export const uploadResume = async (formData: FormData) => {
  const response = await api.post('/resumes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getMyResumes = async () => {
  const response = await api.get('/resumes');
  return response.data;
};

export const getResumeById = async (id: string) => {
  const response = await api.get(`/resumes/${id}`);
  return response.data;
};

export const deleteResume = async (id: string) => {
  const response = await api.delete(`/resumes/${id}`);
  return response.data;
};
