<template>
  <div class="flex flex-col h-screen">
    <HeaderComponent />
    <div class="grow">
      <LoadingComponent v-if="isUserAuthenticating" class="mt-52" />
      <RouterView v-else />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { HeaderComponent, FooterComponent, LoadingComponent } from '@/components';
import { useUserStore } from './stores';
import { storeToRefs } from 'pinia';

const store = useUserStore();
const { isUserAuthenticating } = storeToRefs(store);
</script>
