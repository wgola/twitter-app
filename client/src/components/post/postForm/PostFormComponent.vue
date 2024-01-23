<template>
  <ModalComponent :modal-id="modalId">
    <template v-slot:modal-button>
      <slot />
    </template>
    <template v-slot:modal-content>
      <h3 class="font-bold text-xl uppercase text-center mb-5">
        Add new {{ parentPostId ? 'comment' : 'post' }}
      </h3>
      <QuotedPostComponent v-if="quotedPost" :quoted-post="quotedPost" />
      <form @submit="onSubmit" class="flex flex-col justify-center">
        <TextAreaComponent name="content" label="Posts's content" />
        <p class="h-8 text-error italic text-center m-1">{{ errorMessage }}</p>
        <button :disabled="isSubmitting" class="btn btn-accent font-bold uppercase">
          Add post
        </button>
      </form>
    </template>
  </ModalComponent>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useUserStore, useMainPageStore, useThreadPageStore } from '@/stores';
import TextAreaComponent from '@/components/general/TextAreaComponent.vue';
import ModalComponent from '@/components/general/ModalComponent.vue';
import QuotedPostComponent from '../QuotedPostComponent.vue';
import validationSchema from './formValidation';
import { createPostRequest } from '@/services';

const { parentPostId, quotedPost, modalId } = defineProps({
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
  }
});

const userStore = useUserStore();
const mainPagePostsStore = useMainPageStore();
const threadPageStore = useThreadPageStore();
const route = useRoute();
const router = useRouter();

const { addPost } = mainPagePostsStore;
const { addComment } = threadPageStore;
const { currentUserData } = storeToRefs(userStore);

const errorMessage = ref('');

const { handleSubmit, isSubmitting, resetForm } = useForm({ validationSchema });

const onSubmit = handleSubmit(async (values) => {
  const newPost = {
    parentPostId,
    quotedPostId: quotedPost ? quotedPost._id : null,
    authorUsername: currentUserData.value.username,
    content: values.content
  };

  const { data, error } = await createPostRequest(newPost);

  if (error) {
    return;
  }

  if (parentPostId) {
    addComment(data);
  } else {
    if (route.fullPath !== '/home') {
      router.push('/home');
    }

    addPost(data);
  }

  resetForm();
  document.getElementById(modalId).close();
});
</script>
