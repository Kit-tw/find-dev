<template>
   <div class="container-xxl py-5 wow fadeInUp" v-if="this.$store.state.Role =='admin'" data-wow-delay="0.1s">
        <div class="container">
            <div class="row gy-5 gx-4">
                <div class="col-lg-8">
                    <div class="d-flex align-items-center mb-5">
                        <img class="flex-shrink-0 img-fluid border rounded" :src="ProfileImage" alt=""
                            style="width: 80px; height: 80px;">
                    </div>

                    <div class="mb-5">
                        <h4 class="mb-3">{{ this.ProfileName }}</h4>
                        <h4 class="mb-3">Organization description</h4>
                        <div v-html="this.ProfileDescription"> </div>
                        <img class="flex-shrink-0 img-fluid me-3" :src="ProfileDocumentImage" style="width: 500px; height: 500px;">
                    </div>

                    <div class="col-12">
                        <button class="btn btn-success w-100" type="submit" @click="Accept">Verify</button>
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
    name: "Detail-Notification",
    data() {
        return {
            Profile: null,
            profileID: null,
            ProfileName: null,
            ProfileDescription: null,
            ProfileImage: null,
            ProfileDocumentImage: null,
        };
    },
    async mounted() {
        this.Profile = await this.$store.state.OrganizeVerify.filter((post) => {
            return post.profileID === this.$route.params.OrganizeID;
        });
        // console.log(this.currentPost)
        this.Profile.forEach((snap) => {
            this.profileID = snap.profileID
            this.ProfileName = snap.name
            this.ProfileImage = snap.profileimage
            this.ProfileDocumentImage = snap.documentimage
            this.ProfileDescription = snap.profiledescription
          
        })
        // console.log(this.currentPost)
    },
    methods:{
        Accept(){
            const newDocRef = doc(db, "user",this.profileID)
            updateDoc(newDocRef,{
               verify:1
            })
            this.$store.state.OrganizeVerify.filter((post) => {
                if(post.profileID === this.$route.params.OrganizeID)
                return post.verify = 1
        });
            alert("เรียบร้อย")
            this.$router.push({ name: "AdminOrganize"});
        }
    },
}
</script>

<style>

</style>