import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {auth} from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/LoginForm',
    name: 'LoginForm',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/Account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/CreateJob',
    name: 'CreateJob',
    component: () => import('../views/CreateJob.vue')
  },
  {
    path: '/ListJob',
    name: 'ListJob',
    component: () => import('../views/ListJob.vue')
  }
  ,
  {
    path: '/RegisterSeeker',
    name: 'RegisterSeeker',
    component: () => import('../views/Registerseeker.vue')
  }
  ,
  {
    path: '/RegisterOrganize',
    name: 'RegisterOrganize',
    component: () => import('../views/Registerorganize.vue')
  }
  ,
  {
    path: '/job-detail/:postid',
    name: 'DetailJob',
    component: () => import('../views/DetailJob.vue')
  },
  {
    path: '/Notification',
    name: 'Notification',
    component: () => import('../views/Notification.vue')
  }
  ,
  {
    path: '/Detail-notification:notificationID',
    name: 'DetailNotification',
    component: () => import('../views/DetailNotification.vue')
  }
  ,
  {
    path: '/AdminOrganize',
    name: 'AdminOrganize',
    component: () => import('../views/AdminOrganize.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next) =>{
  if((to.path == '/LoginForm' || to.path == '/RegisterForm') && auth.currentUser){
    next('/')
    return;
  }
  
  if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
    next('/LoginForm')
    return;
  }
  next();
})
export default router
