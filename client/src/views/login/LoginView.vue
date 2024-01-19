<template>
  <div class="mx-auto w-2/5 bg-base-300 px-10 py-5 rounded-lg">
    <h1 class="text-3xl font-bold text-center my-10 uppercase">Log in</h1>
    <form @submit="onSubmit" autocomplete="off">
      <InputComponent name="username" type="text" label="Username" />
      <InputComponent name="password" type="password" label="Password" />
      <p class="text-error h-8 m-2 text-center text-xl">
        {{ loginError }}
      </p>
      <div class="flex justify-around">
        <button
          type="submit"
          class="btn btn-success btn-lg uppercase font-bold"
          :disabled="isSubmitting"
        >
          Log in
        </button>
        <RouterLink to="/register" class="btn btn-accent btn-lg uppercase font-bold"
          >Register</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useForm } from 'vee-validate';
import validationSchema from './loginValidation';
import { InputComponent } from '@/components';
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

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
