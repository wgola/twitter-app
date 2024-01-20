<template>
  <div class="flex flex-col bg-base-200 w-1/3 rounded-2xl border border-gray-500">
    <ParentPostLinkComponent
      v-if="post.parentPostId && !isComment"
      :parent-post-id="post.parentPostId"
    />
    <PostHeaderComponent :author="post.author" />
    <QuotedPostComponent v-if="!_.isEmpty(post.quotedPost.author)" :quoted-post="post.quotedPost" />
    <PostContentComponent :content="post.content" />
    <PostButtonsComponent :post="post" />
  </div>
</template>

<script setup>
import _ from 'lodash';
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
