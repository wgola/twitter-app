import { apiClient } from '@/config/apiClient';

export const getRoot = () => {
  return apiClient.get('/');
};
