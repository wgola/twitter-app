import { getPostByIdRequest } from '@/services';
import { getPostCommentsRequest } from '@/services/post.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';

export const useThreadPageStore = defineStore('threadPageStore', () => {
  const post = ref(null);
  const comments = ref([]);
  const currentPage = ref(1);
  const hasNextPage = ref(true);
  const isFetchingPost = ref(false);
  const isFetchingComments = ref(false);
  const newComments = ref(false);

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

    const { data, error } = await getPostCommentsRequest(post.value._id, currentPage.value);

    if (error) {
      return;
    }

    comments.value = _.concat(comments.value, data.docs);
    hasNextPage.value = data.hasNextPage;
    isFetchingComments.value = false;
  };

  const refresh = async () => {
    currentPage.value = 1;
    hasNextPage.value = true;
    comments.value = [];

    await loadPost();
  };

  const addComment = (newPost) => {
    comments.value = _.concat([newPost], comments.value);
    post.value.commentsCount++;
  };

  return {
    post,
    comments,
    hasNextPage,
    currentPage,
    isFetchingPost,
    isFetchingComments,
    newComments,
    loadPost,
    loadMoreComments,
    refresh,
    addComment
  };
});
