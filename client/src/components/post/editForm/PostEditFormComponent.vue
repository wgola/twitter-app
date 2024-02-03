<template>
  <ModalComponent :modal-id="modalId">
    <template v-slot:modal-button>
      <slot />
    </template>
    <template v-slot:modal-content>
      <h3 class="font-bold text-xl uppercase text-center mb-5">
        Edit {{ parentPostId ? 'comment' : 'post' }}
      </h3>
      <QuotedPostComponent v-if="quotedPost" :quoted-post="quotedPost" />
      <form @submit="onSubmit" class="flex flex-col justify-center">
        <TextAreaComponent name="content" label="Posts's content" />
        <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
        <button :disabled="isSubmitting" class="btn btn-accent font-bold uppercase">
          Edit post
        </button>
      </form>
    </template>
  </ModalComponent>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import TextAreaComponent from '@/components/general/TextAreaComponent.vue';
import ModalComponent from '@/components/general/ModalComponent.vue';
import QuotedPostComponent from '../QuotedPostComponent.vue';
import validationSchema from './formValidation';
import { editPostRequest } from '@/services';
import { useRouter } from 'vue-router';

const { parentPostId, quotedPost, modalId, initialContent, postId } = defineProps({
  modalId: {
    type: String,
    required: true
  },
  parentPostId: {
    type: String,
    default: null
  },
  quotedPost: {
    type: Object,
    default: null
  },
  initialContent: {
    type: String,
    required: true
  },
  postId: {
    type: String,
    required: true
  }
});

const router = useRouter();

const errorMessage = ref('');

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema,
  initialValues: { content: initialContent }
});

const onSubmit = handleSubmit(async (values) => {
  errorMessage.value = '';

  const newContent = values.content;

  const { error } = await editPostRequest(postId, newContent);

  if (error) {
    errorMessage.value = 'Error editing post!';
    return;
  }

  resetForm();
  document.getElementById(modalId).close();
  router.go();
});
</script>
