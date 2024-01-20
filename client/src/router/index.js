import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores';
import { storeToRefs } from 'pinia';

const checkUserAuthorized = async () => {
  const store = useUserStore();
  const { checkUserStatus } = store;
  const { isUserLoggedIn, isUserChecked } = storeToRefs(store);

  if (!isUserChecked.value) {
    await checkUserStatus();
  }

  return isUserLoggedIn.value || '/login';
};

const checkUserLoggedIn = async () => {
  const store = useUserStore();
  const { checkUserStatus } = store;
  const { isUserLoggedIn, isUserChecked } = storeToRefs(store);

  if (!isUserChecked.value) {
    await checkUserStatus();
  }

  return !isUserLoggedIn.value || '/home';
};

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/WelcomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue'),
    beforeEnter: [checkUserLoggedIn]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/registration/RegistrationView.vue'),
    beforeEnter: [checkUserLoggedIn]
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
    beforeEnter: [checkUserAuthorized]
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: () => import('@/views/profile/ProfileView.vue'),
    beforeEnter: [checkUserAuthorized],
    children: [
      {
        path: '/profile/:username/posts',
        name: 'userPosts',
        component: () => import('@/views/profile/UserPostsListView.vue')
      },
      {
        path: '/profile/:username/likes',
        name: 'userLikes',
        component: () => import('@/views/profile/UserLikesListView.vue')
      },
      {
        path: '/profile/:username/following',
        name: 'userFollowing',
        component: () => import('@/views/profile/UserFollowingListView.vue')
      },
      {
        path: '/profile/:username/followers',
        name: 'userFollowers',
        component: () => import('@/views/profile/UserFollowersListView.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
