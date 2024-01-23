import { apiClient } from '@/config/apiClient';
import { wrapper } from './wrapper.service';

export const createPostRequest = async (post) => {
  const request = async () => await apiClient.post('/api/posts', post);

  return await wrapper(request);
};

export const getMainPostsRequest = async (page, limit, timestamp) => {
  const request = async () =>
    await apiClient.get(`/api/posts?page=${page}&limit=${limit}&timestamp=${timestamp}`);

  return await wrapper(request);
};

export const getPostByIdRequest = async (postId) => {
  const request = async () => await apiClient.get(`/api/posts/${postId}`);

  return await wrapper(request);
};

export const getPostCommentsRequest = async (postId, page, limit, timestamp) => {
  const request = async () =>
    await apiClient.get(
      `/api/posts/${postId}/comments?page=${page}&limit=${limit}&timestamp=${timestamp}`
    );

  return await wrapper(request);
};
