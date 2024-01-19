import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import _ from 'lodash';
import {
  checkUserLoggedInRequest,
  logInUserRequest,
  logOutUserRequest,
  updateProfilePictureRequest,
  updateUserDataRequest
} from '@/services';

export const useUserStore = defineStore('userStore', () => {
  const currentUser = ref({});
  const isChangingUserStatus = ref(false);
  const isUserChecked = ref(false);

  const currentUserData = computed(() => currentUser.value);

  const isUserLoggedIn = computed(() => !_.isEmpty(currentUser.value));

  const checkUserStatus = async () => {
    if (isUserLoggedIn.value) {
      return;
    }

    isChangingUserStatus.value = true;
    const { error, data } = await checkUserLoggedInRequest();

    if (error) {
      isChangingUserStatus.value = false;
      isUserChecked.value = true;
      return;
    }

    currentUser.value = data;
    isChangingUserStatus.value = false;
    isUserChecked.value = true;
  };

  const logInUser = async (loginData) => {
    const { error, data } = await logInUserRequest(loginData);

    if (error) {
      return false;
    }

    currentUser.value = data;
    return true;
  };

  const logOutUser = async () => {
    isChangingUserStatus.value = true;

    const { error } = await logOutUserRequest();

    if (error) {
      return false;
    }

    currentUser.value = {};
    isChangingUserStatus.value = false;
    return true;
  };

  const updateProfilePicture = async (profilePicture) => {
    const { data, error } = await updateProfilePictureRequest(profilePicture);

    if (error) {
      return false;
    }

    currentUser.value.profilePictureUrl = data;
    return true;
  };

  const updateUserData = async (userData) => {
    const { error } = await updateUserDataRequest(userData);

    if (error) {
      return false;
    }

    currentUser.value.firstname = userData.firstname;
    currentUser.value.surname = userData.surname;
    currentUser.value.description = userData.description;
    return true;
  };

  return {
    currentUser,
    isUserChecked,
    isChangingUserStatus,
    isUserLoggedIn,
    currentUserData,
    checkUserStatus,
    logInUser,
    logOutUser,
    updateProfilePicture,
    updateUserData
  };
});
