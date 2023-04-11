import { createStore } from 'vuex'
import router from '../router'
import { auth, db } from '../firebase'
import { doc, getDoc,updateDoc,query,orderBy,collection,getDocs,onSnapshot,where,deleteDoc} from "firebase/firestore";
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
    ProfilePhone:null,
    ProfileGender:null,
    ProfileBirthDate:null,
    ProfileImage:null,
    ProfileDocument:null,
    ProfileImageURL:null,
    ProfileImageName:"",
    ProfileResumeURL:null,
    ProfileResumeName:"",
    Role:null,
    PostHTML: "",
    posttitle:"",
    postsalary:"",
    posttype:"",
    posteducation:"",
    postsalary:0,
    postvacancy:"",
    PostPhotoName: "",
    PostPhotoFileURL: null,
    PostPhotoName1: "",
    PostPhotoFileURL1: null,
    PostPhotoPreview: null,
    editPost: null,
    Post:[],
    PostNotification:[],
    OrganizeVerify:[],
  
    PostDetailType:null,
    PostDetailEducation:null,
    verify:null,
    Post: [],
    postLoaded: null,
    appliedPosts: localStorage.getItem("appliedPosts") ? JSON.parse(localStorage.getItem("appliedPosts")) : [],

  },
  getters: {
    getListpost(state){
      return state.Post
    },
    getPostDetailType(state){
      return state.PostDetailType
    },
    PostDetailEducation(state){
      return state.PostDetailEducation
    },
    getPostNotification(state){
      return state.PostNotification
    }
    ,
    getOrganizeVerify(state){
      return state.OrganizeVerify
    },
    getOrganizationPost(state){
      return state.MyPost
    },
    PostHomeView(state) {
      return state.Post.slice(0, 5);
    },
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
    },
    SetOrganizeProfileInfo(state, doc) {
        state.ProfileId = doc.id,
        state.ProfileEmail = doc.data().email,
        state.ProfileFirstname = doc.data().name,
        state.ProfileLastname = doc.data().lastname,
        state.ProfileLocation = doc.data().location,
        state.ProfileDescription = doc.data().description,
        state.ProfileImage = doc.data().profileimage,
        state.ProfileDocument = doc.data().doucmentimage
        state.Role = doc.data().role
        state.verify = doc.data().verify
    },
    SetUserProfileInfo(state,doc){
        state.ProfileId = doc.id,
        state.ProfileEmail = doc.data().email,
        state.ProfileFirstname = doc.data().firstname,
        state.ProfileLastname = doc.data().lastname,
        state.ProfilePhone = doc.data().phone,
        state.ProfileGender = doc.data().gender,
        state.ProfileBirthDate = doc.data().date,
        state.ProfileImage = doc.data().profileimage,
        state.ProfileDocument = doc.data().doucmentimage,
        state.ProfileDescription = doc.data().description,
        state.Role = doc.data().role
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
    fileNameChangeProfileImage(state, payload) {
      state.ProfileImageName = payload;
    },
    fileNameChangeProfileResume(state, payload) {
      state.ProfileResumeName = payload;
    },
    createPhotoURL(state, payload) {
      state.ProfileImageURL = payload;
    },
    createResumeURL(state, payload) {
      state.ProfileResumeURL = payload;
    },
    openPhotoPreview(state) {
      state.PostPhotoPreview = !state.PostPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    ChangeDescription(state,payload){
      state.ProfileDescription = payload
    },
    ChangeLocation(state,payload){
      state.ProfileLocation = payload
    },
    UploadVacancy(state,payload){
      state.postvacancy = payload
    },ChangeLastname(state,payload){
      state.ProfileLastname = payload
    },
    UploadImageDocument(state,payload){
      
    },
    fliterPost(state,payload){
      state.Post = state.Post.filter((post) => post.PostID !== payload)
      state.MyPost = state.MyPost.filter((post) => post.PostID !== payload)
    },
    fliterNotification(state,payload){
      state.PostNotification = state.PostNotification.filter((post) => post.postnotificationID !== payload)

    },fliterNotificationForDelete(state,payload){
      state.PostNotification = state.PostNotification.filter((post) => post.postID !== payload)

    },
    setPostDetailEducation(state, payload) {
      state.PostDetailEducation = payload
    } 
  },
  actions: {
    async getcurrentUser({ commit }) {
      const dbResult = await getDoc(doc(db, "user", auth.currentUser.uid));
      if(dbResult.data().role == "user" || dbResult.data().role == "admin"){
        commit('SetUserProfileInfo', dbResult)
        this.dispatch('getPostNotifacionUser')
        
        return;
      }
      if(dbResult.data().role == "organize"){
        commit('SetOrganizeProfileInfo', dbResult)
        this.dispatch('getPostNotifacionOrganize')
        return;
      }


      return;
    },
    async updateOrganizeSetting({commit,state}){
      const dbResult = await updateDoc(doc(db,"user", auth.currentUser.uid),{
        name : state.ProfileFirstname,
        // lastname : state.ProfileLastname
        description:state.ProfileDescription,
        location:state.ProfileLocation
      })
    },
    async updateUserSetting({commit,state}){
      const dbResult = await updateDoc(doc(db,"user", auth.currentUser.uid),{
        name : state.ProfileFirstname,
        lastname : state.ProfileLastname,
        description:state.ProfileDescription,
      })
    },
    async getPost({ state }) {
      const PostRef = query(collection(db, "post"), orderBy("date", "desc"));
      onSnapshot(PostRef, (PostSnapshot) => {
        PostSnapshot.forEach((snap) => {
          if (!state.Post.some((post) => post.PostID === snap.id)) {
            // check if the job has already been applied for
            if (!state.appliedPosts.includes(snap.data().PostID)) {
              const userRef = doc(db, "user", snap.data().profileId);
              getDoc(userRef).then((object) => {
                const data = {
                  PostID: snap.data().PostID,
                  PostHTML: snap.data().PostHTML,
                  PostCoverPhoto: snap.data().PostCoverPhoto,
                  posteducation: snap.data().posteducation,
                  postsalary: snap.data().postsalary,
                  posttype: snap.data().posttype,
                  date: snap.data().date,
                  PostCoverPhotoName: snap.data().PostCoverPhotoName,
                  posttitle: snap.data().posttitle,
                  postProfileEmail: object.data().email,
                  postProfileDescription: object.data().description,
                  postProfilelocation: object.data().location,
                  postProfilename: object.data().name,
                  postProfileImage: object.data().profileimage,
                  postvacancy: snap.data().postvacancy,
                  postProfileID: snap.data().profileId,
                };
                state.Post.push(data);
              });
            }
          }
        });
      });
      state.postLoaded = true;
    },
    
    
  getPostDetail({state}){
    const PostRef = getDoc(doc(db, "postDetail","GetDetail")).then((object) =>{

        state.PostDetailEducation = object.data().Education,
        state.PostDetailType = object.data().Type
    })
},
async getPostNotifacionUser({state}){
  const postnotificaionRef = query(collection(db, "postnotification"), where("user", "==", auth.currentUser.uid));
  if (state.postNotifUserUnsubscribe) {
    state.postNotifUserUnsubscribe();
  }
  const unsubscribe = onSnapshot(postnotificaionRef,((postnotiDoc =>{
    postnotiDoc.forEach((notification) => {
      if(!state.PostNotification.some((snap) => snap.postnotificationID === notification.id)){
        const postIDRef = (doc(db,"post",notification.data().postID))
        getDoc(postIDRef).then((post) =>{
          const creatorRef = (doc(db,"user",notification.data().postcreatorID))
          getDoc(creatorRef).then((creator) =>{
            const data ={
              postnotificationID:notification.data().postnotiID,
              posttitle:post.data().posttitle,
              posttype:post.data().posttype,
              postsalary:post.data().postsalary,
              posteducation:post.data().posteducation,
              status:notification.data().status,
              postcreatorname:creator.data().name,
              postcreatorImage:creator.data().profileimage,
              postdate:notification.data().date,
            }
            state.PostNotification.push(data)
          })
        })

      }
    });
  })));

  state.postNotifUserUnsubscribe = unsubscribe;
},
    async getPostNotifacionOrganize({state}){
      const postnotificaionRef = query(collection(db, "postnotification"), where("postcreatorID", "==", auth.currentUser.uid));
      if (state.PostNotifacionOrganizeUnsubscribe) {
        state.PostNotifacionOrganizeUnsubscribe();
      }
      const unsubscribe = onSnapshot(postnotificaionRef,((postnotiDoc) =>{
        postnotiDoc.forEach((notification) => {
          if(!state.PostNotification.some((snap) => snap.postnotificationID === notification.id)){
            const postIDRef = (doc(db,"post",notification.data().postID))
            getDoc(postIDRef).then((post) =>{
              const creatorRef = (doc(db,"user",notification.data().user))
              getDoc(creatorRef).then((creator) =>{
                const data ={
                  postID :notification.data().postID,
                  postnotificationID:notification.data().postnotiID,
                  posttitle:post.data().posttitle,
                  posttype:post.data().posttype,
                  postsalary:post.data().postsalary,
                  posteducation:post.data().posteducation,
                  postHTML:post.data().PostHTML,
                  status:notification.data().status,
                  postuserfirstname:creator.data().firstname,
                  postuserlastname:creator.data().lastname,
                  postuserphone:creator.data().phone,
                  postusergender:creator.data().gender,
                  postuserdate:creator.data().date,
                  postusereducation:creator.data().education,
                  postuserdescription:creator.data().description,
                  postuserimage:creator.data().profileimage,
                  postuserdocumentimage:creator.data().doucmentimage,
                  postdate:notification.data().date,
                }
                state.PostNotification.push(data)
              })
            })
  
          }
        });
      }))
      state.PostNotifacionOrganizeUnsubscribe = unsubscribe;
    },
    async getOrganizeVerify({ state }) {
      const OrganizeRef = query(collection(db, "user"), where("verify", "==", 0));
      onSnapshot(OrganizeRef, ((OrganizeDoc) => {
        OrganizeDoc.forEach((information) => {

          if (!state.OrganizeVerify.some((item) => isEqual(item, information.data()))) {
            const postIDRef = doc(db, "user", information.data().profileID);
            getDoc(postIDRef).then((organize) => {
              const data = {
                profileID: organize.data().profileID,
                name: organize.data().name,
                profileimage: organize.data().profileimage,
                documentimage: organize.data().doucmentimage,
                profiledescription: organize.data().description,
                verify: organize.data().verify,
              };
              state.OrganizeVerify.push(data);
            });
          }
        });
      }));
    },
    
    async getOrganizationPost({state}) {
      const OrganizationPostRef = query(collection(db, "post"), where("profileId", "==", auth.currentUser.uid));
      onSnapshot(OrganizationPostRef, ((OrganizationPost) => {
        OrganizationPost.forEach((post) => {
          if (!state.MyPost.some((snap) => snap.PostID === post.id)) {
            const data = {
              PostID: post.data().PostID,
              posttitle: post.data().posttitle
            }
            state.MyPost.push(data)
          }
        });
      }))
      
      if (!Array.isArray(state.MyPost)) {
        state.MyPost = []
      }
    },
    
    
    async DeletePost({commit},payload){
      const getPost = await deleteDoc(doc(db,"post",payload))
      commit("fliterPost",payload)
      commit("fliterNotificationForDelete",payload)

    },
  },
  modules: {
  }
})
