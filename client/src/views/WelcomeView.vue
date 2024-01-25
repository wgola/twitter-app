<template>
  <div class="hero lg:mt-10 mt-0">
    <div class="hero-content flex-col lg:flex-row">
      <img src="../assets/logo.svg" class="sm:max-w-sm rounded-lg max-w-1/4" />
      <div>
        <div class="text-5xl font-bold flex gap-1 flex-wrap">
          <span>Welcome to</span>
          <img src="../assets/logo.svg" width="50px" class="mt-2" />
          <span>!</span>
        </div>
        <p class="py-6 text-xl">
          Immerse yourself in a world of enhanced features, seamless navigation, and cutting-edge
          design. Discover the next level of performance and explore a refined digital landscape
          with Y, your gateway to a reimagined digital experience.
        </p>
        <div class="flex w-full flex-col lg:flex-row">
          <RouterLink
            to="/login"
            class="grid h-20 flex-grow btn btn-success rounded-box place-items-center text-xl uppercase font-bold"
          >
            Log In
          </RouterLink>
          <div class="divider lg:divider-horizontal">OR</div>
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
