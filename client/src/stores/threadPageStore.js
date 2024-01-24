import { getPostByIdRequest } from '@/services';
import { getPostCommentsRequest } from '@/services/post.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';
import { socket } from '@/config/wsClient';

export const useThreadPageStore = defineStore('threadPageStore', () => {
  const post = ref(null);
  const comments = ref([]);
  const currentPage = ref(1);
  const hasNextPage = ref(true);
  const isFetchingPost = ref(true);
  const isFetchingComments = ref(false);
  const timestamp = ref(new Date().getTime());
  const newCommentsCount = ref(0);

  const loadPost = async (postId) => {
    post.value = null;
    isFetchingPost.value = true;

    const { data, error } = await getPostByIdRequest(postId);

    if (error) {
      return;
    }

    post.value = data;
    isFetchingPost.value = false;
  };

  const loadMoreComments = async () => {
    isFetchingComments.value = true;

    const { data, error } = await getPostCommentsRequest(
      post.value._id,
      currentPage.value,
      10,
      timestamp.value
    );

    if (error) {
      return;
    }

    comments.value = _.concat(comments.value, data.docs);
    hasNextPage.value = data.hasNextPage;
    isFetchingComments.value = false;
    currentPage.value++;
  };

  const refresh = async (postId) => {
    currentPage.value = 1;
    hasNextPage.value = true;
    comments.value = [];
    newCommentsCount.value = 0;
    timestamp.value = new Date().getTime();

    await loadPost(postId);
  };

  socket.on('new-post', () => {
    newCommentsCount.value++;
  });

  const addComment = (newPost) => {
    if (newCommentsCount.value !== 0) {
      refresh(post.value._id);
    } else {
      comments.value = _.concat([newPost], comments.value);
      post.value.commentsCount++;
    }
  };

  return {
    timestamp,
    post,
    comments,
    hasNextPage,
    currentPage,
    isFetchingPost,
    isFetchingComments,
    newCommentsCount,
    loadPost,
    loadMoreComments,
    refresh,
    addComment
  };
});
