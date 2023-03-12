<template>

    <Model v-if="ModelActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
    <div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="account-settings">
			<div class="user-profile">
				<div class="user-avatar">
					<img :src="ProfileImage">
				</div>
				<h5 class="user-name" v-if="role == 'organize'" >{{ $store.state.ProfileFirstname }}</h5>
                <h5 class="user-name" v-if="role =='user' || role =='admin'">{{ $store.state.ProfileFirstname }} {{ $store.state.ProfileLastname }} </h5>
				<h6 class="user-email" >{{ $store.state.ProfileEmail }}</h6>
			</div>
			<div class="user-avatar">
                <h5>Document</h5>
					<img :src="ProfileDocument" style="width: 250px; height: 250px;" >
				</div>
		</div>
	</div>
</div>
</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
            <div v-if="role == 'organize'" class="col-xl-10 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Full Name</label>
					<input type="text" class="form-control" id="fullName" v-model="firstname">
				</div>
			</div>
            <div v-if="role == 'user'  || role =='admin' " class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" v-model="firstname"></div>
                    <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" v-model="lastname"></div>
                </div>
                <div v-if="role == 'user'  || role =='admin' " class="row mt-2">
                    <div class="col-md-6"><label class="labels">Date of Birth</label><input disabled type="text" class="form-control" v-model="date"></div>
                    <div class="col-md-6"><label class="labels">Phone</label><input disabled type="text" class="form-control" v-model="phone"></div>
                </div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">About</h6>
			</div>
			<div class="col-xl-10 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Street">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="description" ></textarea>
				</div>
			</div>
            <div v-if="role == 'organize'" class="col-xl-10 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="Street">Address</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="2" v-model="location" ></textarea>
				</div>
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right">
					<!-- <button type="button" id="submit" name="submit" class="btn btn-secondary">Cancel</button> -->
					<button type="button" @click="updateProfile" id="submit" name="submit" class="btn btn-primary">Update</button>
				</div>
			</div>
		</div>
	</div>
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
            if(this.$store.state.Role == 'organize'){
                this.$store.dispatch("updateOrganizeSetting");
            }else if(this.$store.state.Role == 'user' || this.$store.state.Role == 'admin'){
                this.$store.dispatch("updateUserSetting");
            }
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
        description:{
            get(){
                return this.$store.state.ProfileDescription
            },
            set(payload){
                this.$store.commit("ChangeDescription",payload)
            }
        },
        location:{
            get(){
                return this.$store.state.ProfileLocation
            },
            set(payload){
                this.$store.commit("ChangeLocation",payload)
            }
        },
        ProfileImage:{
            get(){
                return this.$store.state.ProfileImage
            }
        },
        ProfileDocument:{
            get(){
                return this.$store.state.ProfileDocument
            }
        },
        email(){
            return this.$store.state.ProfileEmail
        },
        date(){
            return this.$store.state.ProfileBirthDate
        },
        phone(){
            return this.$store.state.ProfilePhone
        },
        role(){
            return this.$store.state.Role
        }
    }
}
</script>

<style lang="scss">

.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #9fa8b9;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;
    background: #ffffff;
    color: #2e323c;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}
</style>