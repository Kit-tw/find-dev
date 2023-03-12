<template>
    <header>
        <nav class="class container">
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
        }
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
header {
    background-color: #FFFF;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: .3s color ease;

        &:hover {
            color: rgb(8, 192, 131);
        }
    }

    nav {
        display: flex;
        padding: 25px 0;

        .branding {
            display: flex;
            align-items: center;

            .header {
                font-weight: 600;
                font-size: 24px;
                color: #000;
                text-decoration: none;
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul {
                margin-right: 32px;

                .link {
                    margin-right: 32px;
                }

                .link:last-child {
                    margin-right: 0px;
                }
            }
        }
    }
}</style>