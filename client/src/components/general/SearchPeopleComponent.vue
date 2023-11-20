<template>
  <ModalComponent :modal-id="isShort ? 'search-short' : 'search-main'">
    <template v-slot:modal-button>
      <div :class="`btn ${isShort ? 'w-full' : 'btn-wide'} text-xl p-2`">
        <v-icon name="md-personsearch" class="mt-1" />
        Search
      </div>
    </template>
    <template v-slot:modal-content>
      <h3 class="font-bold text-xl uppercase text-center mb-5">Search for people</h3>
      <form class="flex w-full justify-center">
        <input
          type="text"
          placeholder="Type username to search"
          class="input input-bordered w-full max-w-xs"
          v-model="username"
          required
        />
      </form>
      <InfiniteScrollListComponent
        :load-more-data="loadMoreUsers"
        :can-load-more="() => hasNextPage"
        :is-fetching="isFetching"
        :is-no-content="hasNoContent"
        :no-content-message="hasNoContentMessage"
        class="h-[400px] mt-10"
      >
        <ShortUserComponent v-for="user in foundUsers" :key="user._id" :user="user" />
      </InfiniteScrollListComponent>
    </template>
  </ModalComponent>
</template>

<script setup>
import InfiniteScrollListComponent from './InfiniteScrollListComponent.vue';
import ModalComponent from './ModalComponent.vue';
import { computed, ref, watch } from 'vue';
import { searchUsersRequest } from '@/services';
import ShortUserComponent from '../profile/ShortUserComponent.vue';
import { useDebounceFn } from '@vueuse/core';

defineProps({
  isShort: {
    type: Boolean,
    default: false
  }
});

const username = ref('');
const hasNextPage = ref(false);
const isFetching = ref(false);
const currentPage = ref(1);
const foundUsers = ref([]);

const hasNoContent = computed(() => !hasNextPage.value && username.value !== '');
const hasNoContentMessage = computed(() =>
  foundUsers.value.length === 0 ? 'No users found!' : 'No more users!'
);

const onUsernameChange = useDebounceFn(() => loadMoreUsers(), 500);

const loadMoreUsers = async () => {
  if (username.value === '') {
    return;
  }

  isFetching.value = true;
  const { data, error } = await searchUsersRequest(username.value, currentPage.value);

  if (error) {
    return;
  }

  hasNextPage.value = data.hasNextPage;
  foundUsers.value = [...foundUsers.value, ...data.docs];
  isFetching.value = false;
};

watch(username, (newValue) => {
  foundUsers.value = [];
  if (newValue === '') {
    hasNextPage.value = false;
    currentPage.value = 1;
  } else {
    onUsernameChange();
  }
});
</script>
