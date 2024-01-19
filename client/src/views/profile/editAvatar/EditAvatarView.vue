<template>
  <button onclick="editAvatarModal.showModal()">
    <v-icon
      name="fa-regular-edit"
      class="w-8 h-8 absolute bottom-0 right-0 bg-base-300 rounded-full border border-accent p-1 text-accent"
    />
  </button>
  <dialog ref="editAvatarModal" id="editAvatarModal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-xl uppercase text-center">Choose new avatar</h3>
      <form @submit.prevent="onSubmit" class="flex flex-col justify-center">
        <input
          @change="changeFile"
          type="file"
          class="file-input file-input-bordered w-full my-5"
          required
        />
        <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
        <button :disabled="isSubmitting" class="btn btn-accent font-bold uppercase">Update</button>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';

const { updateProfilePicture } = useUserStore();

const editAvatarModal = ref(null);
const newFile = ref(null);
const isSubmitting = ref(false);
const errorMessage = ref('');

const changeFile = (event) => (newFile.value = event.target.files[0]);

const onSubmit = async () => {
  isSubmitting.value = true;

  const result = await updateProfilePicture(newFile.value);

  if (result) {
    isSubmitting.value = false;
    errorMessage.value = '';
    editAvatarModal.value.close();

    return;
  }

  isSubmitting.value = false;
  errorMessage.value = 'Error submitting file!';
};
</script>
