import { createRouter, createWebHashHistory } from 'vue-router';
import { useUserStore } from '@/stores';

const checkUserAuthorized = async () => {
  const store = useUserStore();

  return (await store.isUserLoggedIn()) || '/login';
};

const checkUserLoggedIn = async () => {
  const store = useUserStore();

  return !(await store.isUserLoggedIn()) || '/home';
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
    component: () => import('@/views/HomeView.vue'),
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
        component: () => import('@/components/profile/UserPostsComponent.vue')
      },
      {
        path: '/profile/:username/likes',
        name: 'userLikes',
        component: () => import('@/components/profile/UserLikesComponent.vue')
      },
      {
        path: '/profile/:username/following',
        name: 'userFollowing',
        component: () => import('@/components/profile/UserFollowingComponent.vue')
      },
      {
        path: '/profile/:username/followers',
        name: 'userFollowers',
        component: () => import('@/components/profile/UserFollowersComponent.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
