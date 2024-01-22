<template>
  <div class="m-5 rounded-2xl border border-gray-500">
    <PostHeaderComponent :author="quotedPost.author" />
    <PostContentComponent :content="quotedPost.content" />
    <RouterLink :to="`/thread/${quotedPost._id}`" class="flex justify-center m-1">
      <span class="hover:link"><v-icon name="hi-link" class="w-5 h-5 mr-1" />Go to thread </span>
    </RouterLink>
  </div>
</template>

<script setup>
import PostContentComponent from './PostContentComponent.vue';
import PostHeaderComponent from './PostHeaderComponent.vue';

defineProps({
  quotedPost: {
    type: Object,
    required: true
  }
});
</script>
