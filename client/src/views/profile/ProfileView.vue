<template>
  <LoadingComponent v-if="isLoading" />
  <div v-else>
    <div class="mx-auto w-1/3">
      <div class="avatar">
        <div class="w-24 rounded-full m-1">
          <img :src="profileData.profilePictureUrl || 'src/assets/avatar.png'" />
        </div>
      </div>
      <div class="text-2xl font-bold m-1">
        {{ profileData.firstname }} {{ profileData.surname }}
      </div>
      <div class="text-slate-500 m-1">@{{ profileData.username }}</div>
      <div class="flex gap-2 m-1">
        <span class="badge badge-accent p-3 m-1"
          ><v-icon name="md-daterange-twotone" />&#160;Joined 01.01.2024</span
        >
        <span class="badge badge-accent p-3 m-1"><b>0</b>&#160;following</span>
        <span class="badge badge-accent p-3 m-1"><b>0</b>&#160;followers</span>
      </div>
      <div class="m-2">{{ profileData.description }}</div>
    </div>
    <div class="bg-base-200 rounded-box flex justify-center">
      <ul class="menu menu-vertical lg:menu-horizontal gap-5">
        <RouterLink :to="`/profile/${profileData.username}/posts`" class="btn">Posts</RouterLink>
        <RouterLink :to="`/profile/${profileData.username}/likes`" class="btn">Likes</RouterLink>
        <RouterLink :to="`/profile/${profileData.username}/following`" class="btn"
          >Following</RouterLink
        >
        <RouterLink :to="`/profile/${profileData.username}/followers`" class="btn"
          >Followers</RouterLink
        >
      </ul>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { LoadingComponent } from '@/components';
import { useUserStore } from '@/stores';

const route = useRoute();
const store = useUserStore();
const { userData } = storeToRefs(store);

const isLoading = ref(true);
const profileData = ref({});

watch(
  () => route.params.username,
  async (newUsername) => {
    isLoading.value = true;
    if (newUsername === userData.value.username) {
      profileData.value = userData.value;
      isLoading.value = false;
    } else {
      console.log('GET USER');
    }
  },
  { immediate: true }
);
</script>
