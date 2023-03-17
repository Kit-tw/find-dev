<template>
   <body>
        <div class="container-xxl bg-white p-0">
  <div class="class app-warpper">
    <div class="class app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigation"/>
      <router-view/>
      <Footer v-if="!navigation"></Footer>
    </div>
  </div>
  </div>
   </body>
</template>
<script>
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import { auth } from './firebase'
export default {
  components :{
    Navigation,Footer
  },
  data(){
    return{
      navigation :null,
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
        this.navigation = false
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
.link-light {
  color: #fff;
}
.error{
  text-align: center;
  font-size: 12px;
  color:red;
}
</style>
