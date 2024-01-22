<template>
  <main>
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
import PostFormView from './postForm/PostFormView.vue';
import { vInfiniteScroll } from '@vueuse/components';
import { LoadingComponent, NoContentComponent, PostComponent } from '@/components';
import { useMainPagePosts } from '@/stores';
import { storeToRefs } from 'pinia';

const store = useMainPagePosts();

const { loadMorePosts, refresh } = store;

const { fetchedPosts, hasNextPage, isFetching } = storeToRefs(store);
</script>
