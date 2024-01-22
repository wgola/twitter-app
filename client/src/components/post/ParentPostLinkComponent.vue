<template>
  <div class="border-b border-b-gray-500 p-2">
    Reply to post
    <RouterLink :to="`/thread/${parentPostId}`" class="text-blue-400 hover:link"
      >#{{ parentPostId }}</RouterLink
    >
  </div>
</template>

<script setup>
defineProps({
  parentPostId: {
    type: String,
    required: true
  }
});
</script>
