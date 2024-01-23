import { getMainPostsRequest } from '@/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';
import { socket } from '@/config/wsClient';

export const useMainPageStore = defineStore('mainPageStore', () => {
  const fetchedPosts = ref([]);
  const currentPage = ref(1);
  const hasNextPage = ref(true);
  const isFetching = ref(false);
  const timestamp = ref(new Date().getTime());
  const newPostsCount = ref(0);

  const loadMorePosts = async () => {
    isFetching.value = true;
    const { data, error } = await getMainPostsRequest(currentPage.value, 10, timestamp.value);

    if (error) {
      return;
    }

    isFetching.value = false;
    fetchedPosts.value = _.concat(fetchedPosts.value, data.docs);
    hasNextPage.value = data.hasNextPage;
    currentPage.value++;
  };

  const refresh = () => {
    fetchedPosts.value = [];
    currentPage.value = 1;
    hasNextPage.value = true;
    newPostsCount.value = 0;
    timestamp.value = new Date().getTime();

    loadMorePosts();
  };

  socket.on('new-post', () => newPostsCount.value++);

  const addPost = (post) => {
    if (newPostsCount.value !== 0) {
      refresh();
    } else {
      fetchedPosts.value = _.concat([post], fetchedPosts.value);
    }
  };

  return {
    timestamp,
    fetchedPosts,
    currentPage,
    hasNextPage,
    loadMorePosts,
    isFetching,
    refresh,
    newPostsCount,
    addPost
  };
});
