<template>
  <LoadingComponent v-if="isLoading" class="mt-52" />
  <NoContentComponent v-else-if="userNotFound" message="User not found!" class="mx-auto mt-36" />
  <div v-else>
    <div class="mx-auto w-2/3">
      <div class="avatar">
        <div class="w-24 rounded-full m-1 border border-accent">
          <img :src="profileData.profilePictureUrl || avatar" />
        </div>
        <EditAvatarButton v-if="isCurrentUser" />
      </div>
      <p class="text-2xl font-bold m-1">{{ profileData.firstname }} {{ profileData.surname }}</p>
      <p class="text-slate-500 m-1">@{{ profileData.username }}</p>
      <p class="m-2">{{ profileData.description }}</p>
      <div class="flex justify-between mb-2">
        <div class="flex gap-2 m-1">
          <span class="badge badge-accent p-3 m-1">
            <v-icon name="md-daterange-twotone" />&#160;Joined&#160;
            <b>{{ profileData.joinedAt.split('T')[0] }}</b>
          </span>
          <span class="badge badge-accent p-3 m-1">
            <b>{{ profileData.followingCount }}</b>
            &#160;following
          </span>
          <span class="badge badge-accent p-3 m-1">
            <b>{{ profileData.followersCount }}</b>
            &#160;followers
          </span>
        </div>
        <EditUserDataButton v-if="isCurrentUser" />
        <button v-if="!isCurrentUser" class="btn btn-accent uppercase" @click="onFollowClick">
          <span v-if="isUserFollowed"
            ><v-icon name="hi-solid-heart" class="h-6 w-6 mx-1" />Unfollow</span
          >
          <span v-else><v-icon name="hi-heart" class="h-6 w-6 mx-1" />Follow</span>
        </button>
      </div>
    </div>
    <div class="bg-base-200 rounded-box flex justify-center">
      <ul class="menu menu-vertical lg:menu-horizontal gap-5">
        <RouterLink
          :to="`/profile/${profileData.username}/posts`"
          :class="`${currentComponentName === 'userPosts' && 'border-b-2 border-accent'} btn`"
          >Posts</RouterLink
        >
        <RouterLink
          :to="`/profile/${profileData.username}/likes`"
          :class="`${currentComponentName === 'userLikes' && 'border-b-2 border-accent'} btn`"
          >Likes</RouterLink
        >
        <RouterLink
          :to="`/profile/${profileData.username}/following`"
          :class="`${currentComponentName === 'userFollowing' && 'border-b-2 border-accent'} btn`"
        >
          Following
        </RouterLink>
        <RouterLink
          :to="`/profile/${profileData.username}/followers`"
          :class="`${currentComponentName === 'userFollowers' && 'border-b-2 border-accent'} btn`"
        >
          Followers
        </RouterLink>
      </ul>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import avatar from '@/assets/avatar.png';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { getUserDetailsByUsername, followUserRequest, unfollowUserRequest } from '@/services';
import EditUserDataButton from './editUserData/EditUserDataView.vue';
import { LoadingComponent, NoContentComponent } from '@/components';
import EditAvatarButton from './editAvatar/EditAvatarView.vue';
import { useUserStore } from '@/stores';

const route = useRoute();
const store = useUserStore();

const { currentUserData } = storeToRefs(store);
const { checkIfUserFollowed, followUser, unfollowUser } = store;

const userNotFound = ref(false);
const isCurrentUser = ref(false);
const isLoading = ref(true);
let profileData = {};

const isUserFollowed = ref(false);
const currentComponentName = ref('');

watch(
  () => route.params.username,
  async (newUsername) => {
    userNotFound.value = false;
    isLoading.value = true;

    if (newUsername === currentUserData.value.username) {
      profileData = currentUserData;
      isCurrentUser.value = true;
    } else {
      const { data, error } = await getUserDetailsByUsername(newUsername);

      isUserFollowed.value = checkIfUserFollowed(newUsername);
      if (error) {
        userNotFound.value = true;
      } else {
        profileData = ref(data);

        isCurrentUser.value = false;
      }
    }

    isLoading.value = false;
  },
  { immediate: true }
);

watch(
  () => route.name,
  (newRouteName) => {
    currentComponentName.value = newRouteName;
  },
  { immediate: true }
);

const onFollowClick = async () => {
  const response = isUserFollowed.value
    ? await unfollowUserRequest(profileData.value.username)
    : await followUserRequest(profileData.value.username);

  if (response) {
    isUserFollowed.value = !isUserFollowed.value;

    if (isUserFollowed.value) {
      profileData.value.followersCount += 1;
      store.currentUser.followingCount += 1;
      followUser(profileData.value.username);
    } else {
      profileData.value.followersCount -= 1;
      store.currentUser.followingCount -= 1;
      unfollowUser(profileData.value.username);
    }
  }
};
</script>
