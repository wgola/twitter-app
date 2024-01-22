<template>
  <div class="p-3 border-b border-b-gray-500 break-all">
    {{ content }}
  </div>
</template>

<script setup>
defineProps({
  content: {
    type: String,
    required: true
  }
});
</script>
