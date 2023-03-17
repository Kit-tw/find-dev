<template>
   <div class="class app-warpper">
    <div class="class app">
      <div class="container-xxl py-5 bg-dark page-header mb-5">
        <div class="container my-5 pt-5 pb-4">
            <h1 class="display-3 text-white mb-3 animated slideInDown">โพสของฉัน</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb text-uppercase">
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Home' }">หน้าหลัก</router-link></li>
                            <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Mypost' }">โพส</router-link></li>
                    <li class="breadcrumb-item text-white active" aria-current="page">โพสของฉัน</li>
                </ol>
            </nav>
        </div>
    </div>
    
    <ListMypost :post="post" v-for="(post,index) in getOrganizationPost" :key="index" />

  </div>
  </div>
</template>

<script>
import ListMypost from "../components/ListMypost.vue"
export default {
  components:{
    ListMypost
  },
  computed:{
    getOrganizationPost(){
      return this.$store.getters.getOrganizationPost
    }
  },
  created(){
    this.$store.dispatch('getOrganizationPost')
  }

}
</script>

<style>

</style>