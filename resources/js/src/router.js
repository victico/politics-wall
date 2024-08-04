
import {createRouter, createWebHistory} from "vue-router";

import guest from './middlewares/guest'
import auth from './middlewares/auth'

// components
import politicPage from '@/pages/politicsPage.vue';
import opinionPage from '@/pages/opinionPage.vue';
import configPage from '@/pages/configPage.vue';


// import viewPage from '@/pages/viewPage.vue';
import skeletonAdmin from '@/layouts/EskeletonAdmin.vue'
// import clientPageLayout from '@/layouts/clientPageLayout.vue'

// clientPageLayout

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    { 
      path: '/',
      name: 'clientHome',
      component: () => import('@/layouts/clientPageLayout.vue'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/pages/clientHomePage.vue'),
          meta: {
            title : 'Bienvenido'
          },
        },
        {
          name: 'opinion_c',
          path: '/opinion_client',
          component: () => import('@/pages/opinionClientPage.vue'),
          meta: {
            title : 'Opiniones'
          },
        },
        {
          name: 'we',
          path: '/about_us',
          component: () => import('@/pages/aboutUsClientPage.vue'),
          meta: {
            title : 'Nosotros'
          },
        },
      ]
    },

    {
      path:'/admin',
      redirect:'/dashboard'
    },
    { 
      path: '/admin',
      name: 'HomeDash',
      component: skeletonAdmin ,
      beforeEnter: auth,
      children: [
        {
          name: 'dashboard',
          path: '/dashboard',
          component: () => import('@/pages/dashboardPage.vue'),
          meta: {
            title : 'Dashboard'
          },
        },
        {
          name: 'politics',
          path: '/politics',
          component: politicPage,
          meta: {
            title : 'Dashboard'
          },
        },
        {
          name: 'opinion',
          path: '/opinion',
          component: opinionPage,
          meta: {
            title : 'Opiniones'
          },
        },
        {
          name: 'config',
          path: '/config',
          component: configPage,
          meta: {
            title : 'Opiniones'
          },
        },
        // {
        //   name: 'view',
        //   path: '/view',
        //   component: viewPage,
        //   meta: {
        //     title : 'Cartas'
        //   },
        // }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import('@/pages/loginPage.vue'),
      meta: {
        title: 'Bienvenido',
      },
      beforeEnter: guest
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
    // 404 ROUTEs
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/pages/404.vue"),
      meta: {
        title: 'Opss',
      },
    },
  ]
});


export default router
