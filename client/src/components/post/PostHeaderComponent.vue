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
        <span v-if="author.isFollowed">
          <v-icon name="hi-solid-heart" class="h-5 w-5 mx-1" />Unfollow
        </span>
        <span v-else><v-icon name="hi-heart" class="h-5 w-5 mx-1" />Follow</span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  author: {
    type: Object,
    required: true
  }
});
</script>
