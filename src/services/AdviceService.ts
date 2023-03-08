import api from './axios';

export const createAdvice = (advice: string) => {
  return api.post('/advice/', { advice });
};

export const deleteAdvice = (id: string) => {
  return api.delete(`/advice/${id}`);
};

export const saveAdvice = (id: string) => {
  return api.post(`/advice/${id}?action=save`);
};

export const likeAdvice = (id: string) => {
  return api.post(`/advice/${id}?action=like`);
};

export const dislikeAdvice = (id: string) => {
  return api.post(`/advice/${id}?action=dislike`);
};

export const getSavedAdvices = (offset: number, limit = 10) => {
  return api.get(`/user/save?offset=${offset}&limit=${limit}`);
};

export const unsaveAdvice = (id: string) => {
  return api.post(`/advice/${id}?action=unsave`);
};

export const getCreatedAdvices = (offset: number, limit = 10) => {
  return api.get(`/user/create?offset=${offset}&limit=${limit}`);
};

export const getNewAdvice = () => {
  return api.get('/advice/');
};

export const reportAdvice = (id: string) => {
  return api.post(`/advice/${id}?action=report`);
};
