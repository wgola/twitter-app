<template>
  <div class="mx-auto w-2/5 bg-base-300 px-10 py-5 rounded-lg">
    <h1 class="text-3xl font-bold text-center my-10 uppercase">Create account</h1>
    <form @submit="onSubmit" autocomplete="off">
      <InputComponent name="username" type="text" label="Username" />
      <InputComponent name="password" type="password" label="Password" />
      <InputComponent name="confirmPassword" type="password" label="Confirm password" />
      <InputComponent name="firstname" type="text" label="Firstname" />
      <InputComponent name="surname" type="text" label="Surname" />
      <p
        :class="`${registeringMessage.isError ? 'text-error' : 'text-success'} h-8 m-2 text-center text-xl`"
      >
        {{ registeringMessage.message }}
      </p>
      <div class="flex justify-around">
        <button
          type="submit"
          class="btn btn-success btn-lg uppercase font-bold"
          :disabled="isSubmitting"
        >
          Register
        </button>
        <RouterLink to="/login" class="btn btn-accent btn-lg uppercase font-bold"
          >Log in</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import validationSchema from './registrationValidation';
import { InputComponent } from '@/components';
import { registerUser } from '@/services';

const { handleSubmit, isSubmitting } = useForm({ validationSchema });

const registeringMessage = ref({
  message: '',
  isError: false
});

const onSubmit = handleSubmit(async ({ username, password, firstname, surname }) => {
  registeringMessage.value = {
    isError: false,
    message: ''
  };

  const user = { username, password, firstname, surname };

  const result = await registerUser(user);

  if (result.error) {
    registeringMessage.value = {
      isError: true,
      message: 'An error occurred while registering user!'
    };
  }

  registeringMessage.value = {
    isError: false,
    message: 'Account registered succesfully, you can log in now!'
  };
});
</script>
