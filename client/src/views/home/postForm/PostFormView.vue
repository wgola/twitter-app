<template>
  <button onclick="addPostModal.showModal()">posta dodaj</button>
  <dialog ref="addPostModal" id="addPostModal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-xl uppercase text-center mb-5">Add new post</h3>
      <form @submit="onSubmit" class="flex flex-col justify-center">
        <TextAreaComponent name="content" label="Posts's content" />
        <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
        <button :disabled="isSubmitting" class="btn btn-accent font-bold uppercase">
          Add post
        </button>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { TextAreaComponent } from '@/components';
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import validationSchema from './formValidation';
import { storeToRefs } from 'pinia';
import { createPostRequest } from '@/services';

const store = useUserStore();

const { currentUserData } = storeToRefs(store);

const addPostModal = ref(null);

const errorMessage = ref('');

const { handleSubmit, isSubmitting } = useForm({ validationSchema });

const onSubmit = handleSubmit(async (values) => {
  const newPost = {
    authorUsername: currentUserData.value.username,
    content: values.content
  };

  const { data, error } = await createPostRequest(newPost);

  console.log(error);

  console.log(data);
});
</script>
