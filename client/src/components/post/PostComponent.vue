<template>
  <div v-if="post.isDeleted">
    <NoContentComponent message="This post was deleted!" />
  </div>
  <div
    v-else
    class="flex flex-col bg-base-200 md:mx-5 mx-0 lg:w-[65ch] md:w-[70ch] w-full rounded-2xl border border-gray-500"
  >
    <ParentPostLinkComponent v-if="post.parentPostId && !isComment" :post="post" />
    <PostHeaderComponent :post="post" :is-profile-page="isProfilePage" />
    <QuotedPostComponent v-if="post.quotedPost" :quoted-post="post.quotedPost" />
    <PostContentComponent :post="post" />
    <PostButtonsComponent :post="post" />
  </div>
</template>

<script setup>
import PostHeaderComponent from './PostHeaderComponent.vue';
import PostContentComponent from './PostContentComponent.vue';
import QuotedPostComponent from './QuotedPostComponent.vue';
import PostButtonsComponent from './PostButtonsComponent.vue';
import ParentPostLinkComponent from './ParentPostLinkComponent.vue';
import NoContentComponent from '../general/NoContentComponent.vue';

defineProps({
  post: {
    type: Object,
    required: true
  },
  isComment: {
    type: Boolean,
    default: false
  },
  isProfilePage: {
    type: Boolean,
    default: false
  }
});
</script>
