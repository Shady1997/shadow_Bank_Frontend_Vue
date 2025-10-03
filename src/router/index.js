import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import UsersTab from '@/components/UsersTab.vue'
import AccountsTab from '@/components/AccountsTab.vue'
import TransactionsTab from '@/components/TransactionsTab.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard/users'
      },
      {
        path: 'users',
        name: 'Users',
        component: UsersTab
      },
      {
        path: 'accounts',
        name: 'Accounts',
        component: AccountsTab
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: TransactionsTab
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router