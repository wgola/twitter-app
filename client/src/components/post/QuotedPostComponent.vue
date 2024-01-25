<template>
  <div v-if="quotedPost.isDeleted" class="m-5 rounded-2xl border border-gray-500">
    <NoContentComponent message="This post was deleted!" class="mx-auto" />
  </div>
  <div v-else class="m-5 rounded-2xl border border-gray-500">
    <PostHeaderComponent :post="quotedPost" :is-quoted-post="true" />
    <PostContentComponent :post="quotedPost" />
    <RouterLink :to="`/thread/${quotedPost._id}`" class="flex justify-center m-1">
      <span class="hover:link"><v-icon name="hi-link" class="w-5 h-5 mr-1" />Go to thread </span>
    </RouterLink>
  </div>
</template>

<script setup>
import PostContentComponent from './PostContentComponent.vue';
import PostHeaderComponent from './PostHeaderComponent.vue';
import NoContentComponent from '../general/NoContentComponent.vue';

defineProps({
  quotedPost: {
    type: Object,
    required: true
  }
});
</script>
