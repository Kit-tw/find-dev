<template>
    <!-- Header End -->
    <div class="container-xxl py-5 bg-dark page-header mb-5">
            <div class="container my-5 pt-5 pb-4">
                <h1 class="display-3 text-white mb-3 animated slideInDown">เกี่ยวกับเรา</h1>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb text-uppercase">
                        <li class="breadcrumb-item"> <router-link style="color: rgb(8, 192, 131)"
                            :to="{ name: 'Home' }">หน้าหลัก</router-link></li>
                        <li class="breadcrumb-item text-white active" aria-current="page">เกี่ยวกับ</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!-- Header End -->


        <!-- About Start -->
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
        <!-- About End -->
</template>

<script>
export default {

}
</script>

<style>


</style>