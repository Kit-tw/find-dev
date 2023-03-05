<template>
  <div class="class app-warpper">
    <div class="class app">
      <Navigation v-if="!navigation"/>
      <router-view/>
      <Footer v-if="!navigation"></Footer>
    </div>
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import {onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import { auth } from './firebase'
export default {
  components :{Navigation,Footer},
  data(){
    return{
      navigation :null,
    }
  },created(){
    this.checkRoute()
    auth.onAuthStateChanged((user) =>{
      this.$store.commit('updateUser',user)
      
      if(user){
        this.$store.dispatch('getcurrentUser')
      }
    })
  },
  methods:{
    checkRoute(){
        if(this.$route.name ==="Login" ||this.$route.name ==="Register" || this.$route.name ==="RegisterForm" || this.$route.name ==="LoginForm"){
          this.navigation =true
          return;
        }this.navigation = false
    }
  },
  watch:{
    $route (){
      this.checkRoute();
    }
  },
  setup(){
   
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}
.link-light {
  color: #fff;
}
.error{
  text-align: center;
  font-size: 12px;
  color:red;
}
</style>
