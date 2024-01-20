<template>
  <div>
    <div class="flex bg-base-300 w-64 rounded-xl px-2">
      <div class="avatar m-2">
        <div class="w-14 rounded-full">
          <img :src="user.profilePictureUrl || '/src/assets/avatar.png'" />
        </div>
      </div>
      <div class="flex flex-col m-2">
        <p class="font-bold">{{ user.firstname }} {{ user.surname }}</p>
        <RouterLink :to="`/profile/${user.username}`" class="link">
          @{{ user.username }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
});
</script>
