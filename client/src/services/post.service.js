import { apiClient } from '@/config/apiClient';
import { wrapper } from './wrapper.service';
import { socket } from '@/config/wsClient';

export const createPostRequest = async (post) => {
  const request = async () => await apiClient.post('/api/posts', post);

  return await wrapper(request);
};

export const getMainPostsRequest = async (page, limit, timestamp, isOnlyFollows) => {
  const request = async () =>
    await apiClient.get(
      `/api/posts${isOnlyFollows ? '/follows' : ''}?page=${page}&limit=${limit}&timestamp=${timestamp}`
    );

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

export const likePostRequest = async (postId) => {
  return await socket.emitWithAck('like', postId);
};

export const dislikePostRequest = async (postId) => {
  return await socket.emitWithAck('dislike', postId);
};

export const editPostRequest = async (postId, newContent) => {
  const request = async () => await apiClient.put(`/api/posts/${postId}`, { newContent });

  return await wrapper(request);
};

export const deletePostRequest = async (postId) => {
  const request = async () => await apiClient.delete(`/api/posts/${postId}`);

  return await wrapper(request);
};

export const getMainNewPostsRequest = async (page, limit, timestamp, isOnlyFollows) => {
  const request = async () =>
    await apiClient.get(
      `/api/posts/new${isOnlyFollows ? '/follows' : ''}?page=${page}&limit=${limit}&timestamp=${timestamp}`
    );

  return await wrapper(request);
};

export const getPostNewCommentsRequest = async (postId, page, limit, timestamp) => {
  const request = async () =>
    await apiClient.get(
      `/api/posts/${postId}/newComments?page=${page}&limit=${limit}&timestamp=${timestamp}`
    );

  return await wrapper(request);
};

export const getPostParentsRequest = async (postId, page, limit) => {
  const request = async () =>
    await apiClient.get(`/api/posts/${postId}/parents?page=${page}&limit=${limit}`);

  return await wrapper(request);
};
