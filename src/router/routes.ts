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
        name: 'home',
        component: () => import('pages/HomePage.vue')
      }, {
        path: 'is-admin',
        name: 'isAdmin',
        component: () => import('pages/IsOnRolePage.vue'),
        meta: {
          auth: 'admin'
        }
      }, {
        path: 'is-developer',
        name: 'isDeveloper',
        component: () => import('pages/IsOnRolePage.vue'),
        meta: {
          auth: 'developer'
        }
      }],
      meta: {
        auth: true
      }
    },
    {
      path: '/',
      component: () => import('layouts/AuthLayout.vue'),
      children: [{
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      }],
      meta: {
        auth: false
      }
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
