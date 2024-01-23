<template>
  <div
    role="alert"
    :class="`alert alert-info transition-opacity ease-in-out duration-300 ${isShown ? 'opacity-100' : 'opacity-0'}`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span>{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  isShown: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
</script>
