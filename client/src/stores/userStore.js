import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import _ from 'lodash';
import { checkUserLoggedIn } from '@/services';

export const useUserStore = defineStore('userStore', () => {
  const user = ref({});

  const userData = computed(() => user.value);

  const saveUserData = (newUserData) => (user.value = newUserData);

  const isUserLoggedIn = async () => {
    if (!_.isEmpty(user.value)) {
      return true;
    }

    const { error, data } = await checkUserLoggedIn();

    if (error) {
      return false;
    }

    saveUserData(data);
    return true;
  };

  const clearUserData = () => (user.value = {});

  return { user, userData, isUserLoggedIn, saveUserData, clearUserData };
});
