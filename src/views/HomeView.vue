<template>
  <main class="home">
    <div class="container-fluid p-0">
            <div class="owl-carousel header-carousel position-relative">
                <div class="owl-carousel-item position-relative">
                    <img class="img-fluid" src="../assets/carousel-1.jpg" alt="">
                    <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style="background: rgba(43, 57, 64, .5);">
                        <div class="container">
                            <div class="row justify-content-start">
                                <div class="col-10 col-lg-8">
                                    <h1 class="display-3 text-white animated slideInDown mb-4">ค้นหางานที่สมบูรณ์แบบที่คุณคู่ควร</h1>
                                    <p class="fs-5 fw-medium text-white mb-4 pb-2">สามารถเข้ามาหางานสมัครได้แล้วที่นี่</p>
                                    <router-link :to="{name: 'ListJob'}"  class="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">หางานทั้งหมด</router-link>
                                    <router-link v-if="!user" :to="{name: 'LoginForm'}"  class="btn btn-secondary py-md-3 px-md-5 animated slideInRight">เข้าสู่ระบบ</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-xxl py-5">
            <div class="container">
                <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">งาน</h1>
        <ListPost :post="post" v-for="(post,index) in PostHomeView" :key="index" />
        <a class="btn btn-primary py-3 px-5 h-100 d-flex align-items-center justify-content-center" href="">ดูงานเพิ่ม</a>
            </div>
        </div>
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div class="row g-0 about-bg rounded overflow-hidden">
                            <div class="col-6 text-start">
                                <img class="img-fluid w-100" src="../assets/about-1.jpg">
                            </div>
                            <div class="col-6 text-start">
                                <img class="img-fluid" src="../assets/about-2.jpg" style="width: 85%; margin-top: 15%;">
                            </div>
                            <div class="col-6 text-end">
                                <img class="img-fluid" src="../assets/about-3.jpg" style="width: 85%;">
                            </div>
                            <div class="col-6 text-end">
                                <img class="img-fluid w-100" src="../assets/about-4.jpg">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <h1 class="mb-4">เว็บไซต์พวกเราช่วยให้หางานดีที่สุดและค้นหาบุคลากรที่มีความสามารถ</h1>
                        <p class="mb-4">แหล่งเว็บไซต์ค้นหางานและโพสหางานสามารถใช้ได้ทั้งบุคคลธรรมดาและบริษัท</p>
                        <p><i class="fa fa-check text-primary me-3"></i>หางานที่ดีที่สุด</p>
                        <p><i class="fa fa-check text-primary me-3"></i>รองรับตลอด 24 ชม.</p>
                        <p><i class="fa fa-check text-primary me-3"></i>ดูแลระบบอย่างสม่ำเสมอ</p>
                    </div>
                </div>
            </div>
        </div>
  </main>
</template>

<script>
import About from "../views/About.vue"
import ListPost from "../components/ListPost.vue"
export default {
  components:{
    ListPost,About
  },
computed:{
  PostHomeView(){
      return this.$store.getters.PostHomeView
    },
        user(){
            return this.$store.state.user;
        },
}
}
</script>

<style>

</style>