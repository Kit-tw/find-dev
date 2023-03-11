<template>
    <div class="form_wrapper">
        <div class="form_container">
            <div class="title_container">
                <Loading v-show="loading" />
                <h2>สมัครสมาชิกสำหรับผู้หางาน</h2>
            </div>
            <div class="row clearfix">
                <div class="">
                    <div class="row clearfix">
                        <div class="col_half"> <router-link class="button-6" :to="{ name: 'RegisterSeeker' }">สมัครเป็นผู้หางาน</router-link></div>
                    
                        <div class="col_half"><router-link class="button-6" :to="{ name: 'RegisterOrganize' }">สมัครเป็นองค์กร</router-link></div>
                </div>
                    <form @submit.prevent="register">
                        <div class="row clearfix">
                            <div class="col_half">
                                <div class="input_field"> <span><font-awesome-icon class="icon" icon="fa fa-user" /></span>
                                    <input type="text" name="name" placeholder="ชื่อ" v-model="firstname" />
                                </div>
                            </div>
                            <div class="col_half">
                                <div class="input_field"> <span><font-awesome-icon class="icon" icon="fa fa-user" /></span>
                                    <input type="text" name="name" placeholder="นามสกุล" v-model="lastname" />
                                </div>
                            </div>
                        </div>
                        <div class="input_field"> <span><font-awesome-icon class="icon" icon="fa fa-envelope" /></span>
                            <input type="email" name="email" placeholder="อีเมล" v-model="email" />
                        </div>
                        <div class="input_field"> <span><font-awesome-icon class="icon" icon="fa fa-lock" /></span>
                            <input type="password" name="password" placeholder="รหัสผ่าน" v-model="password" />
                        </div>
                        <div class="input_field"> <span><font-awesome-icon class="icon" icon="fa-solid fa-phone" /></span>
                            <input type="text" name="phone" placeholder="เบอร์โทร" v-model="phone" />
                        </div>
                        <div class="input_field"> <span><font-awesome-icon class="icon" icon="fa-solid fa-cake-candles" /></span>
                            <input type="date" name="date" placeholder="เดือน/วัน/ปี เกิด" v-model="date" />
                        </div>
                        <div class="input_field"> <span><font-awesome-icon class="icon"
                                    icon="fa-solid fa-circle-info" /></span>
                            <input type="text" name="description" placeholder="รายละเอียดเกี่ยวกับตัวเอง"
                                v-model="description" />
                        </div>
                        <div class="input_field radio_option">
                            <input type="radio" name="radiogroup1" id="rd1" value="ชาย" v-model="gender">
                            <label for="rd1">ชาย</label>
                            <input type="radio" name="radiogroup1" id="rd2" value="หญิง" v-model="gender">
                            <label for="rd2">หญิง</label>
                        </div>
                        
                        <div class="input_field select_option">
                            <select class="form-select" aria-label="Default select example" v-model="Education">
                        <option v-for="(Education,index) in getPostDetailEducation" :key="index.id" :value="Education" >{{ Education }}</option>
                    </select>
                        </div>
                        <div class="input_field"> <label for="profile" class="bn3">อัพโหลดโปรไฟล์</label>
                            <input type="file" ref="profile" id="profile" @change="fileChangeprofile"
                                accept=".png, .jpg, ,jpeg" />
                        </div>
                        <div class="input_field"> <label for="resume" class="bn3">อัพโหลดเรซูเม่</label>
                            <input type="file" ref="document" id="resume" @change="fileChangedocument"
                                accept=".png, .jpg, ,jpeg" />
                        </div>
                        <div class="text_field">
                            <p>มีบัญชีอยู่แล้ว
                                <router-link class="link" :to="{ name: 'LoginForm' }"> เข้าสู่ระบบ</router-link>
                            </p>
                        </div>
                        <input class="button" type="submit" value="สมัครสมาชิก" />
                        <div v-show="error" class="error">{{ this.errorMsg }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase'
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loading from "../components/Loading";
export default {
    name: "RegisterSeeker",
    components: {
        Loading,

    },
    data() {
        return {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            phone: "",
            date:"",
            gender:"",
            description:"",
            role:"user",
            error: null,
            errorMsg: "",
            loading: null,
            fileprofile: null,
            downloadURLforprofile: "",
            filedocument: null,
            downloadURLfordocument: "",
        }
    },
    methods: {
        fileChangeprofile() {
            this.fileprofile = this.$refs.profile.files[0];
            const fileName = this.fileprofile.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.fileprofile));
        },
        fileChangedocument() {
            this.filedocument = this.$refs.document.files[0];
            const fileName = this.filedocument.name;
            this.$store.commit("fileNameChange1", fileName);
            this.$store.commit("createFileURL1", URL.createObjectURL(this.filedocument));
        },
        async register() {
            if (this.email !== "" && this.password !== "" && this.lastname !== "" && this.firstname !== "" && this.phone !== "" && this.phone.length == 10 && this.date !=="") {
                if (this.fileprofile && this.filedocument) {
                    this.loading = true;
                    const stroge = getStorage()
                    const storageRef = ref(stroge, `User/Seeker/Profile/${this.$store.state.PostPhotoName}`);
                    const uploadTask =  uploadBytesResumable(storageRef, this.fileprofile);
                     uploadTask.on("state_changed", (snapshot) => { console.log(snapshot); },
                        (err) => {
                            console.log(err);
                            this.loading = false;
                        },
                        async () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                                this.downloadURLforprofile = url;
                            })
                        }
                    );
                    const storageRef1 = ref(stroge, `User/Seeker/Document/${this.$store.state.PostPhotoName1}`);
                    const uploadTask1 =  uploadBytesResumable(storageRef1, this.filedocument);
                     uploadTask1.on("state_changed", (snapshot) => { console.log(snapshot); },
                        (err) => {
                            console.log(err);
                            this.loading = false;
                        },
                        async () => {
                            getDownloadURL(uploadTask1.snapshot.ref).then(url => {
                                this.downloadURLfordocument = url;
                            })
                        }
                    );
                    await createUserWithEmailAndPassword(auth, this.email, this.password).then(cred => {
                        return setDoc(doc(db, "user", cred.user.uid), {
                            profileID:cred.user.uid,
                            firstname: this.firstname,
                            lastname:this.lastname,
                            phone: this.phone,
                            date: this.date,
                            email: this.email,
                            gender:this.gender,
                            role:this.role,
                            description:this.description,
                            education:this.Education,
                            profileimage: this.downloadURLforprofile,
                            doucmentimage: this.downloadURLfordocument

                        });
                    }).catch((error) => {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                alert("Email already in use")
                                break
                            case 'auth/invalid-email':
                                alert("Invalid email")
                                break
                            case 'auth/operation-not-allowed':
                                alert("Operation not allowed")
                                break
                            case 'auth/weak-password':
                                alert("Weak password")
                                break
                            default:
                                alert("Something went wrong")
                        }
                    });
                    this.loading = false;
                    this.$router.push({ name: "Home" })
                    return;
                }
                this.error = true;
                this.errorMsg = "Please ensure you uploaded a photo!";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
                return;
            }
            this.error = true;
            this.errorMsg = "Please fill all the field Check again";
            setTimeout(() => {
                this.error = false;
            }, 5000);
            return;
        },
    },
    computed:{
        
        posteducation: {
            get() {
                return this.$store.state.posteducation;
            }, set(payload) {
                this.$store.commit("UploadpostEducation", payload);
            }
    },
    getPostDetailEducation(){
      return this.$store.state.PostDetailEducation
    }
},
created(){
        this.$store.dispatch('getPostDetail')
    },
}
</script>

