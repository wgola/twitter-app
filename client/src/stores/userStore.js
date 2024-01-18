import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import _ from 'lodash';
import { checkUserLoggedIn } from '@/services';

export const useUserStore = defineStore('userStore', () => {
  const user = ref({});
  const isUserAuthenticating = ref(false);

  const userData = computed(() => user.value);

  const saveUserData = (newUserData) => (user.value = newUserData);

  const isUserLoggedIn = async () => {
    if (!_.isEmpty(user.value)) {
      return true;
    }

    isUserAuthenticating.value = true;
    const { error, data } = await checkUserLoggedIn();

    if (error) {
      isUserAuthenticating.value = false;
      return false;
    }

    saveUserData(data);
    isUserAuthenticating.value = false;
    return true;
  };

  const clearUserData = () => (user.value = {});

  return { user, userData, isUserLoggedIn, saveUserData, clearUserData, isUserAuthenticating };
});
