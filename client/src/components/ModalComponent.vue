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
const { modalId } = defineProps({
  modalId: {
    type: String,
    required: true
  }
});

const onShowModal = () => {
  document.getElementById(modalId).showModal();
};
</script>