<style lang="scss">
$aquamarine : rgb(8, 192, 131);
$yellow: #f5ba1a;
$black: #000000;
$grey: #cccccc;


body {
    // font-family: Verdana, Geneva, sans-serif;
    font-size: 14px;
    background: #f2f2f2;
}

.clearfix {
    &:after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
}

.form_wrapper {
    background: #fff;
    width: 400px;
    max-width: 100%;
    box-sizing: border-box;
    padding: 25px;
    margin: 8% auto 0;
    position: relative;
    z-index: 1;
    border-top: 5px solid $aquamarine;
    -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);

    h2 {
        font-size: 1.5em;
        line-height: 1.5em;
        margin: 0;
    }

    .title_container {
        text-align: center;
        padding-bottom: 15px;
    }

    h3 {
        font-size: 1.1em;
        font-weight: normal;
        line-height: 1.5em;
        margin: 0;
    }

    label {
        font-size: 12px;
    }

    .row {
        margin: 10px -15px;

        >div {
            padding: 0 15px;
            box-sizing: border-box;
        }
    }

    .col_half {
        width: 50%;
        float: left;
    }

    .input_field {
        position: relative;
        margin-bottom: 20px;

        >span {
            position: absolute;
            left: 0;
            top: 0;
            color: #333;
            height: 100%;
            border-right: 1px solid $grey;
            text-align: center;
            width: 30px;

            .icon {
                padding-top: 10px;
            }
        }
    }

    .textarea_field {
        >span {
            >i {
                padding-top: 10px;
            }
        }
    }

    input {

        &[type="text"],
        &[type="email"],
        &[type="password"],
        &[type="number"],
        &[type="date"] {
            width: 100%;
            padding: 8px 10px 9px 35px;
            height: 35px;
            border: 1px solid $grey;
            box-sizing: border-box;
            outline: none;
        }

        &[type="text"]:hover,
        &[type="email"]:hover,
        &[type="password"]:hover {
            background: #fafafa;
        }

        &[type="text"]:focus,
        &[type="email"]:focus,
        &[type="password"]:focus {
            -webkit-box-shadow: 0 0 2px 1px rgba(0, 196, 88, 0.5);
            -moz-box-shadow: 0 0 2px 1px rgba(0, 196, 88, 0.5);
            box-shadow: 0 0 2px 1px rgba(0, 196, 88, 0.5);
            border: 1px solid $aquamarine;
            background: #fafafa;
        }

        &[type="submit"] {
            background: $aquamarine;
            height: 35px;
            line-height: 35px;
            width: 100%;
            border: none;
            outline: none;
            cursor: pointer;
            color: #fff;
            font-size: 1.1em;
            margin-bottom: 10px;

            &:hover {
                background: darken($aquamarine, 7%);
            }

            &:focus {
                background: darken($aquamarine, 7%);
            }
        }

        &[type="checkbox"],
        &[type="radio"] {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
    }
}

