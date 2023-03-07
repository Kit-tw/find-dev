import { createStore } from 'vuex'
import router from '../router'
import { auth, db } from '../firebase'
import { doc, getDoc,updateDoc,query,orderBy,collection,getDocs,onSnapshot} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default createStore({

  state: {
    user: null,
    ProfileEmail: null,
    ProfileFirstname: null,
    ProfileLastname: null,
    ProfileId: null,
    ProfileLocation:null,
    ProfileDescription:null,
    ProfileImage:null,
    ProfileDocument:null,
    PostHTML: "",
    posttitle:"",
    postsalary:"",
    posttype:"",
    posteducation:"",
    postsalary:0,
    PostPhotoName: "",
    PostPhotoFileURL: null,
    PostPhotoName1: "",
    PostPhotoFileURL1: null,
    PostPhotoPreview: null,
    editPost: null,
    Post:[],
    postLoaded:null,

  },
  getters: {
    getListpost(state){
      return state.Post
    }
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
    },
    SetProfileInfo(state, doc) {
        state.ProfileId = doc.id,
        state.ProfileEmail = doc.data().email,
        state.ProfileFirstname = doc.data().name,
        // state.ProfileLastname = doc.data().lastname
        state.ProfileLocation = doc.data().location,
        state.ProfileDescription = doc.data().description,
        state.ProfileImage = doc.data().profileimage,
        state.ProfileDocument = doc.data().documentimage
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
    fileNameChange1(state, payload) {
      state.PostPhotoName1 = payload;
    },
    createFileURL1(state, payload) {
      state.PostPhotoFileURL1 = payload;
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
    },
    async getPost({state}){
      const PostRef = query(collection(db, 'post'), orderBy("date","desc"))
      // const PostSnapshot = await getDocs(PostRef);
      // PostSnapshot.forEach((doc) =>{
      //   if(!state.Post.some((post) => post.PostID === doc.id)){
      //     const data ={
      //       PostID:doc.data().PostID,
      //       PostHTML:doc.data().PostHTML,
      //       PostCoverPhoto:doc.data().PostCoverPhoto,
      //       posteducation:doc.data().posteducation,
      //       postsalary:doc.data().postsalary,
      //       posttype:doc.data().posttype,
      //       date:doc.data().date,
      //       PostCoverPhotoName:doc.data().PostCoverPhotoName,
      //       posttitle:doc.data().posttitle,
      //     }
      //     state.Post.push(data);
      //   }
      // })
      // state.postLoaded = true;
      // console.log(state.Post)
      onSnapshot(PostRef, (PostSnapshot) => {
        PostSnapshot.forEach((doc) =>{
          if(!state.Post.some((post) => post.PostID === doc.id)){
            const data ={
              PostID:doc.data().PostID,
              PostHTML:doc.data().PostHTML,
              PostCoverPhoto:doc.data().PostCoverPhoto,
              posteducation:doc.data().posteducation,
              postsalary:doc.data().postsalary,
              posttype:doc.data().posttype,
              date:doc.data().date,
              PostCoverPhotoName:doc.data().PostCoverPhotoName,
              posttitle:doc.data().posttitle,
            }
            state.Post.push(data);
          }
        })
    })
    state.postLoaded = true;
    console.log(state.Post)}
  },
  modules: {
  }
})
