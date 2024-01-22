<template>
  <div class="flex justify-around py-1.5">
    <button @click="onLikeClick">
      <span v-if="isLiked">
        <v-icon name="hi-solid-heart" class="h-5 w-5 mx-1" />{{ likes.length }}
      </span>
      <span v-else><v-icon name="hi-heart" class="h-5 w-5 mx-1" />{{ likes.length }}</span>
    </button>
    <RouterLink :to="`/thread/${post._id}`">
      <span><v-icon name="fa-comments" class="h-5 w-5 mx-1" />{{ post.commentsCount }}</span>
    </RouterLink>
    <PostFormView :quoted-post="post" :modal-id="post._id">
      <button>
        <span>
          <v-icon name="bi-chat-quote-fill" class="h-5 w-5 mx-1" />{{ post.quotationsCount }}
        </span>
      </button>
    </PostFormView>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import _ from 'lodash';
import PostFormView from '@/views/home/postForm/PostFormView.vue';

const store = useUserStore();

const { currentUserData } = storeToRefs(store);

const { post } = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const likes = ref(post.likes);

const isLiked = ref(_.includes(likes.value, currentUserData.value.username));

const onLikeClick = () => {
  isLiked.value = !isLiked.value;

  if (isLiked.value) {
    likes.value = _.concat(likes.value, currentUserData.value.username);
  } else {
    likes.value = _.without(likes.value, currentUserData.value.username);
  }
};
</script>
