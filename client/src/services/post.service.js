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
