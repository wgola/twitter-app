<template>
  <LoadingComponent v-if="isFetchingPost" />
  <div v-else>
    <div class="w-fit mx-auto">
      <PostComponent :post="post" />
    </div>
    <div class="flex w-fit gap-5 mx-auto m-5">
      <PostFormView :modal-id="`${post._id}-comment`" :parent-post-id="post._id">
        <button class="btn btn-wide btn-accent uppercase">
          <v-icon name="fa-regular-edit" />Add comment
        </button>
      </PostFormView>
      <button @click="async () => await refresh()" class="btn btn-wide btn-accent uppercase">
        <v-icon name="hi-refresh" /> Refresh
      </button>
    </div>
    <div
      v-infinite-scroll="[loadMoreComments, { canLoadMore: () => hasNextPage, distance: 20 }]"
      class="flex flex-col gap-5 max-w-fit h-[480px] mx-auto overflow-y-auto"
    >
      <PostComponent
        v-for="comment in comments"
        :key="comment._id"
        :post="comment"
        :is-comment="true"
      />
      <LoadingComponent v-if="isFetchingComments" />
      <NoContentComponent v-if="!hasNextPage" message="No more comments!" class="mx-auto" />
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useThreadPageStore } from '@/stores/threadPageStore';
import { storeToRefs } from 'pinia';
import { LoadingComponent, PostComponent, NoContentComponent } from '@/components';
import PostFormView from '../home/postForm/PostFormView.vue';
import { vInfiniteScroll } from '@vueuse/components';

const store = useThreadPageStore();

const { loadPost, loadMoreComments, refresh } = store;

const { post, comments, hasNextPage, isFetchingPost, isFetchingComments } = storeToRefs(store);

const route = useRoute();

watch(
  () => route.params.threadId,
  async (newThread) => {
    await refresh();
    await loadPost(newThread);
  },
  { immediate: true }
);
</script>
