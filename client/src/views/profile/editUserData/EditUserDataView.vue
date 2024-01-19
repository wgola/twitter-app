<template>
  <button onclick="editUserDataModal.showModal()" class="btn btn-accent">
    <v-icon name="fa-regular-edit" />Edit your data
  </button>
  <dialog ref="editUserDataModal" id="editUserDataModal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-xl uppercase text-center mb-5">Edit your data</h3>
      <form @submit="onSubmit" autocomplete="off">
        <InputComponent name="firstname" type="text" label="Firstname" />
        <InputComponent name="surname" type="text" label="Surname" />
        <TextAreaComponent name="description" label="Description" />
        <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
        <button :disabled="isSubmitting" class="btn w-full btn-accent font-bold uppercase">
          Edit
        </button>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { InputComponent, TextAreaComponent } from '@/components';
import validationSchema from './editUserValidation';
import { useUserStore } from '@/stores';

const store = useUserStore();

const { updateUserData } = store;

const { currentUserData } = storeToRefs(store);
const editUserDataModal = ref(null);
const errorMessage = ref('');

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues: {
    firstname: currentUserData.value.firstname,
    surname: currentUserData.value.surname,
    description: currentUserData.value.description
  }
});

const onSubmit = handleSubmit(async (values) => {
  const result = await updateUserData(values);

  if (result) {
    errorMessage.value = '';
    editUserDataModal.value.close();
    return;
  }

  errorMessage.value = 'Error updating user data!';
});
</script>
