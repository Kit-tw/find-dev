<template>
  <div class="container">
    <h2 class="me-2">Admin</h2>
    <h2 class="me-0">Verify Organize</h2>
    <ListOrganize :post="post" v-for="(post,index) in getOrganizeVerify" :key="index" />
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