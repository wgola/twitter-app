<template>
  <div
    v-infinite-scroll="[loadMoreData, { canLoadMore, distance: 20 }]"
    class="flex flex-col md:w-fit md:mx-auto gap-5 overflow-y-scroll"
  >
    <slot />
    <LoadingComponent v-if="isFetching" />
    <NoContentComponent v-if="isNoContent" :message="noContentMessage" class="mx-auto" />
  </div>
</template>

<script setup>
import { vInfiniteScroll } from '@vueuse/components';
import LoadingComponent from './LoadingComponent.vue';
import NoContentComponent from '../general/NoContentComponent.vue';

defineProps({
  loadMoreData: {
    type: Function,
    required: true
  },
  canLoadMore: {
    type: Function,
    required: true
  },
  isFetching: {
    type: Boolean,
    required: true
  },
  isNoContent: {
    type: Boolean,
    required: true
  },
  noContentMessage: {
    type: String,
    required: true
  }
});
</script>
