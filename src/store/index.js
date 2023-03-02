import { createStore } from 'vuex'
import router from '../router'
import { auth, db } from '../firebase'
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default createStore({

  state: {
    user: null,
    ProfileEmail: null,
    ProfileFirstname: null,
    ProfileLastname: null,
    ProfileId: null,
    ProfileInitials: null
  },
  getters: {
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
    },
    SetProfileInfo(state, doc) {
        state.ProfileId = doc.id,
        state.ProfileEmail = doc.data().email,
        state.ProfileFirstname = doc.data().firstname,
        state.ProfileLastname = doc.data().lastname
    },
    updateUser(state, payload) {
      state.user = payload
    },
    ChangeFirstname(state,payload){
      state.ProfileFirstname = payload
    },
    ChangeLastname(state,payload){
      state.ProfileLastname = payload
    },
  },
  actions: {
    async logout({ commit }) {
      console.log(auth.currentUser.email + "  has signout")
      await signOut(auth)

      commit('CLEAR_USER')
      router.push('/LoginForm')
    },
    // fetchUser({ commit }) {
    //   auth.onAuthStateChanged(async user => {
    //     if (user === null) {
    //       commit('CLEAR_USER')
    //     } else {
    //       commit('SET_USER', user)
    //       if (router.isReady() && router.currentRoute.value.path === '/Login' || router.currentRoute.value.path === '/Register') {
    //         router.push('/')
    //       }
    //     }

    //   })
    // },
    async getcurrentUser({ commit }) {
      const dbResult = await getDoc(doc(db, "user", auth.currentUser.uid));
      commit('SetProfileInfo', dbResult)
      // commit("SetProfileInit");
      console.log(dbResult.data())
    },
    async updateUserSetting({commit,state}){
      const dbResult = await updateDoc(doc(db,"user", auth.currentUser.uid),{
        firstname : state.ProfileFirstname,
        lastname : state.ProfileLastname
      })
    }
  },
  modules: {
  }
})
