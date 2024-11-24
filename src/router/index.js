import { createRouter, createWebHistory } from 'vue-router';
import UserManagement from '@/views/UserManagement.vue';
import NodeManagement from '@/views/NodeManagement.vue';
import HomePage from '@/views/HomePage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import store from '@/store';

const routes = [
  { path: "/login", name: 'Login', component: LoginPage, meta: { requiresAuth: false } },
  { path: "/register", name: 'Register', component: RegisterPage, meta: { requiresAuth: false } },
  { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/users', name: 'UserManagement', component: UserManagement, meta: { requiresAuth: true } },
  { path: '/nodes', name: 'NodeManagement', component: NodeManagement, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated; // Check authentication state (use Vuex or localStorage)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login page if not authenticated
  } else {
    next(); // Proceed to the route if authenticated or if no auth is required
  }
});

export default router;
