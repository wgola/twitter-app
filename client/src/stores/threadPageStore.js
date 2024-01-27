import { getPostByIdRequest, getPostCommentsRequest, getPostNewCommentsRequest } from '@/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';
import { socket } from '@/config/wsClient';

export const useThreadPageStore = defineStore('threadPageStore', () => {
  const post = ref(null);
  const comments = ref([]);
  const currentPageBottom = ref(1);
  const currentPageTop = ref(1);
  const hasNextPageBottom = ref(true);
  const hasNextPageTop = ref(false);
  const isFetchingPost = ref(true);
  const isFetchingCommentsBottom = ref(false);
  const isFetchingCommentsTop = ref(false);
  const timestampBottom = ref(new Date().getTime());
  const timestampTop = ref(new Date().getTime());
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

  const loadMoreCommentsBottom = async () => {
    isFetchingCommentsBottom.value = true;

    const { data, error } = await getPostCommentsRequest(
      post.value._id,
      currentPageBottom.value,
      5,
      timestampBottom.value
    );

    if (error) {
      return;
    }

    comments.value = _.concat(comments.value, data.docs);
    hasNextPageBottom.value = data.hasNextPage;
    isFetchingCommentsBottom.value = false;
    currentPageBottom.value++;
  };

  const loadMoreCommentsTop = async () => {
    isFetchingCommentsTop.value = true;

    const { data, error } = await getPostNewCommentsRequest(
      post.value._id,
      currentPageTop.value,
      5,
      timestampTop.value
    );

    if (error) {
      return;
    }

    isFetchingCommentsTop.value = false;
    newCommentsCount.value -= data.docs.length;
    comments.value = _.concat(data.docs.reverse(), comments.value);
    hasNextPageTop.value = data.hasNextPage;
    currentPageTop.value++;
  };

  const refresh = async (postId) => {
    comments.value = [];
    currentPageBottom.value = 1;
    currentPageTop.value = 1;
    hasNextPageBottom.value = true;
    hasNextPageTop.value = false;
    newCommentsCount.value = 0;
    timestampBottom.value = new Date().getTime();
    timestampTop.value = new Date().getTime();

    await loadPost(postId);
  };

  socket.on('new-comment', () => {
    timestampTop.value = new Date(comments.value[0].createdAt).getTime();
    currentPageTop.value = 1;
    hasNextPageTop.value = true;
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
    timestampBottom,
    timestampTop,
    post,
    comments,
    hasNextPageBottom,
    hasNextPageTop,
    currentPageBottom,
    currentPageTop,
    isFetchingPost,
    isFetchingCommentsBottom,
    isFetchingCommentsTop,
    newCommentsCount,
    loadPost,
    loadMoreCommentsBottom,
    refresh,
    addComment,

    loadMoreCommentsTop
  };
});
