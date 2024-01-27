<template>
  <main>
    <div class="flex flex-col w-fit mx-auto">
      <div class="flex gap-5 mb-5 sm:flex-row flex-col">
        <PostFormComponent modal-id="newPost">
          <button class="btn btn-wide btn-accent uppercase">
            <v-icon name="fa-regular-edit" />Add new post
          </button>
        </PostFormComponent>
        <button @click="refresh" class="btn btn-wide btn-accent uppercase">
          <v-icon name="hi-refresh" /> Refresh
          <span class="badge badge-primary font-bold animate-pulse" v-if="newPostsCount">{{
            newPostsCount
          }}</span>
        </button>
      </div>
      <div class="flex mb-5">
        <span :class="`${!onlyFollowedPosts && 'text-accent'} mx-2`">All posts</span>
        <input
          type="checkbox"
          class="toggle toggle-accent"
          v-model="onlyFollowedPosts"
          :true-value="true"
          :false-value="false"
        />
        <span :class="`${onlyFollowedPosts && 'text-accent'} mx-2`"> Following posts only </span>
      </div>
    </div>
    <BiDirectionalInfiniteScrollListComponent
      :load-more-data-bottom="loadMorePostsBottom"
      :load-more-data-top="loadMorePostsTop"
      :can-load-more-bottom="() => hasNextPageBottom && !isFetchingBottom"
      :can-load-more-top="() => newPostsCount > 0 && hasNextPageTop && !isFetchingTop"
      :is-fetching-bottom="isFetchingBottom"
      :is-fetching-top="isFetchingTop"
      :is-no-content="!hasNextPageBottom"
      no-content-message="No more posts!"
      style="height: 65vh"
    >
      <PostComponent v-for="post in fetchedPosts" :key="post._id" :post="post" />
    </BiDirectionalInfiniteScrollListComponent>
    <AlertComponent
      message="There are new posts!"
      :is-shown="showAlert"
      class="absolute w-60 bottom-20 left-20 z-50"
    />
  </main>
</template>

<script setup>
import { onUnmounted, onMounted, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainPageStore } from '@/stores';
import { socket } from '@/config/wsClient';
import {
  AlertComponent,
  PostComponent,
  PostFormComponent,
  BiDirectionalInfiniteScrollListComponent
} from '@/components';

const store = useMainPageStore();

const { loadMorePostsBottom, loadMorePostsTop, refresh } = store;

const {
  fetchedPosts,
  hasNextPageBottom,
  hasNextPageTop,
  isFetchingBottom,
  isFetchingTop,
  newPostsCount,
  onlyFollowedPosts
} = storeToRefs(store);
const showAlert = ref(false);

onMounted(() => {
  socket.emit('join-room', 'main-page');
  refresh();
});

onUnmounted(() => {
  socket.emit('leave-room', 'main-page');
});

watch(newPostsCount, () => {
  if (newPostsCount.value === 1) {
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
});
</script>
