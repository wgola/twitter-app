import { apiClient } from '@/config/apiClient';
import { wrapper } from './wrapper.service';

export const updateProfilePictureRequest = async (profilePicture) => {
  const request = async () => {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    return await apiClient.put('/api/user/profilePicture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  return await wrapper(request);
};

export const updateUserDataRequest = async (userData) => {
  const request = async () => await apiClient.put('/api/user/data', userData);

  return await wrapper(request);
};

export const getUserDetailsByUsername = async (username) => {
  const request = async () => await apiClient.get(`/api/user/${username}/details`);

  return await wrapper(request);
};

export const changeFollowingUserRequest = async (username) => {
  const request = async () => await apiClient.put(`/api/user/${username}/follow`);

  return await wrapper(request);
};

export const getUserFollowersRequest = async (username, page) => {
  const request = async () =>
    await apiClient.get(`/api/user/${username}/followers?page=${page}&limit=15`);

  return await wrapper(request);
};

export const getUserFollowingsRequest = async (username, page) => {
  const request = async () =>
    await apiClient.get(`/api/user/${username}/following?page=${page}&limit=15`);

  return await wrapper(request);
};
