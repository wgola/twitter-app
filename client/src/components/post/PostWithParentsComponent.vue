<template>
  <div
    ref="div"
    class="flex flex-col md:w-fit md:mx-auto gap-5 overflow-y-scroll mb-5"
    :style="`height: ${posts.length === 1 ? '22vh' : '30vh'}`"
  >
    <LoadingComponent v-if="isFetching" />
    <PostComponent
      v-for="currentPost in posts"
      :key="currentPost._id"
      :post="currentPost"
      :is-thread-page="true"
    />
  </div>
</template>

<script setup>
import PostComponent from './PostComponent.vue';
import LoadingComponent from '../general/LoadingComponent.vue';
import { ref, onMounted, watch, nextTick, toRefs } from 'vue';
import { useScroll } from '@vueuse/core';
import { getPostParentsRequest } from '@/services';
import _ from 'lodash';

const { post } = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const posts = ref([post]);

const currentPage = ref(1);
const hasNextPage = ref(true);
const isFetching = ref(false);

const div = ref(null);

const loadMoreParents = async () => {
  isFetching.value = true;
  const { data, error } = await getPostParentsRequest(post._id, currentPage.value, 5);

  if (error) {
    return;
  }

  isFetching.value = false;
  posts.value = _.concat(data.docs.reverse(), posts.value);
  hasNextPage.value = data.hasNextPage;
  currentPage.value++;
  console.log(posts.value);
};

const { arrivedState } = useScroll(div);

const { top } = toRefs(arrivedState);

onMounted(() => {
  let previousScrollHeightMinusScrollTop;

  const recordScrollPosition = () => {
    previousScrollHeightMinusScrollTop = div.value.scrollHeight - div.value.scrollTop;
  };

  const restoreScrollPosition = () => {
    div.value.scrollTop = div.value.scrollHeight - previousScrollHeightMinusScrollTop;
  };

  watch(
    top,
    async (newValue) => {
      if (newValue && hasNextPage.value && !isFetching.value) {
        recordScrollPosition();
        await loadMoreParents();
        nextTick(() => {
          restoreScrollPosition();
        });
      }
    },
    { immediate: true }
  );
});
</script>
