<template>
  <div class="flex flex-col h-screen">
    <HeaderComponent />
    <div class="grow">
      <LoadingComponent v-if="isChangingUserStatus" class="mt-32" />
      <RouterView v-else />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { HeaderComponent, FooterComponent, LoadingComponent } from '@/components';
import { useUserStore } from '@/stores';

const store = useUserStore();
const { isChangingUserStatus } = storeToRefs(store);
</script>
