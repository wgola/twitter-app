<template>
  <div class="hero mt-36">
    <div class="hero-content flex-col lg:flex-row">
      <img src="../assets/logo.svg" class="max-w-sm rounded-lg" />
      <div>
        <div class="text-5xl font-bold flex gap-1">
          <span>Welcome to</span>
          <img src="../assets/logo.svg" width="50px" class="mt-2" />
          <span>!</span>
        </div>
        <p class="py-6 text-xl">
          Immerse yourself in a world of enhanced features, seamless navigation, and cutting-edge
          design. Discover the next level of performance and explore a refined digital landscape
          with Y, your gateway to a reimagined digital experience.
        </p>
        <div class="flex w-full">
          <RouterLink
            to="/login"
            class="grid h-20 flex-grow btn btn-primary rounded-box place-items-center text-xl uppercase font-bold"
          >
            Log In
          </RouterLink>
          <div class="divider divider-horizontal">OR</div>
          <RouterLink
            to="/register"
            class="grid h-20 flex-grow btn btn-accent rounded-box place-items-center text-xl uppercase font-bold"
          >
            Register
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
