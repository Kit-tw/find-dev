import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas,faR} from '@fortawesome/free-solid-svg-icons'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


let app;
auth.onAuthStateChanged(() =>{
    if(!app){
        library.add(fas,faR)
        createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
        
    }
})
