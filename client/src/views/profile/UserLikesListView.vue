<template>
  <div class="mt-5">
    <InfiniteScrollListComponent
      :load-more-data="loadMoreLikes"
      :can-load-more="() => hasNextPage"
      :height="400"
      :is-fetching="isFetching"
      :is-no-content="!hasNextPage"
      :no-content-message="likes.length === 0 ? 'No likes yet!' : 'No more likes!'"
    >
      <PostComponent v-for="likes in likes" :key="likes._id" :post="likes" />
    </InfiniteScrollListComponent>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { PostComponent, InfiniteScrollListComponent } from '@/components';
import { getUserLikesRequest } from '@/services';

const route = useRoute();

const username = ref('');

const likes = ref([]);
const page = ref(1);
const hasNextPage = ref(true);
const timestamp = ref(new Date().getTime());
const isFetching = ref(false);

const loadMoreLikes = async () => {
  isFetching.value = true;
  const { data, error } = await getUserLikesRequest(username.value, page.value, timestamp.value);

  if (error) {
    return;
  }

  likes.value = [...likes.value, ...data.docs];
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
