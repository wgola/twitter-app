<template>
  <div class="border-b border-b-gray-500 p-2">
    Reply to post
    <RouterLink :to="`/thread/${post.parentPostId}`" class="text-blue-400 hover:link">
      #{{ post.parentPostId }}
    </RouterLink>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>