.form_container {
    .row {
        .col_half.last {
            border-left: 1px solid $grey;
        }
    }
}

.checkbox_option {
    label {
        margin-right: 1em;
        position: relative;

        &:before {
            content: "";
            display: inline-block;
            width: 0.5em;
            height: 0.5em;
            margin-right: 0.5em;
            vertical-align: -2px;
            border: 2px solid $grey;
            padding: 0.12em;
            background-color: transparent;
            background-clip: content-box;
            transition: all 0.2s ease;
        }

        &:after {
            border-right: 2px solid $black;
            border-top: 2px solid $black;
            content: "";
            height: 20px;
            left: 2px;
            position: absolute;
            top: 7px;
            transform: scaleX(-1) rotate(135deg);
            transform-origin: left top;
            width: 7px;
            display: none;
        }
    }

    input {
        &:hover+label:before {
            border-color: $black;
        }

        &:checked+label {
            &:before {
                border-color: $black;
            }

            &:after {
                -moz-animation: check 0.8s ease 0s running;
                -webkit-animation: check 0.8s ease 0s running;
                animation: check 0.8s ease 0s running;
                display: block;
                width: 7px;
                height: 20px;
                border-color: $black;
            }
        }
    }
}

.radio_option {
    label {
        margin-right: 1em;

        &:before {
            content: "";
            display: inline-block;
            width: 0.5em;
            height: 0.5em;
            margin-right: 0.5em;
            border-radius: 100%;
            vertical-align: -3px;
            border: 2px solid $grey;
            padding: 0.15em;
            background-color: transparent;
            background-clip: content-box;
            transition: all 0.2s ease;
        }
    }

    input {
        &:hover+label:before {
            border-color: $black;
        }

        &:checked+label:before {
            background-color: $black;
            border-color: $black;
        }
    }
}

