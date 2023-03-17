import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas,faR} from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/bootstrap.min.css'
import './assets/css/style.css'
import './assets/css/animate.min.css'
import './assets/css/animate.css'

let app;
auth.onAuthStateChanged(() =>{
    if(!app){
        library.add(fas,faR)
        createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
        
    }
})
