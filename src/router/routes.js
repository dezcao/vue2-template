import MainLayout from '@/views/Layout/MainLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

const routes = [
  {
    path: '/',
    redirect: '/sample/my-example',
    component: MainLayout,
    children: [
      
      {
        path: '/sample/my-example',
        name: 'my-example',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Sample/MyExample.vue'),
      },
      
      {
        path: '/menu2/contents1',
        name: 'm2_contents1',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Menu2/Contents1.vue'),
      },
      {
        path: '/menu2/contents2',
        name: 'm2_contents2',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Menu2/Contents2.vue'),
      },
      {
        path: '/menu2/contents3',
        name: 'm2_contents3',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Menu2/Contents3.vue'),
      },
      
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      }
    ]
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import(/* webpackChunkName: "demo" */ '../views/NotFoundPage.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
];

export default routes;
