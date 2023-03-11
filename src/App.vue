<template>
  <div class="class app-warpper">
    <div class="class app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigation"/>
      <SidebarAdmin v-if="navigation && admin"/>
      <router-view/>
      <Footer v-if="!navigation"></Footer>
    </div>
  </div>
</template>
<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import { auth } from './firebase'
import SidebarAdmin from "./components/SidebarAdmin.vue"
export default {
  components :{Navigation,Footer,SidebarAdmin},
  data(){
    return{
      navigation :null,
      admin:null,
    }
  },created(){
    auth.onAuthStateChanged((user) =>{
      this.$store.commit('updateUser',user)
      
      if(user){
        this.$store.dispatch('getcurrentUser')
        
      }
    })
    this.checkRoute()
    this.$store.dispatch('getPost')
    this.$store.dispatch('getPostNotifacionUser')
      this.$store.dispatch('getPostNotifacionOrganize')
   
  },
  methods:{
    checkRoute(){
        if(this.$route.name ==="RegisterSeeker" || this.$route.name ==="LoginForm" || this.$route.name ==="RegisterOrganize"){
          this.navigation =true
          return;
        }
        if(this.$route.name ==="AdminOrganize"){
          this.navigation =true
          this.admin = true
          return;
        }
        this.navigation = false
        this.admin = false;
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
