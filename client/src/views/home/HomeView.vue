<template>
  <main>
    <div class="flex flex-col w-fit mx-auto">
      <div class="flex gap-5 mb-5">
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
        <input
          type="checkbox"
          class="toggle toggle-accent"
          v-model="onlyFollowedPosts"
          :true-value="true"
          :false-value="false"
        />
        <span :class="`${onlyFollowedPosts && 'text-accent'} mx-2`">{{ toggleMessage }}</span>
      </div>
    </div>
    <InfiniteScrollListComponent
      :load-more-data="loadMorePosts"
      :can-load-more="() => hasNextPage"
      :is-fetching="isFetching"
      :is-no-content="!hasNextPage"
      no-content-message="No more posts!"
      class="max-h-[630px]"
    >
      <PostComponent v-for="post in fetchedPosts" :key="post._id" :post="post" />
    </InfiniteScrollListComponent>
    <AlertComponent
      message="There are new posts!"
      :is-shown="showAlert"
      class="absolute w-60 bottom-20 left-20 z-50"
    />
  </main>
</template>

<script setup>
import { onUnmounted, onMounted, watch, ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useMainPageStore } from '@/stores';
import { socket } from '@/config/wsClient';
import {
  AlertComponent,
  PostComponent,
  PostFormComponent,
  InfiniteScrollListComponent
} from '@/components';

const store = useMainPageStore();

const { loadMorePosts, refresh } = store;

const { fetchedPosts, hasNextPage, isFetching, newPostsCount, onlyFollowedPosts } =
  storeToRefs(store);
const showAlert = ref(false);

const toggleMessage = computed(() =>
  onlyFollowedPosts.value ? 'Followers posts only' : 'All posts'
);

onMounted(() => {
  socket.emit('join-room', 'main-page');
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
