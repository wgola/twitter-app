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
  const newPosts = ref(false);

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
    newPosts.value = false;
    timestamp.value = new Date().getTime();

    loadMorePosts();
  };

  socket.on('new-post', () => (newPosts.value = true));

  const addPost = (post) => {
    if (newPosts.value) {
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
    newPosts,
    addPost
  };
});
