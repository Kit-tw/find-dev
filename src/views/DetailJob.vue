<template>
    
    <div class="container-xxl py-5 bg-dark page-header mb-5">
        <div class="container my-5 pt-5 pb-4">
            <h1 class="display-3 text-white mb-3 animated slideInDown">รายละเอียดงาน</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb text-uppercase">
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Home' }">หน้าหลัก</router-link></li>
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)" :to="{ name: 'ListJob' }">หางานทั้งหมด</router-link></li>
                    <li class="breadcrumb-item text-white active" aria-current="page">รายละเอียดงาน</li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- Header End -->


    <!-- Job Detail Start -->
    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s" v-if="currentPost">
        <div class="container">
            <div class="row gy-5 gx-4">
                <div class="col-lg-8">
                    <img class="flex-shrink-0 img-fluid" :src="PostCoverPhoto" style="width: 500px; height: 200;">
                    <div class="d-flex align-items-center mb-5">
                        <img class="flex-shrink-0 img-fluid border rounded" :src="postProfileImage" alt=""
                            style="width: 80px; height: 80px;">
                        <div class="text-start ps-4">
                            <h3 class="mb-3">{{ this.currentPost[0].posttitle }}</h3>
                            <span class="text-truncate me-3"><font-awesome-icon :style="{ color: '#00B074' }" class="me-2 "
                                    icon="fa-solid fa-briefcase" />{{ this.currentPost[0].posttype }}</span>
                            <span class="text-truncate me-3"><font-awesome-icon :style="{ color: '#00B074' }" class="me-2 "
                                    icon="fas fa-graduation-cap" />{{ this.currentPost[0].posteducation }}</span>
                            <span class="text-truncate me-0"><font-awesome-icon :style="{ color: '#00B074' }" class="me-2 "
                                    icon="fa-solid fa-money-check-dollar" />{{ this.currentPost[0].postsalary }} บาท</span>
                        </div>
                    </div>

                    <div class="mb-5">
                        <h4 class="mb-3">ประกาศโดย {{ this.currentPost[0].postProfilename }}</h4>
                        <h4 class="mb-3">รายละเอียดงาน</h4>
                        <div v-html="this.currentPost[0].PostHTML"> </div>
                        <h4 class="mb-3">ที่อยู่บริษัท</h4>
                        <p>{{ this.currentPost[0].postProfilelocation }}</p>
                    </div>

                    <div class="col-12">
                        <button v-if="role == 'user'" class="btn btn-success w-100" type="submit" @click="ApplyJob">สมัครงาน</button>
                    </div>

                </div>

                <div class="col-lg-4">
                    <div class="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                        <h4 class="mb-4">สรุปเกี่ยวกับงาน</h4>
                        <p><font-awesome-icon icon="fa-solid fa-angles-right text-primary me-2" /> ตำแหน่ง: {{
                            this.currentPost[0].postvacancy }} คน</p>
                        <p><font-awesome-icon icon="fa-solid fa-angles-right text-primary me-2" /> ประเภท: {{ this.currentPost[0].posttype
                        }}</p>
                        <p><font-awesome-icon icon="fa-solid fa-angles-right text-primary me-2" /> เงินเดือน: {{
                            this.currentPost[0].postsalary }} บาท</p>
                    </div>
                    <div class="bg-light rounded p-5 wow slideInUp" data-wow-delay="0.1s">
                        <h4 class="mb-4">รายละเอียดของบริษัท</h4>
                        <p class="m-0">{{ this.currentPost[0].postProfileDescription }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Job Detail End -->
</template>

<script>
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from '../firebase'
export default {
    name: "DeatilJob",
    data() {
        return {
            currentPost: null,
            posttitle: null,
            PostHTML: null,
            posttype: null,
            posteducation: null,
            postsalary: null,
            postProfilelocation: null,
            postProfileImage: null,
            postProfileDescription: null,
            postvacancy: null,
            PostCoverPhoto: null,
            Profilename:null,
            postID:null,
            postProfileID:null,
        };
    },
    async mounted() {
        this.currentPost = await this.$store.state.Post.filter((post) => {
            return post.PostID === this.$route.params.postid;
        });
        this.currentPost.forEach((snap) => {
            this.postID = snap.PostID
            this.posttitle = snap.posttitle
            this.PostHTML = snap.PostHTML
            this.posttype = snap.posttype
            this.posteducation = snap.posteducation
            this.postsalary = snap.postsalary
            this.postProfilelocation = snap.postProfilelocation
            this.postProfileImage = snap.postProfileImage
            this.postProfileDescription = snap.postProfileDescription
            this.postvacancy = snap.postvacancy
            this.PostCoverPhoto = snap.PostCoverPhoto
            this.Profilename = snap.postProfilename
            this.postProfileID = snap.postProfileID
        })
    },
    methods:{
        // ApplyJob(){
        //     const newDocRef = doc(collection(db, "postnotification"))
        //     setDoc(newDocRef,{
        //         postnotiID:newDocRef.id,
        //         postID:this.postID,
        //         user:this.ProfileId,
        //         postcreatorID:this.postProfileID,
        //         status:"รอยืนยัน",
        //     })
        //     alert("สมัครเรียบร้อย")
        //     this.$router.push({ name: "Home"});
        // }
        ApplyJob() {
    // check if the user has already applied for this job
    if (this.$store.state.appliedPosts.includes(this.postID)) {
      alert("คุณได้สมัครงานนี้ไปแล้ว");
      return;
    }
    
    // create a new document in the "postnotification" collection
    const newDocRef = doc(collection(db, "postnotification"));
    setDoc(newDocRef, {
      postnotiID: newDocRef.id,
      postID: this.postID,
      user: this.ProfileId,
      postcreatorID: this.postProfileID,
      status: "รอยืนยัน",
    });

    // update the appliedPosts array in the Vuex store and local storage
    this.$store.state.appliedPosts.push(this.postID);
    localStorage.setItem("appliedPosts", JSON.stringify(this.$store.state.appliedPosts));

    alert("สมัครเรียบร้อย");
    this.$router.push({ name: "Home" });
  },
    },
    computed:{
        role(){
            return this.$store.state.Role
        },
        ProfileId() {
            return this.$store.state.ProfileId;
        },
    }
};
</script>

<style>
.page-header {
    background: linear-gradient(rgba(43, 57, 64, .5), rgba(43, 57, 64, .5)), url(../assets/carousel-1.jpg) center center no-repeat;
    background-size: cover;
}</style>