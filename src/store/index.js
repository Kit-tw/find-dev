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
    PostHTML: "",
    posttitle:"",
    postsalary:"",
    posttype:"",
    posteducation:"",
    postsalary:0,
    PostPhotoName: "",
    PostPhotoFileURL: null,
    PostPhotoPreview: null,
    editPost: null,
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
    newPostHTML(state,payload){
      state.PostHTML = payload
    },
    Uploadpostsalary(state,payload){
      state.postsalary = payload
    },
    Uploadposttitle(state,payload){
      state.posttitle = payload
    },
    Uploadposttype(state,payload){
      state.posttype = payload
    },
    UploadpostEducation(state,payload){
      state.posteducation = payload
    }, 
    fileNameChange(state, payload) {
      state.PostPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.PostPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.PostPhotoPreview = !state.PostPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
  },
  actions: {
    async getcurrentUser({ commit }) {
      const dbResult = await getDoc(doc(db, "user", auth.currentUser.uid));
      commit('SetProfileInfo', dbResult)
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
