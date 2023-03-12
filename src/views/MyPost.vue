<template>
    <div class="class app-warpper">
    <div class="class app">
    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">My Post</h1>
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