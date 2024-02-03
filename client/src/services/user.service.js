import { apiClient } from '@/config/apiClient';
import { wrapper } from './wrapper.service';
import { socket } from '@/config/wsClient';

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

export const getUserFollowersRequest = async (username, page) => {
  const params = {
    page,
    limit: 15
  };

  const request = async () => await apiClient.get(`/api/user/${username}/followers`, { params });

  return await wrapper(request);
};

export const getUserFollowingsRequest = async (username, page) => {
  const params = {
    page,
    limit: 15
  };

  const request = async () => await apiClient.get(`/api/user/${username}/following`, { params });

  return await wrapper(request);
};

export const followUserRequest = async (username) => {
  return await socket.emitWithAck('follow', username);
};

export const unfollowUserRequest = async (username) => {
  return await socket.emitWithAck('unfollow', username);
};

export const getUserPostsRequest = async (username, page, timestamp) => {
  const params = {
    page,
    timestamp,
    limit: 9
  };

  const request = async () => await apiClient.get(`/api/user/${username}/posts`, { params });

  return await wrapper(request);
};

export const getUserLikesRequest = async (username, page, timestamp) => {
  const params = {
    page,
    timestamp,
    limit: 9
  };

  const request = async () => await apiClient.get(`/api/user/${username}/likes`, { params });

  return await wrapper(request);
};

export const searchUsersRequest = async (username, page) => {
  const params = {
    username,
    page,
    limit: 9
  };

  const request = async () => await apiClient.get(`/api/user`, { params });

  return await wrapper(request);
};
