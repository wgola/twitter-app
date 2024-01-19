import { apiClient } from '@/config/apiClient';
import { wrapper } from './wrapper.service';

export const registerUserRequest = async (user) => {
  const request = async () => await apiClient.post('/api/auth/register', user);

  return await wrapper(request);
};

export const logInUserRequest = async (loginData) => {
  const request = async () => await apiClient.post('/api/auth/login', loginData);

  return await wrapper(request);
};

export const checkUserLoggedInRequest = async () => {
  const request = async () => await apiClient.get('/api/auth/check');

  return await wrapper(request);
};

export const logOutUserRequest = async () => {
  const request = async () => await apiClient.post('/api/auth/logout');

  return await wrapper(request);
};
