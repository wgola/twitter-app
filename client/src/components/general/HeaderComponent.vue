<template>
  <div class="navbar bg-base-300 top-0 sticky z-50 mb-10">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <RouterLink to="/home" class="btn text-xl p-2">
            <v-icon name="co-home" class="mt-1" />Home</RouterLink
          >
          <SearchPeopleComponent v-if="isUserLoggedIn" :is-short="true" />
        </ul>
      </div>
      <RouterLink to="/">
        <img src="@/assets/logo.svg" width="50px" />
      </RouterLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-4">
        <RouterLink to="/home" class="btn btn-wide text-xl p-2">
          <v-icon name="co-home" class="mt-1" />Home
        </RouterLink>
        <SearchPeopleComponent v-if="isUserLoggedIn" />
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="profilePicture" :src="currentUserData.profilePictureUrl || avatar" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          v-if="isUserLoggedIn"
        >
          <li>
            <RouterLink :to="`/profile/${currentUserData.username}`" class="btn text-xl p-2">
              <v-icon name="md-accountcircle" class="mt-1" />Profile</RouterLink
            >
          </li>
          <li>
            <button @click="logOut" class="btn text-xl p-2">
              <v-icon name="md-logout" class="mt-1" />Logout
            </button>
          </li>
        </ul>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          v-else
        >
          <li>
            <RouterLink to="/login" class="btn text-xl p-2">
              <v-icon name="md-login" class="mt-1" />Log in</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores';
import avatar from '@/assets/avatar.png';
import SearchPeopleComponent from './SearchPeopleComponent.vue';

const store = useUserStore();
const router = useRouter();

const { currentUserData, isUserLoggedIn } = storeToRefs(store);
const { checkUserStatus, logOutUser } = store;

onMounted(() => {
  checkUserStatus();
});

const logOut = async () => {
  const result = await logOutUser();

  if (result) {
    router.push('/');
  }
};
</script>
