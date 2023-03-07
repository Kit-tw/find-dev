<template>
    <div class="class app-warpper">
    <div class="class app">
    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
    <ListPost :post="post" v-for="(post,index) in getListpost" :key="index" />

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