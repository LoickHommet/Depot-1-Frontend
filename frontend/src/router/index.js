import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import register from '../views/Register.vue';
import login from '../views/Login.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    },
    {
    path: '/register',
    name: 'register',
    component: register,
  },
    {
    path: '/login',
    name: 'login',
    component: login,
  },
  // Ajoutez d'autres routes ici
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
