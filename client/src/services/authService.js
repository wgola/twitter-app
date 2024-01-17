import { apiClient } from '@/config/apiClient';

export const registerUser = async (user) => {
  try {
    const response = await apiClient.post('/api/auth/register', user);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const logInUser = async (loginData) => {
  try {
    const response = await apiClient.post('/api/auth/login', loginData);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkUserLoggedIn = async () => {
  try {
    const response = await apiClient.get('/api/auth/check');
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const logOutUser = async () => {
  try {
    const response = await apiClient.post('/api/auth/logout');
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
