import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import AddExpense from '../views/AddExpense.vue';
import ExpensesList from '../views/ExpensesList.vue';





const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    },
    {
    path: '/register',
    name: 'Register',
    component: Register,
  },
    {
    path: '/login',
    name: 'Login',
    component: Login,
  },
    {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
    {
    path: '/addExpense',
    name: 'AddExpense',
    component: AddExpense,
  },
    {
    path: '/expensesList',
    name: 'ExpensesList',
    component: ExpensesList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
