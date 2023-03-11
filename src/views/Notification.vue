<template>
   <div class="class app-warpper">
    <div class="class app">
    <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Notification</h1>
    <ListNotification :post="post" v-for="(post,index) in getPostNotification" :key="index" />

  </div>
  </div>
</template>

<script>
import ListNotification from "../components/ListNotification.vue"
export default {
  components:{
    ListNotification
  },
  computed:{
    getPostNotification(){
      return this.$store.getters.getPostNotification
    }
  },

}
</script>

<style>

</style>