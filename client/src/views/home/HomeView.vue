<template>
  <main>
    <div class="flex flex-col">
      <div class="flex w-fit gap-5 mx-auto mb-5">
        <PostFormView modal-id="newPost">
          <button class="btn btn-wide btn-accent uppercase">
            <v-icon name="fa-regular-edit" />Add new post
          </button>
        </PostFormView>
        <button @click="refresh" class="btn btn-wide btn-accent uppercase">
          <v-icon name="hi-refresh" /> Refresh
        </button>
      </div>
      <div class="mx-auto mb-3">
        <AlertComponent :is-shown="newPosts" message="There are new posts, Refresh to see them!" />
      </div>
    </div>
    <div
      v-infinite-scroll="[loadMorePosts, { canLoadMore: () => hasNextPage, distance: 20 }]"
      class="flex flex-col gap-5 max-w-fit h-[650px] mx-auto overflow-y-auto"
    >
      <PostComponent v-for="post in fetchedPosts" :key="post._id" :post="post" />
      <LoadingComponent v-if="isFetching" />
      <NoContentComponent v-if="!hasNextPage" message="No more posts!" class="mx-auto" />
    </div>
  </main>
</template>

<script setup>
import { vInfiniteScroll } from '@vueuse/components';
import { onUnmounted, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { LoadingComponent, NoContentComponent, PostComponent, AlertComponent } from '@/components';
import PostFormView from '../post/PostFormView.vue';
import { useMainPageStore } from '@/stores';
import { socket } from '@/config/wsClient';

const store = useMainPageStore();

const { loadMorePosts, refresh } = store;

const { fetchedPosts, hasNextPage, isFetching, newPosts } = storeToRefs(store);

onMounted(() => {
  socket.emit('join-room', 'main-page');
});

onUnmounted(() => {
  socket.emit('leave-room', 'main-page');
});

watch(newPosts, () => {
  console.log('new posts!');
});
</script>
