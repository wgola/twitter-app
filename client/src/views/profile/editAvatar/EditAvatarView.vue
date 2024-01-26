<template>
  <ModalComponent :modal-id="MODAL_ID">
    <template v-slot:modal-button>
      <button>
        <v-icon
          name="fa-regular-edit"
          class="w-8 h-8 absolute bottom-0 right-0 bg-base-300 rounded-full border border-accent p-1 text-accent"
        />
      </button>
    </template>
    <template v-slot:modal-content>
      <h3 class="font-bold text-xl uppercase text-center">Choose new avatar</h3>
      <form @submit.prevent="onSubmit" class="flex flex-col justify-center">
        <input
          @change="changeFile"
          type="file"
          class="file-input file-input-bordered w-full my-5"
          required
          accept="image/*"
        />
        <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
        <button :disabled="isSubmitting" class="btn btn-accent font-bold uppercase">Update</button>
      </form>
    </template>
  </ModalComponent>
</template>

<script setup>
import { ref } from 'vue';
import { ModalComponent } from '@/components';
import { useUserStore } from '@/stores';

const MODAL_ID = 'editAvatarModal';

const { updateProfilePicture } = useUserStore();

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
    document.getElementById(MODAL_ID).close();

    return;
  }

  isSubmitting.value = false;
  errorMessage.value = 'Error submitting file!';
};
</script>
