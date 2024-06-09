
import {createRouter, createWebHistory} from "vue-router";

import guest from './middlewares/guest'
import auth from './middlewares/auth'
import isAdmin from './middlewares/isAdmin'
import middlewarePipeline from './middlewares/middlewarePipeline'

// components
import politicPage from '@/pages/politicsPage.vue';
import viewPage from '@/pages/viewPage.vue';
import skeletonAdmin from '@/layouts/EskeletonAdmin.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path:'/',
      component: () => import('@/pages/clientHomePage.vue'),
      meta: {
        title: 'Bienvenido'
      },
    },
    {
      path:'/admin',
      redirect:'/politics'
    },
    { 
      path: '/admin',
      name: 'HomeDash',
      component: skeletonAdmin ,
      children: [
        {
          name: 'dashboard',
          path: 'dashboard',
          component: () => import('@/pages/dashboardPage.vue'),
          meta: {
            // middleware: [
            //   auth
            // ],
            title : 'Dashboard'
          },
        },
        {
          name: 'politics',
          path: '/politics',
          component: politicPage,
          meta: {
            // middleware: [
            //   auth
            // ],
            title : 'Dashboard'
          },
        },
        {
          name: 'view',
          path: '/view',
          component: viewPage,
          meta: {
            // middleware: [
            //   auth
            // ],
            title : 'Cartas'
          },
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import('@/pages/loginPage.vue'),
      meta: {
        title: 'Bienvenido'
      },
    },
    {
      path: "/client",
      name: "Client",
      
    }
    // {
    //   path: '/404',
    //   component: () => import('@/pages/[...all].vue'),
    //   meta: {
    //     title : 'OPPS! 404',
    //   },
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   component: () => import('@/pages/[...all].vue'),
    //   meta: {
    //     title : 'OPPS! 404',
    //   },
    // },
  ]
});


export default router
