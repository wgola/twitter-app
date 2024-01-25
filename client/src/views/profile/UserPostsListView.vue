<template>
  <div class="mt-5">
    <InfiniteScrollListComponent
      :load-more-data="loadMorePosts"
      :can-load-more="() => hasNextPage"
      :is-fetching="isFetching"
      :is-no-content="!hasNextPage"
      :no-content-message="posts.length === 0 ? 'No posts yet!' : 'No more posts!'"
      class="max-h-[400px]"
    >
      <PostComponent v-for="post in posts" :key="post._id" :post="post" :is-profile-page="true" />
    </InfiniteScrollListComponent>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { InfiniteScrollListComponent, PostComponent } from '@/components';
import { getUserPostsRequest } from '@/services';

const route = useRoute();

const username = ref('');

const posts = ref([]);
const page = ref(1);
const hasNextPage = ref(true);
const timestamp = ref(new Date().getTime());
const isFetching = ref(false);

const loadMorePosts = async () => {
  isFetching.value = true;
  const { data, error } = await getUserPostsRequest(username.value, page.value, timestamp.value);

  if (error) {
    return;
  }

  posts.value = [...posts.value, ...data.docs];
  hasNextPage.value = data.hasNextPage;
  isFetching.value = false;
  page.value++;
};

watch(
  () => route.params.username,
  (newUsername) => (username.value = newUsername),
  { immediate: true }
);
</script>
