<template>
  <div>Thread {{ threadId }}</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const threadId = ref('');
const route = useRoute();

watch(
  () => route.params.threadId,
  (newThread) => {
    threadId.value = newThread;
  },
  { immediate: true }
);
</script>