.select_option {
    position: relative;
    width: 100%;

    select {
        display: inline-block;
        width: 100%;
        height: 35px;
        padding: 0px 15px;
        cursor: pointer;
        color: #7b7b7b;
        border: 1px solid $grey;
        border-radius: 0;
        background: #fff;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        transition: all 0.2s ease;

        &::-ms-expand {
            display: none;
        }

        &:hover,
        &:focus {
            color: $black;
            background: #fafafa;
            border-color: $black;
            outline: none;
        }
    }
}

.select_arrow {
    position: absolute;
    top: calc(50% - 4px);
    right: 15px;
    width: 0;
    height: 0;
    pointer-events: none;
    border-width: 8px 5px 0 5px;
    border-style: solid;
    border-color: #7b7b7b transparent transparent transparent;
}

.select_option select {

    &:hover+.select_arrow,
    &:focus+.select_arrow {
        border-top-color: $black;
    }
}

.text_field {
    position: relative;
    padding: 9px;
    font-size: 1.1em;
    font-weight: normal;

    .link {
        color: #008CC9;

        &:hover {
            color: #02425e;
        }
    }
}

@-webkit-keyframes check {
    0% {
        height: 0;
        width: 0;
    }

    25% {
        height: 0;
        width: 7px;
    }

    50% {
        height: 20px;
        width: 7px;
    }
}

@keyframes check {
    0% {
        height: 0;
        width: 0;
    }

    25% {
        height: 0;
        width: 7px;
    }

    50% {
        height: 20px;
        width: 7px;
    }
}

@-webkit-keyframes expand {
    0% {
        -webkit-transform: scale3d(1, 0, 1);
        opacity: 0;
    }

    25% {
        -webkit-transform: scale3d(1, 1.2, 1);
    }

    50% {
        -webkit-transform: scale3d(1, 0.85, 1);
    }

    75% {
        -webkit-transform: scale3d(1, 1.05, 1);
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        opacity: 1;
    }
}

@keyframes expand {
    0% {
        -webkit-transform: scale3d(1, 0, 1);
        transform: scale3d(1, 0, 1);
        opacity: 0;
    }

    25% {
        -webkit-transform: scale3d(1, 1.2, 1);
        transform: scale3d(1, 1.2, 1);
    }

    50% {
        -webkit-transform: scale3d(1, 0.85, 1);
        transform: scale3d(1, 0.85, 1);
    }

    75% {
        -webkit-transform: scale3d(1, 1.05, 1);
        transform: scale3d(1, 1.05, 1);
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        opacity: 1;
    }
}


@-webkit-keyframes bounce {
    0% {
        -webkit-transform: translate3d(0, -25px, 0);
        opacity: 0;
    }

    25% {
        -webkit-transform: translate3d(0, 10px, 0);
    }

    50% {
        -webkit-transform: translate3d(0, -6px, 0);
    }

    75% {
        -webkit-transform: translate3d(0, 2px, 0);
    }

    100% {
        -webkit-transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@keyframes bounce {
    0% {
        -webkit-transform: translate3d(0, -25px, 0);
        transform: translate3d(0, -25px, 0);
        opacity: 0;
    }

    25% {
        -webkit-transform: translate3d(0, 10px, 0);
        transform: translate3d(0, 10px, 0);
    }

    50% {
        -webkit-transform: translate3d(0, -6px, 0);
        transform: translate3d(0, -6px, 0);
    }

    75% {
        -webkit-transform: translate3d(0, 2px, 0);
        transform: translate3d(0, 2px, 0);
    }

    100% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}

@media (max-width: 600px) {
    .form_wrapper {
        .col_half {
            width: 100%;
            float: none;
        }
    }

    .bottom_row {
        .col_half {
            width: 50%;
            float: left;
        }
    }

    .form_container {
        .row {
            .col_half.last {
                border-left: none;
            }
        }
    }

    .remember_me {
        padding-bottom: 20px;
    }
}

.button-6 {
    align-items: center;
    background-color: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    display: inline-flex;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 400;
    justify-content: center;
    line-height: 1.25;
    margin: 0;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    position: relative;
    text-decoration: none;
    transition: all 250ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: baseline;
    width: auto;
}

.button-6:hover,
.button-6:focus {
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: rgba(0, 0, 0, 0.65);
}

.button-6:hover {
    transform: translateY(-1px);
}

.button-6:active {
    background-color: #F0F0F1;
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
}</style>