import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {auth} from '../firebase'
import store from "../store/index"

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
    component: () => import('../views/Account.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/CreateJob',
    name: 'CreateJob',
    component: () => import('../views/CreateJob.vue'),
    meta: {
      requiresAuth: true,
    },
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
    component: () => import('../views/Notification.vue'),
    meta: {
      requiresAuth: true,
    },
  }
  ,
  {
    path: '/Detail-notification/:notificationID',
    name: 'DetailNotification',
    component: () => import('../views/DetailNotification.vue'),
    meta: {
      requiresAuth: true,
    },
  }
  ,
  {
    path: '/AdminOrganize',
    name: 'AdminOrganize',
    component: () => import('../views/AdminOrganize.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Detail-Organize/:OrganizeID',
    name: 'DetailOrganize',
    component: () => import('../views/DetailOrganize.vue'),
    meta: {
      requiresAuth: true,
    },
  }
  ,
  {
    path: '/Mypost',
    name: 'Mypost',
    component: () => import('../views/MyPost.vue'),
    meta: {
      requiresAuth: true,
    },
  }
  ,
  {
    path: '/About',
    name: 'About',
    component: () => import('../views/About.vue'),
    
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next) =>{
  if(((to.path == '/LoginForm' || to.path == '/RegisterSeeker' || to.path == '/RegisterOrganize') && auth.currentUser) 
    || ((to.path == '/CreateJob' || to.path == '/Mypost' ) && store.state.Role == "user") ||
    ((to.name == 'AdminOrganize' || to.name == 'DetailOrganize' ) && store.state.Role !== "admin")
    
    ){
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
