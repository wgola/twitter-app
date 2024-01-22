import { apiClient } from '@/config/apiClient';
import { wrapper } from './wrapper.service';

export const createPostRequest = async (post) => {
  const request = async () => await apiClient.post('/api/posts', post);

  return await wrapper(request);
};

export const getMainPostsRequest = async (page) => {
  const request = async () => await apiClient.get(`/api/posts?page=${page}`);

  return await wrapper(request);
};

export const getPostByIdRequest = async (postId) => {
  const request = async () => await apiClient.get(`/api/posts/${postId}`);

  return await wrapper(request);
};

export const getPostCommentsRequest = async (postId, page) => {
  const request = async () => await apiClient.get(`/api/posts/${postId}/comments?page=${page}`);

  return await wrapper(request);
};
