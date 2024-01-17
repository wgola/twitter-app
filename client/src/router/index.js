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
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/ProfileView.vue'),
    beforeEnter: [checkUserAuthorized]
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
