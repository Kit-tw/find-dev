<template>
    <div class="container-xxl py-5 bg-dark page-header mb-5">
        <div class="container my-5 pt-5 pb-4">
            <h1 class="display-3 text-white mb-3 animated slideInDown">Notification</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb text-uppercase">
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Home' }">Home</router-link></li>
                    <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)" :to="{ name: 'Notification' }">Notification</router-link></li>
                    <li class="breadcrumb-item text-white active" aria-current="page">Notification Detail</li>
                </ol>
            </nav>
        </div>
    </div>
    <!-- Header End -->


    <!-- Job Detail Start -->
    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div class="container">
            <div class="row gy-5 gx-4">
                <div class="col-lg-8">
                    <div class="d-flex align-items-center mb-5">
                        <img class="flex-shrink-0 img-fluid border rounded" :src="postProfileImage" alt=""
                            style="width: 80px; height: 80px;">
                        <div class="text-start ps-4">
                            <h3 class="mb-3">สมัครโดย {{ this.Profilename }} {{ this.Profilelname }}</h3>
                            <span class="text-truncate me-3"><font-awesome-icon :style="{color: '#00B074'}" class="me-2 " icon="fas fa-graduation-cap" />{{ this.postusereducation }}</span>
                            <span class="text-truncate me-3"><font-awesome-icon :style="{color: '#00B074'}" class="me-2 " icon="fa-solid fa-venus-mars" />{{ this.postusergender }}</span>
                            <span class="text-truncate me-0"><font-awesome-icon :style="{color: '#00B074'}" class="me-2 "  icon="fa-solid fa-phone" />{{ this.postuserphone }}</span>
                        </div>
                    </div>

                    <div class="mb-5">
                        <h4 class="mb-3">ประวัติส่วนตัว</h4>
                        <snap class="mb-3">{{ this.postProfileDescription }}</snap>
                        <div class="mb-3" v-html="this.PostHTML"> </div>
                        <h4 class="mb-3">เรซูเม่</h4>
                    <img class="flex-shrink-0 img-fluid" :src="postuserdocumentimage" style="width: 500px; height: 200;">
                    </div>

                    <div class="col-12">
                        <h4  v-if="role == 'organize' && status == 'รอยืนยัน' "  class="mb-3">นัดวันสัมภาษณ์</h4>
                        <input v-if="role == 'organize' && status == 'รอยืนยัน'" type="date" v-model="date" :min="getCurrentDate()" />

                        <button v-if="role == 'organize' && status == 'รอยืนยัน' " class="btn btn-success w-100" type="submit" @click="AcceptJob">ยอมรับงาน</button>
                    </div>

                </div>

                <div class="col-lg-4">
                    <div class="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                        <h4 class="mb-4">รายละเอียดของงาน</h4>
                        <p><font-awesome-icon icon="fa-solid fa-angles-right text-primary me-2" /> ชื่อ: {{
                            this.posttitle }}</p>
                        <p><font-awesome-icon icon="fa-solid fa-angles-right text-primary me-2" /> ประเภท: {{ this.posttype
                        }}</p>
                        <p><font-awesome-icon icon="fa-solid fa-angles-right text-primary me-2" /> เงินเดือน: {{
                            this.postsalary }} บาท</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  
</template>

<script>
import { doc, updateDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from '../firebase'
export default {
    name: "DetailNotification",
    data() {
        return {
            currentPost: null,
            posttitle: null,
            PostHTML: null,
            posttype: null,
            postusereducation: null,
            postsalary: null,
            postProfilelocation: null,
            postProfileImage: null,
            postProfileDescription: null,
            postuserphone: null,
            postuserdocumentimage: null,
            Profilename:null,
            Profilelname:null,
            postID:null,
            postProfileID:null,
            postusergender:null,
            postnotificationID:null,
            status:null
        };
    },
    async mounted() {
        this.currentPost = await this.$store.state.PostNotification.filter((post) => {
            return post.postnotificationID === this.$route.params.notificationID;
        });
        // console.log(this.currentPost)
        this.currentPost.forEach((snap) => {
            this.postID = snap.PostID
            this.posttitle = snap.posttitle
            this.PostHTML = snap.PostHTML
            this.posttype = snap.posttype
            this.postusereducation = snap.postusereducation
            this.postsalary = snap.postsalary
            this.postProfilelocation = snap.postusereducation
            this.postProfileImage = snap.postuserimage
            this.postProfileDescription = snap.postuserdescription
            this.postuserphone = snap.postuserphone
            this.postuserdocumentimage = snap.postuserdocumentimage
            this.Profilename = snap.postuserfirstname
            this.Profilelname = snap.postuserlastname
            this.postusergender = snap.postusergender
            this.postProfileID = snap.postProfileID
            this.postnotificationID = snap.postnotificationID
            this.status = snap.status
        })
        // console.log(this.currentPost)
    },
    methods:{
        getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
        AcceptJob(){
            const newDocRef = doc(db, "postnotification",this.postnotificationID)
            updateDoc(newDocRef,{
               status:"รับสัมภาษณ์",
               date:this.date
            })
            this.$store.state.PostNotification.filter((post) => {
                if(post.postnotificationID === this.$route.params.notificationID){
                    post.postdate = this.date
                }
                return post.status = "รับสัมภาษณ์"
        });
            alert("เรียบร้อย")
        
            this.$store.dispatch("fliterNotification",this.postnotificationID)
    
            this.$router.push({ name: "Notification"});
        }
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