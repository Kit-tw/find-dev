<template>
  <main class="home">

  </main>
</template>

<script>
import {ref,computed, onBeforeMount, onMounted} from 'vue';
import { useStore } from 'vuex'
import { collection, doc, getDoc } from "firebase/firestore";
import {auth,db} from '../firebase';
export default {
    setup(){
      const name =ref("");
      const store = useStore();
      const user = auth.currentUser;
      onMounted(async () =>{
        if(user){
          const getuserdata = await getDoc(doc(db, "user",user.uid));
          // console.log(getuserdata.data())
          name.value = getuserdata.data().firstname;
        }
      })
      return{
        name,
        getstate : computed(() => store.state.user)
      }
    }
}
</script>

<style>

</style>