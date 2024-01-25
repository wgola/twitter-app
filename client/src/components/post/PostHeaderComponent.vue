<template>
  <div
    class="flex w-full flex-col sm:flex-row justify-between py-1 px-3 border-b border-b-gray-500"
  >
    <div class="flex">
      <div class="avatar m-2">
        <div class="w-14 rounded-full">
          <img :src="author.profilePictureUrl || avatar" />
        </div>
      </div>
      <div class="flex flex-col m-2">
        <p class="font-bold">{{ author.firstname }} {{ author.surname }}</p>
        <RouterLink :to="`/profile/${author.username}`" class="hover:link">
          @{{ author.username }}
        </RouterLink>
      </div>
    </div>
    <div class="my-auto">
      <button
        v-if="!isCurrentUser"
        class="btn btn-accent uppercase my-auto btn-sm"
        @click="onFollowClick"
      >
        <span v-if="isUserFollowed">
          <v-icon name="hi-solid-heart" class="h-5 w-5 mx-1" />Unfollow
        </span>
        <span v-else><v-icon name="hi-heart" class="h-5 w-5 mx-1" />Follow</span>
      </button>
      <div v-else-if="!isQuotedPost && isProfilePage" class="flex gap-2">
        <PostEditFormComponent
          :modal-id="`${post._id}-edit`"
          :parent-post-id="post.parentPostId"
          :quoted-post="post.quotedPost"
          :initial-content="post.content.edited || post.content.original"
          :post-id="post._id"
        >
          <button class="btn btn-accent uppercase my-auto btn-sm">
            <v-icon name="fa-regular-edit" class="h-5 w-5 mx-1" />Edit
          </button>
        </PostEditFormComponent>
        <button
          class="btn btn-error uppercase my-auto btn-sm"
          @click="onDeleteClick"
          :disabled="isDeleting"
        >
          <v-icon name="md-deleteforever-outlined" class="h-5 w-5 mx-1" />Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { followUserRequest, unfollowUserRequest, deletePostRequest } from '@/services';
import avatar from '@/assets/avatar.png';
import PostEditFormComponent from './editForm/PostEditFormComponent.vue';
import { useRouter } from 'vue-router';

const { post } = defineProps({
  post: {
    type: Object,
    required: true
  },
  isQuotedPost: {
    type: Boolean,
    default: false
  },
  isProfilePage: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const author = post.author;

const store = useUserStore();

const { checkIfUserFollowed, followUser, unfollowUser } = store;

const { currentUserData } = storeToRefs(store);
const isCurrentUser = ref(currentUserData.value.username === author.username);
const isUserFollowed = ref(false);
const isDeleting = ref(false);

watch(
  () => currentUserData.value.follows,
  () => {
    isUserFollowed.value = checkIfUserFollowed(author.username);
  },
  { immediate: true }
);

const onFollowClick = async () => {
  const response = isUserFollowed.value
    ? await unfollowUserRequest(author.username)
    : await followUserRequest(author.username);

  if (response) {
    isUserFollowed.value = !isUserFollowed.value;

    if (isUserFollowed.value) {
      store.currentUser.followingCount += 1;
      followUser(author.username);
    } else {
      store.currentUser.followingCount -= 1;
      unfollowUser(author.username);
    }
  }
};

const onDeleteClick = async () => {
  isDeleting.value = true;
  await deletePostRequest(post._id);
  isDeleting.value = false;
  router.go();
};
</script>
