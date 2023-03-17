<template>
   <div class="container-xl py-1">
          <div class="container">
    <div class="class app-warpper">
    <div class="class app">
      <div class="container-xxl py-5 bg-dark page-header mb-5">
        <div class="container my-5 pt-5 pb-4">
            <h1 class="display-3 text-white mb-3 animated slideInDown">หางานทั้งหมด</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb text-uppercase">
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Home' }">หน้าหลัก</router-link></li>
                    <li class="breadcrumb-item text-white active" aria-current="page">หางานทั้งหมด</li>
                </ol>
            </nav>
        </div>
    </div>
    <ListPost :post="post" v-for="(post,index) in getListpost" :key="index" />
  </div>
  </div>
  </div>
  </div>
</template>

<script>
import ListPost from "../components/ListPost.vue"
export default {
  components:{
    ListPost
  },
  computed:{
    getListpost(){
      return this.$store.getters.getListpost
    }
  }

}
</script>

<style>

</style>