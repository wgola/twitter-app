<template>
  <main>
    <PostFormView />
    <div
      v-infinite-scroll="[loadMorePosts, { canLoadMore: () => hasNextPage, distance: 20 }]"
      class="flex flex-col max-w-fit gap-5 m-5 mx-auto"
    >
      <PostComponent v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </main>
</template>

<script setup>
import PostFormView from './postForm/PostFormView.vue';
import { ref } from 'vue';
import { vInfiniteScroll } from '@vueuse/components';
import { getMainPostsRequest } from '@/services';
import { PostComponent } from '@/components';

const posts = ref([]);
const page = ref(1);
const hasNextPage = ref(true);

const loadMorePosts = async () => {
  const { data, error } = await getMainPostsRequest(page.value);

  if (error) {
    return;
  }

  posts.value = [...posts.value, ...data.docs];
  hasNextPage.value = data.hasNextPage;
  page.value++;
};
</script>
