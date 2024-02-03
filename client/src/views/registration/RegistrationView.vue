<template>
  <div class="mx-auto lg:w-3/5 md:w-4/5 w-full bg-base-300 sm:px-10 px-1 py-5 rounded-lg">
    <h1 class="text-3xl font-bold text-center my-10 uppercase">Create account</h1>
    <form @submit="onSubmit" autocomplete="off">
      <InputComponent name="username" type="text" label="Username" />
      <InputComponent name="password" type="password" label="Password" />
      <InputComponent name="confirmPassword" type="password" label="Confirm password" />
      <InputComponent name="firstname" type="text" label="Firstname" />
      <InputComponent name="surname" type="text" label="Surname" />
      <p
        :class="`${registeringMessage.isError ? 'text-error' : 'text-success'} m-3 text-center text-xl`"
      >
        {{ registeringMessage.message }}
      </p>
      <div class="flex flex-col w-full lg:flex-row">
        <button
          type="submit"
          class="btn btn-success btn-lg uppercase font-bold grid flex-grow h-20 rounded-box place-items-center"
          :disabled="isSubmitting"
        >
          Register
        </button>
        <div class="divider lg:divider-horizontal">OR</div>
        <RouterLink
          to="/login"
          class="btn btn-accent btn-lg uppercase font-bold grid flex-grow h-20 rounded-box place-items-center"
          >Log in</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import validationSchema from './registrationValidation';
import { registerUserRequest } from '@/services';
import { InputComponent } from '@/components';

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

  const { error } = await registerUserRequest(user);

  if (error) {
    registeringMessage.value = {
      isError: true,
      message: 'An error occurred while registering user!'
    };
  } else {
    registeringMessage.value = {
      isError: false,
      message: 'Account registered succesfully, you can log in now!'
    };
  }
});
</script>
