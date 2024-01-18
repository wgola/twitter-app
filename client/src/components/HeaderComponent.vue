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
          <RouterLink to="/home" class="btn btn-wide text-xl p-2">
            <v-icon name="co-home" class="mt-1" />Home</RouterLink
          >
        </ul>
      </div>
      <RouterLink to="/">
        <img src="../assets/logo.svg" width="50px" />
      </RouterLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <RouterLink to="/home" class="btn btn-wide text-xl p-2"
          ><v-icon name="co-home" class="mt-1" />Home</RouterLink
        >
      </ul>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="profilePicture"
              :src="
                isLoggedIn && store.userData.profilePictureUrl
                  ? store.userData.profilePictureUrl
                  : '/src/assets/avatar.png'
              "
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          v-if="isLoggedIn"
        >
          <li><RouterLink :to="`/profile/${userData.username}`">Profile</RouterLink></li>
          <li><button @click="logOut">Logout</button></li>
        </ul>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          v-else
        >
          <li><RouterLink to="/login">Log in</RouterLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { logOutUser } from '@/services';
import { useUserStore } from '@/stores';

const store = useUserStore();
const router = useRouter();

const { userData, isUserAuthenticating } = storeToRefs(store);

const isLoggedIn = ref(false);

onMounted(() => {
  store.isUserLoggedIn();
});

const logOut = async () => {
  isUserAuthenticating.value = true;
  await logOutUser();
  store.clearUserData();
  isUserAuthenticating.value = false;
  isLoggedIn.value = false;
  router.push('/');
};

watch(userData, async () => {
  isLoggedIn.value = await store.isUserLoggedIn();
});
</script>
