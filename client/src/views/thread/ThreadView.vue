<template>
  <LoadingComponent v-if="isFetchingPost" />
  <div v-else>
    <div class="w-fit mx-auto">
      <PostComponent :post="post" />
    </div>
    <div class="flex w-fit gap-5 mx-auto m-5">
      <PostFormComponent :modal-id="`${post._id}-comment`" :parent-post-id="post._id">
        <button class="btn btn-wide btn-accent uppercase">
          <v-icon name="fa-regular-edit" />Add comment
        </button>
      </PostFormComponent>
      <button
        @click="async () => await refresh(route.params.threadId)"
        class="btn btn-wide btn-accent uppercase"
      >
        <v-icon name="hi-refresh" /> Refresh
        <span class="badge badge-primary font-bold animate-pulse" v-if="newCommentsCount">{{
          newCommentsCount
        }}</span>
      </button>
    </div>
    <InfiniteScrollListComponent
      :load-more-data="loadMoreComments"
      :can-load-more="() => hasNextPage"
      :is-fetching="isFetchingComments"
      :is-no-content="!hasNextPage"
      :no-content-message="comments.length === 0 ? 'No comments yet!' : 'No more comments!'"
      class="max-h-[470px]"
    >
      <PostComponent
        v-for="comment in comments"
        :key="comment._id"
        :post="comment"
        :is-comment="true"
      />
    </InfiniteScrollListComponent>
    <AlertComponent
      message="There are new comments!"
      :is-shown="showAlert"
      class="absolute w-60 bottom-20 left-20 z-50"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onUnmounted, ref, watch } from 'vue';
import { useThreadPageStore } from '@/stores';
import {
  LoadingComponent,
  PostComponent,
  PostFormComponent,
  AlertComponent,
  InfiniteScrollListComponent
} from '@/components';
import { socket } from '@/config/wsClient';

const store = useThreadPageStore();

const { loadMoreComments, refresh } = store;

const { post, comments, hasNextPage, isFetchingPost, isFetchingComments, newCommentsCount } =
  storeToRefs(store);

const threadId = ref('');
const showAlert = ref(false);

const route = useRoute();

onUnmounted(() => {
  socket.emit('leave-room', threadId.value);
});

watch(
  () => route.params.threadId,
  (newThread) => {
    socket.emit('leave-room', threadId.value);
    threadId.value = newThread;
    socket.emit('join-room', threadId.value);
    refresh(threadId.value);
  },
  { immediate: true }
);

watch(newCommentsCount, (newValue) => {
  console.log(newValue);
  if (newCommentsCount.value === 1) {
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
});
</script>
