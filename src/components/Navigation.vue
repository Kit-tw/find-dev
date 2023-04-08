<template>
    <header>
        <!-- <nav class="class container">
            <div class="class branding">
                <router-link class="header" :to="{ name: 'Home' }">Find Dev</router-link>
            </div>
            <div class="class nav-links">
                <ul>
                    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="link" :to="{name: 'ListJob'}">find job</router-link>
                    <router-link v-if="user && role == 'organize'" class="link" :to="{name: 'CreateJob'}">CreateJob</router-link>
                    <router-link v-if="user && role == 'organize'" class="link" :to="{name: 'Mypost'}">My Post</router-link>
                    <router-link v-if="user" class="link" :to="{name: 'Notification'}">Notification</router-link>
                    <router-link v-if="user" class="link" :to="{ name: 'Account' }">Account</router-link>
                    <router-link v-if ="!user" class="link" :to="{ name: 'LoginForm' }">Login/Register</router-link>
                    <a v-if= "user" class="link"  @click="signout">Logout</a>
                </ul>
            </div>
        </nav> -->
        <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <router-link :to="{ name: 'Home' }" class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 class="m-0 text-primary">Find Dev</h1>
            </router-link>
            <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto p-4 p-lg-0">
                    <router-link :to="{ name: 'Home' }" class="nav-item nav-link active">หน้าหลัก</router-link>
                    <router-link :to="{ name: 'About' }" class="nav-item nav-link">เกี่ยวกับ</router-link>
                    <router-link :to="{name: 'ListJob'}" class="nav-item nav-link">หางานทั้งหมด</router-link>
                    <div v-if="user && role == 'organize'" class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">โพส</a>
                        <div class="dropdown-menu rounded-0 m-0">
                            <router-link  :to="{name: 'Mypost'}" class="dropdown-item">โพสของฉัน</router-link>
                            <router-link  :to="{name: 'CreateJob'}" class="dropdown-item">สร้างโพส</router-link>
                        </div>
                    </div>
                    <div v-if="user" class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">โปรไฟล์</a>
                        <div class="dropdown-menu rounded-0 m-0">
                            <router-link :to="{ name: 'Account' }" class="dropdown-item">รายละเอียดบัญชี</router-link>
                            <router-link :to="{ name: 'Notification' }" class="dropdown-item">แจ้งเตือน</router-link>
                            <router-link v-if="role == 'admin'" :to="{ name: 'AdminOrganize' }" class="dropdown-item">หน้าแอดมิน</router-link>
                            <a @click="signout" class="dropdown-item">ออกจากระบบ</a>
                            
                        </div>
                    </div>
                    <router-link v-if="!user" :to="{name: 'LoginForm'}" class="nav-item nav-link">เข้าสู่ระบบ</router-link>
                </div>
                <a v-if="user" @click="signout" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">ออกจากระบบ<i class="fa fa-arrow-right ms-3"></i></a>
            </div>
        </nav>
    </header>
</template>

<script>
import {auth} from "../firebase"
export default {
    name:navigation,
    methods:{
         signout(){
            console.log(auth.currentUser.email + "  has signout")
            // await signOut(auth)
            auth.signOut();
            window.location.reload();
        },

    },
    computed :{
        user(){
            return this.$store.state.user;
        },
        role(){
            return this.$store.state.Role;
        }
    }

}
</script>

<style lang ="scss" scoped>



</style>