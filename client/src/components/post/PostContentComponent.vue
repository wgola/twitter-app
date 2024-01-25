<template>
  <div class="p-3 border-b border-b-gray-500">
    <div class="break-all mb-2">
      {{ post.content.edited || post.content.original }}
    </div>
    <div class="text-gray-500 text-sm" v-if="!isEdited">{{ timestamp }}</div>
    <div v-else>
      <ModalComponent :modal-id="`${post._id}-original`">
        <template v-slot:modal-button>
          <div class="text-gray-500 text-sm link">
            <v-icon name="fa-regular-edit" class="h-5" />{{ timestamp }}
          </div>
        </template>
        <template v-slot:modal-content>
          <h3 class="font-bold text-xl uppercase text-center mb-5">Original content:</h3>
          <div class="break-all mb-2">
            {{ post.content.original }}
          </div>
          <div class="text-gray-500 text-sm">
            Created {{ new Date(post.createdAt).toLocaleString() }}
          </div>
        </template>
      </ModalComponent>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ModalComponent from '../general/ModalComponent.vue';

const { post } = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const isEdited = computed(() => !!post.contentEditedAt);

const timestamp = computed(() => {
  if (isEdited.value) {
    const formattedDate = new Date(post.contentEditedAt).toLocaleString();

    return `Edited ${formattedDate}`;
  }

  const formattedDate = new Date(post.createdAt).toLocaleString();

  return `Created ${formattedDate}`;
});
</script>
