<template>
  <div class="flex py-1 px-3 border-b border-b-gray-500">
    <div class="avatar m-2">
      <div class="w-14 rounded-full">
        <img :src="author.profilePictureUrl || '/src/assets/avatar.png'" />
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div class="flex flex-col m-2">
        <p class="font-bold">{{ author.firstname }} {{ author.surname }}</p>
        <RouterLink :to="`/profile/${author.username}`" class="hover:link">
          @{{ author.username }}
        </RouterLink>
      </div>
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
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { changeFollowingUserRequest } from '@/services';

const { author } = defineProps({
  author: {
    type: Object,
    required: true
  }
});

const store = useUserStore();
const { checkIfUserFollowed, followUser, unfollowUser } = store;

const { currentUserData } = storeToRefs(store);
const isCurrentUser = ref(currentUserData.value.username === author.username);
const isUserFollowed = ref(false);

watch(
  () => currentUserData.value.follows,
  () => {
    isUserFollowed.value = checkIfUserFollowed(author.username);
  },
  { immediate: true }
);

const onFollowClick = () => {
  changeFollowingUserRequest(author.username);

  isUserFollowed.value = !isUserFollowed.value;

  if (isUserFollowed.value) {
    store.currentUser.followingCount += 1;
    followUser(author.username);
  } else {
    store.currentUser.followingCount -= 1;
    unfollowUser(author.username);
  }
};
</script>