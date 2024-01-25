<template>
  <NoContentComponent
    v-if="followers.length === 0 && !hasNextPage"
    message="No followers yet!"
    class="mx-auto mt-20"
  />
  <div
    v-else
    v-infinite-scroll="[loadMoreFollowers, { canLoadMore: () => hasNextPage, distance: 20 }]"
    class="flex sm:flex-wrap justify-center gap-5 m-5 sm:w-1/2 w-full mx-auto h-[350px] overflow-y-scroll"
  >
    <ShortUserComponent v-for="follower in followers" :key="follower._id" :user="follower" />
  </div>
</template>

<script setup>
import { vInfiniteScroll } from '@vueuse/components';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { ShortUserComponent, NoContentComponent } from '@/components';
import { getUserFollowersRequest } from '@/services';

const route = useRoute();

const username = ref('');

const followers = ref([]);
const page = ref(1);
const hasNextPage = ref(true);

const loadMoreFollowers = async () => {
  const { data, error } = await getUserFollowersRequest(username.value, page.value);

  if (error) {
    return;
  }

  followers.value = [...followers.value, ...data.docs];
  hasNextPage.value = data.hasNextPage;
  page.value++;
};

watch(
  () => route.params.username,
  (newUsername) => (username.value = newUsername),
  { immediate: true }
);
</script>
