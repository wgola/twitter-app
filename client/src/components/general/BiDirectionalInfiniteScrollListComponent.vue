<template>
  <div ref="div" class="flex flex-col md:w-fit md:mx-auto gap-5 overflow-y-scroll">
    <LoadingComponent v-if="isFetchingTop" />
    <slot />
    <LoadingComponent v-if="isFetchingBottom" />
    <NoContentComponent v-if="isNoContent" :message="noContentMessage" class="mx-auto" />
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { useScroll } from '@vueuse/core';
import LoadingComponent from '@/components/general/LoadingComponent.vue';
import NoContentComponent from '@/components/general/NoContentComponent.vue';

const { loadMoreDataBottom, canLoadMoreBottom, canLoadMoreTop, loadMoreDataTop } = defineProps({
  loadMoreDataBottom: {
    type: Function,
    required: true
  },
  loadMoreDataTop: {
    type: Function,
    required: true
  },
  canLoadMoreBottom: {
    type: Function,
    required: true
  },
  canLoadMoreTop: {
    type: Function,
    required: true
  },
  isFetchingTop: {
    type: Boolean,
    required: true
  },
  isFetchingBottom: {
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

const div = ref(null);

const { arrivedState } = useScroll(div);

const { top, bottom } = toRefs(arrivedState);

onMounted(() => {
  let previousScrollHeightMinusScrollTop;

  const recordScrollPosition = () => {
    previousScrollHeightMinusScrollTop = div.value.scrollHeight - div.value.scrollTop;
  };

  const restoreScrollPosition = () => {
    div.value.scrollTop = div.value.scrollHeight - previousScrollHeightMinusScrollTop;
  };

  watch(
    bottom,
    (newValue) => {
      if (newValue && canLoadMoreBottom()) {
        loadMoreDataBottom();
      }
    },
    { immediate: true }
  );

  watch(
    top,
    async (newValue) => {
      if (newValue && canLoadMoreTop()) {
        recordScrollPosition();
        await loadMoreDataTop();
        nextTick(() => {
          restoreScrollPosition();
        });
      }
    },
    { immediate: true }
  );
});
</script>
