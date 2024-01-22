<template>
  <div class="flex flex-col bg-base-200 mx-5 w-[65ch] rounded-2xl border border-gray-500">
    <ParentPostLinkComponent
      v-if="post.parentPostId && !isComment"
      :parent-post-id="post.parentPostId"
    />
    <PostHeaderComponent :author="post.author" />
    <QuotedPostComponent v-if="post.quotedPost" :quoted-post="post.quotedPost" />
    <PostContentComponent :content="post.content" />
    <PostButtonsComponent :post="post" />
  </div>
</template>

<script setup>
import PostHeaderComponent from './PostHeaderComponent.vue';
import PostContentComponent from './PostContentComponent.vue';
import QuotedPostComponent from './QuotedPostComponent.vue';
import PostButtonsComponent from './PostButtonsComponent.vue';
import ParentPostLinkComponent from './ParentPostLinkComponent.vue';

defineProps({
  post: {
    type: Object,
    required: true
  },
  isComment: {
    type: Boolean,
    default: false
  }
});
</script>
