import api from './axios';

export const createAdvice = async (advice: string) => {
  return api.post('/advice/', { advice });
};

export const deleteAdvice = async (id: string) => {
  return api.delete(`/advice/${id}`);
};

export const saveAdvice = async (id: string) => {
  return api.post(`/advice/${id}?action=save`);
};

export const likeAdvice = async (id: string) => {
  return api.post(`/advice/${id}?action=like`);
};

export const dislikeAdvice = async (id: string) => {
  return api.post(`/advice/${id}?action=dislike`);
};

export const getSavedAdvices = async (offset: number, limit = 10) => {
  return api.get(`/user/save?offset=${offset}&limit=${limit}`);
};

export const unsaveAdvice = async (id: string) => {
  return api.post(`/advice/${id}?action=unsave`);
};

export const getCreatedAdvices = async (offset: number, limit = 10) => {
  return api.get(`/user/create?offset=${offset}&limit=${limit}`);
};

export const getNewAdvice = async () => {
  return api.get('/advice/');
};

export const reportAdvice = async (id: string) => {
  return api.post(`/advice/${id}?action=report`);
};
