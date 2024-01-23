<template>
  <div class="p-3 border-b border-b-gray-500">
    <div class="break-all">
      {{ content }}
    </div>
    <div class="text-gray-500 text-sm" v-if="!isEdited">{{ timestamp }}</div>
    <div class="text-gray-500 text-sm link" v-else>
      <v-icon name="fa-regular-edit" class="h-5" />{{ timestamp }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const { createdAt, updatedAt } = defineProps({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  }
});

const isEdited = computed(() => createdAt !== updatedAt);

const timestamp = computed(() => {
  const formattedDate = new Date(updatedAt).toLocaleString();

  if (isEdited.value) {
    return `Edited ${formattedDate}`;
  }
  return `Created ${formattedDate}`;
});
</script>
