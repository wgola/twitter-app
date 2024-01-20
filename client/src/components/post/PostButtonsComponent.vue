<template>
  <div class="flex justify-around py-1.5">
    <button @click="onLikeClick">
      <span v-if="post.isLiked">
        <v-icon name="hi-solid-heart" class="h-5 w-5 mx-1" />{{ post.likesCount }}
      </span>
      <span v-else><v-icon name="hi-heart" class="h-5 w-5 mx-1" />{{ post.likesCount }}</span>
    </button>
    <button @click="onCommentClick">
      <span><v-icon name="fa-comments" class="h-5 w-5 mx-1" />{{ post.commentsCount }}</span>
    </button>
    <button @click="onQuoteClick">
      <span>
        <v-icon name="bi-chat-quote-fill" class="h-5 w-5 mx-1" />{{ post.quotationsCount }}
      </span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>
