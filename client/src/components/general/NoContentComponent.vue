<template>
  <div class="flex flex-col justify-center w-36">
    <v-icon name="md-nosim-outlined" class="w-12 h-12 text-accent mx-auto" />
    <p class="text-accent font-bold mt-2 text-center">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>
