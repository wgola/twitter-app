<template>
  <NoContentComponent
    v-if="followings.length === 0 && !hasNextPage"
    message="No following yet!"
    class="mx-auto mt-20"
  />
  <div
    v-else
    v-infinite-scroll="[loadMoreFollowing, { canLoadMore: () => hasNextPage, distance: 20 }]"
    class="flex flex-wrap justify-center gap-5 m-5 w-1/2 mx-auto h-[350px] overflow-y-scroll"
  >
    <ShortUserComponent v-for="following in followings" :key="following._id" :user="following" />
  </div>
</template>

<script setup>
import { vInfiniteScroll } from '@vueuse/components';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { ShortUserComponent, NoContentComponent } from '@/components';
import { getUserFollowingsRequest } from '@/services';

const route = useRoute();

const username = ref('');

const followings = ref([]);
const page = ref(1);
const hasNextPage = ref(true);

const loadMoreFollowing = async () => {
  const { data, error } = await getUserFollowingsRequest(username.value, page.value);

  if (error) {
    return;
  }

  followings.value = [...followings.value, ...data.docs];
  hasNextPage.value = data.hasNextPage;
  page.value++;
};

watch(
  () => route.params.username,
  (newUsername) => (username.value = newUsername),
  { immediate: true }
);
</script>
