<template>
  <div class="class app-warpper">
    <div class="class app">
      <div class="container-xxl py-5 bg-dark page-header mb-5">
        <div class="container my-5 pt-5 pb-4">
            <h1 class="display-3 text-white mb-3 animated slideInDown">หน้าแอดมิน</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb text-uppercase">
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Home' }">หน้าหลัก</router-link></li>
                            <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Account' }">โปรไฟล์</router-link></li>
                    <li class="breadcrumb-item text-white active" aria-current="page">หน้าแอดมิน</li>
                </ol>
            </nav>
        </div>
    </div>
  <div v-if="this.$store.state.Role =='admin'" class="container">
    <h2 class="me-0">ยืนยันบริษัท</h2>
    <ListOrganize :post="post" v-for="(post,index) in getOrganizeVerify" :key="index" />
  </div>
  </div>
  </div>
</template>

<script>
import ListOrganize from "../components/ListOrganize.vue"
export default {
  components:{
    ListOrganize
  },
  computed:{
    getOrganizeVerify(){
      return this.$store.getters.getOrganizeVerify
    }
  },
  created(){
    this.$store.dispatch('getOrganizeVerify')
  }

}
</script>

<style>

</style>