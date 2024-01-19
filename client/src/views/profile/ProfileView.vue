<template>
  <LoadingComponent v-if="isLoading" class="mt-52" />
  <div v-else>
    <div class="mx-auto w-2/3">
      <div class="avatar">
        <div class="w-24 rounded-full m-1 border border-accent">
          <img :src="profileData.profilePictureUrl || 'src/assets/avatar.png'" />
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
          <span v-if="profileData.isFollowed"
            ><v-icon name="hi-solid-heart" class="h-6 w-6 mx-1" />Unfollow</span
          >
          <span v-else><v-icon name="hi-heart" class="h-6 w-6 mx-1" />Follow</span>
        </button>
      </div>
    </div>
    <div class="bg-base-200 rounded-box flex justify-center">
      <ul class="menu menu-vertical lg:menu-horizontal gap-5">
        <RouterLink :to="`/profile/${profileData.username}/posts`" class="btn">Posts</RouterLink>
        <RouterLink :to="`/profile/${profileData.username}/likes`" class="btn">Likes</RouterLink>
        <RouterLink :to="`/profile/${profileData.username}/following`" class="btn">
          Following
        </RouterLink>
        <RouterLink :to="`/profile/${profileData.username}/followers`" class="btn">
          Followers
        </RouterLink>
      </ul>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { getUserDetailsByUsername, changeFollowingUserRequest } from '@/services';
import EditUserDataButton from './editUserData/EditUserDataView.vue';
import EditAvatarButton from './editAvatar/EditAvatarView.vue';
import { LoadingComponent } from '@/components';
import { useUserStore } from '@/stores';

const route = useRoute();
const store = useUserStore();

const { currentUserData } = storeToRefs(store);

const isCurrentUser = ref(false);
const isLoading = ref(true);
let profileData = {};

watch(
  () => route.params.username,
  async (newUsername) => {
    isLoading.value = true;

    if (newUsername === currentUserData.value.username) {
      profileData = currentUserData;
      isCurrentUser.value = true;
    } else {
      const { data } = await getUserDetailsByUsername(newUsername);
      profileData = ref(data);
      console.log(profileData.value);
      isCurrentUser.value = false;
    }

    isLoading.value = false;
  },
  { immediate: true }
);

const onFollowClick = async () => {
  changeFollowingUserRequest(profileData.value.username);

  profileData.value.isFollowed = !profileData.value.isFollowed;

  profileData.value.followersCount += profileData.value.isFollowed ? 1 : -1;
  store.currentUser.followingCount += profileData.value.isFollowed ? 1 : -1;
};
</script>
