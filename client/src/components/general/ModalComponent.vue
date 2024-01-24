<template>
  <div :onclick="onShowModal">
    <slot name="modal-button" />
  </div>
  <dialog :id="modalId" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <slot name="modal-content" />
    </div>
  </dialog>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const { modalId } = defineProps({
  modalId: {
    type: String,
    required: true
  }
});

const route = useRoute();

const onShowModal = () => {
  document.getElementById(modalId).showModal();
};

watch(
  () => route.fullPath,
  () => {
    document.getElementById(modalId).close();
  }
);
</script>
