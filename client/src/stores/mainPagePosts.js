import { getMainPostsRequest } from '@/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import _ from 'lodash';

export const useMainPagePosts = defineStore('mainPageStore', () => {
  const fetchedPosts = ref([]);
  const currentPage = ref(1);
  const hasNextPage = ref(true);
  const isFetching = ref(false);
  const newPosts = ref(false);

  const loadMorePosts = async () => {
    isFetching.value = true;
    const { data, error } = await getMainPostsRequest(currentPage.value);

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

    loadMorePosts();
  };

  const addPost = (post) => {
    fetchedPosts.value = _.concat([post], fetchedPosts.value);
  };

  return {
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
