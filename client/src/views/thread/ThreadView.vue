<template>
  <LoadingComponent v-if="isFetchingPost" />
  <div v-else>
    <!-- <div class="md:w-fit md:mx-auto mb-5">
      <PostComponent :post="post" :is-thread-page="true" />
    </div> -->
    <PostWithParentsComponent :post="post" />
    <div v-if="!post.isDeleted" class="flex gap-5 sm:flex-row flex-col mx-auto w-fit mb-5">
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
    <BiDirectionalInfiniteScrollListComponent
      :load-more-data-bottom="loadMoreCommentsBottom"
      :load-more-data-top="loadMoreCommentsTop"
      :can-load-more-bottom="() => hasNextPageBottom"
      :can-load-more-top="() => newCommentsCount > 0 && hasNextPageTop && !isFetchingCommentsTop"
      :is-fetching-bottom="isFetchingCommentsBottom"
      :is-fetching-top="isFetchingCommentsTop"
      :is-no-content="!hasNextPageBottom"
      :no-content-message="comments.length === 0 ? 'No comments yet!' : 'No more comments!'"
      :style="post.isDeleted ? 'height: 65vh' : 'height: 38vh'"
    >
      <PostComponent
        v-for="comment in comments"
        :key="comment._id"
        :post="comment"
        :is-thread-page="true"
      />
    </BiDirectionalInfiniteScrollListComponent>
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
  BiDirectionalInfiniteScrollListComponent
} from '@/components';
import { socket } from '@/config/wsClient';
import PostWithParentsComponent from '@/components/post/PostWithParentsComponent.vue';

const store = useThreadPageStore();

const { loadMoreCommentsBottom, loadMoreCommentsTop, refresh } = store;

const {
  post,
  comments,
  hasNextPageBottom,
  hasNextPageTop,
  isFetchingPost,
  isFetchingCommentsTop,
  isFetchingCommentsBottom,
  newCommentsCount
} = storeToRefs(store);

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

watch(newCommentsCount, () => {
  if (newCommentsCount.value === 1) {
    showAlert.value = true;
    setTimeout(() => {
      showAlert.value = false;
    }, 3000);
  }
});
</script>
