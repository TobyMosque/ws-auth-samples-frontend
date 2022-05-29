import { RouteRecordRaw } from 'vue-router';
import { Pinia } from 'pinia';
import { discard } from 'src/utils';

export default function ({ store }: { store: Pinia }) {
  discard({ store });
  const routes: RouteRecordRaw[] = [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      children: [{
        path: 'home',
        component: () => import('pages/HomePage.vue')
      }],
    },
    {
      path: '/',
      component: () => import('layouts/AuthLayout.vue'),
      children: [{
        path: 'login',
        component: () => import('pages/LoginPage.vue')
      }],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      component: () => import('pages/ErrorNotFound.vue'),
    },
  ];

  return routes;
}
