<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <Model v-if="ModelActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                <span class="font-weight-bold">Edogaru</span>
                <span class="text-black-50" >edogaru@mail.com.my</span>
                <!-- <span class="font-weight-bold">{{this.$store.state.ProfileFirstname}} {{ this.$store.state.ProfileLastname }}</span>
                <span class="text-black-50" >{{ this.$store.state.ProfileEmail }}</span> -->
            </div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Account</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" id="firstname" v-model="firstname"></div>
                    <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" id="lastname" v-model="lastname"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label><input type="text" class="form-control" placeholder="enter phone number" value=""></div>
                    <div class="col-md-12"><label class="labels">Address Line 1</label><input type="text" class="form-control" placeholder="enter address line 1" value=""></div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Postcode</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">State</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Education</label><input type="text" class="form-control" placeholder="education" value=""></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value=""></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state"></div>
                </div>
                <div class="mt-5 text-center"><button @click="updateProfile" class="btn btn-primary profile-button" type="button">Save Profile</button></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span class="border px-3 p-1 add-experience"><i class="fa fa-plus"></i>&nbsp;Experience</span></div><br>
                <div class="col-md-12"><label class="labels">Experience in Designing</label><input type="text" class="form-control" placeholder="experience" value=""></div> <br>
                <div class="col-md-12"><label class="labels">Additional Details</label><input type="text" class="form-control" placeholder="additional details" value=""></div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import Model from "../components/Model"
export default {
    name:"Profile",
    components:{
        Model
    },
    data(){
        return {
            modalMessage :"Change were saved",
            ModelActive:null
        }
    },
    methods:{
        closeModal() {
            this.ModelActive = !this.ModelActive;
        },
        updateProfile(){
            this.$store.dispatch("updateUserSetting");
            this.ModelActive = !this.ModelActive
        }
    },
    computed:{
        firstname:{
            get(){
                return this.$store.state.ProfileFirstname
            },
            set(payload){
                this.$store.commit("ChangeFirstname",payload)
            }
        },
        lastname:{
            get(){
                return this.$store.state.ProfileLastname
            },
            set(payload){
                this.$store.commit("ChangeLastname",payload)
            }
        },
        email(){
            return this.$store.state.ProfileEmail
        }
    }
}
</script>

<style lang="scss">


.form-control:focus {
    box-shadow: none;
    border-color: rgb(8, 192, 131)
}

.profile-button {
    background: rgb(8, 192, 131);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: rgb(3, 139, 94)
}

.profile-button:focus {
    background: rgb(0, 85, 57);
    box-shadow: none
}

.profile-button:active {
    background: rgb(2, 133, 89);
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}


</style>