import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/home',
    name: 'home',
    redirect: { name: 'home' },
  },
  {
    path: '/your-library',
    name: 'library',
    component: () => import('../views/Library.vue'),
  },
  {
    path: '/movie/:movieId',
    name: 'movie-api-details',
    component: () => import('../views/MovieApiDetails.vue'),
  },
  {
    path: '/library/movie/add/:movieId',
    name: 'movie-library-add',
    component: () => import('../views/MovieLibraryAdd.vue'),
  },
  {
    path: '/library/movie/edit/:movieId',
    name: 'movie-library-edit',
    component: () => import('../views/MovieLibraryEdit.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
