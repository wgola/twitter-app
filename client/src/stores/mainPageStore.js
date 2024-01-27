import { getMainNewPostsRequest, getMainPostsRequest } from '@/services';
import { defineStore, storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import _ from 'lodash';
import { socket } from '@/config/wsClient';
import { useUserStore } from './userStore.js';

export const useMainPageStore = defineStore('mainPageStore', () => {
  const userStore = useUserStore();

  const fetchedPosts = ref([]);
  const currentPageBottom = ref(1);
  const currentPageTop = ref(1);
  const hasNextPageBottom = ref(true);
  const hasNextPageTop = ref(false);
  const isFetchingBottom = ref(false);
  const isFetchingTop = ref(false);
  const timestampBottom = ref(new Date().getTime());
  const timestampTop = ref(new Date().getTime());
  const newPostsCount = ref(0);
  const onlyFollowedPosts = ref(false);

  const loadMorePostsBottom = async () => {
    isFetchingBottom.value = true;

    const { data, error } = await getMainPostsRequest(
      currentPageBottom.value,
      5,
      timestampBottom.value,
      onlyFollowedPosts.value
    );

    if (error) {
      return;
    }

    isFetchingBottom.value = false;
    fetchedPosts.value = _.concat(fetchedPosts.value, data.docs);
    hasNextPageBottom.value = data.hasNextPage;
    currentPageBottom.value++;
  };

  const loadMorePostsTop = async () => {
    isFetchingTop.value = true;
    const { data, error } = await getMainNewPostsRequest(
      currentPageTop.value,
      5,
      timestampTop.value,
      onlyFollowedPosts.value
    );

    if (error) {
      return;
    }

    isFetchingTop.value = false;
    newPostsCount.value -= data.docs.length;
    fetchedPosts.value = _.concat(data.docs.reverse(), fetchedPosts.value);
    hasNextPageTop.value = data.hasNextPage;
    currentPageTop.value++;
  };

  const refresh = () => {
    fetchedPosts.value = [];
    currentPageBottom.value = 1;
    currentPageTop.value = 1;
    hasNextPageBottom.value = true;
    hasNextPageTop.value = false;
    newPostsCount.value = 0;
    timestampBottom.value = new Date().getTime();
    timestampTop.value = new Date().getTime();

    loadMorePostsBottom();
  };

  socket.on('new-post', (username) => {
    const { currentUser } = storeToRefs(userStore);

    if (
      (onlyFollowedPosts.value && _.includes(currentUser.value.follows, username)) ||
      !onlyFollowedPosts.value
    ) {
      timestampTop.value = new Date(fetchedPosts.value[0].createdAt).getTime();
      currentPageTop.value = 1;
      hasNextPageTop.value = true;
      newPostsCount.value++;
    }
  });

  watch(onlyFollowedPosts, () => refresh());

  const addPost = (post) => {
    if (!onlyFollowedPosts.value) {
      if (newPostsCount.value !== 0) {
        refresh();
      } else {
        fetchedPosts.value = _.concat([post], fetchedPosts.value);
      }
    }
  };

  return {
    timestampBottom,
    fetchedPosts,
    currentPageBottom,
    hasNextPageBottom,
    loadMorePostsBottom,
    isFetchingBottom,
    refresh,
    newPostsCount,
    addPost,
    onlyFollowedPosts,
    currentPageTop,
    hasNextPageTop,
    isFetchingTop,
    timestampTop,
    loadMorePostsTop
  };
});
