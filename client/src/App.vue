<template>
  <div class="flex flex-col h-screen">
    <HeaderComponent />
    <RouterView class="grow" />
    <FooterComponent />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { HeaderComponent, FooterComponent } from '@/components';
</script>
