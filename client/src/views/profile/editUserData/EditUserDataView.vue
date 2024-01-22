<template>
  <ModalComponent :modal-id="MODAL_ID">
    <template v-slot:modal-button>
      <button class="btn btn-accent"><v-icon name="fa-regular-edit" />Edit your data</button>
    </template>
    <template v-slot:modal-content>
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
    </template>
  </ModalComponent>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { InputComponent, TextAreaComponent, ModalComponent } from '@/components';
import validationSchema from './editUserValidation';
import { useUserStore } from '@/stores';

const MODAL_ID = 'editUserDataModal';

const store = useUserStore();

const { updateUserData } = store;

const { currentUserData } = storeToRefs(store);
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
    document.getElementById(MODAL_ID).close();

    return;
  }

  errorMessage.value = 'Error updating user data!';
});
</script>
