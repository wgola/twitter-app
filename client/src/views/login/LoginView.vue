<template>
  <div class="mx-auto lg:w-3/5 md:w-4/5 w-full bg-base-300 sm:px-10 px-1 py-5 rounded-lg">
    <h1 class="text-3xl font-bold text-center my-10 uppercase">Log in</h1>
    <form @submit="onSubmit" autocomplete="off">
      <InputComponent name="username" type="text" label="Username" />
      <InputComponent name="password" type="password" label="Password" />
      <p class="text-error m-3 text-center text-xl">
        {{ loginError }}
      </p>
      <div class="flex flex-col w-full lg:flex-row">
        <button
          type="submit"
          class="btn btn-success btn-lg uppercase font-bold grid flex-grow h-20 rounded-box place-items-center"
          :disabled="isSubmitting"
        >
          Log in
        </button>
        <div class="divider lg:divider-horizontal">OR</div>
        <RouterLink
          to="/register"
          class="btn btn-accent btn-lg uppercase font-bold grid flex-grow h-20 rounded-box place-items-center"
          >Register</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import validationSchema from './loginValidation';
import { InputComponent } from '@/components';
import { useUserStore } from '@/stores';

const { handleSubmit, isSubmitting } = useForm({ validationSchema });
const store = useUserStore();
const router = useRouter();

const { logInUser } = store;

const loginError = ref('');

const onSubmit = handleSubmit(async (values) => {
  loginError.value = '';

  const result = await logInUser(values);

  if (result) {
    router.push('/home');
    return;
  }

  loginError.value = 'Error logging in - invalid username or password!';
});
</script>
