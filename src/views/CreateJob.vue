<template>
    <div class="container">
        <div class="row">

            <div class="col-md-8 col-md-offset-2">

                <h1>Post Job</h1>

                <form>

                    <div class="form-group has-error">
                        <label for="Name">Title <span class="require"></span></label>
                        <input type="text" class="form-control" name="Name" v-model="posttitle" />

                    </div>
                    <div class="form-group">
                        <label for="type">Job type </label>
                        <select class="form-select" aria-label="Default select example" v-model="posttype">
                            <option disabled value="">Open this select menu</option>
                            <option>One</option>
                            <option>Two</option>
                            <option>Three</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="type">Education </label>
                        <select class="form-select" aria-label="Default select example" v-model="posteducation">
                            <option disabled value="">Choice Education</option>
                            <option value="มัธยมศึกษาตอนปลาย">มัธยมศึกษาตอนปลาย</option>
                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                            <option value="ปริญญาโท">ปริญญาโท</option>
                            <option value="ปริญญาเอก">ปริญญาเอก</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="title">rate price</label>
                        <input type="number" class="form-control" name="title" v-model="postsalary" />
                    </div>
                    <div class="form-group">
                        <label for="title">welfare benefit and description</label>
                        <VueEditor v-model="PostHTML" />
                    </div>
                    <div class="form-group">
                        <button @click.prevent="uploadPost" class="btn btn-primary">Create</button>
                    </div>


                </form>
            </div>

        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from '../firebase'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


export default {

    name: "CreateJob",
    components: {
        VueEditor,

    },
    methods: {
        async uploadPost() {
            const newDocRef = doc(collection(db, "post"));
            await setDoc(
                newDocRef,
                {
                    PostID: newDocRef.id,
                    PostHTML: this.PostHTML,
                    posttitle: this.posttitle,
                    postsalary: this.postsalary,
                    posteducation: this.posteducation,
                    posttype: this.posttype,
                    profileId: this.ProfileId
                }
            )
            console.log("Document written with ID: ", newDocRef.id);
        }
    },
    computed: {
        ProfileId() {
            return this.$store.state.ProfileId;
        },
        posttitle: {
            get() {
                return this.$store.state.posttitle;
            }, set(payload) {
                this.$store.commit("Uploadposttitle", payload);
            }
        }, posttype: {
            get() {
                return this.$store.state.posttype;
            }, set(payload) {
                this.$store.commit("Uploadposttype", payload);
            }
        }, posteducation: {
            get() {
                return this.$store.state.posteducation;
            }, set(payload) {
                this.$store.commit("UploadpostEducation", payload);
            }
        }, postsalary: {
            get() {
                return this.$store.state.postsalary;
            }, set(payload) {
                this.$store.commit("Uploadpostsalary", payload);
            }
        }, PostHTML: {
            get() {
                return this.$store.state.PostHTML;
            },
            set(payload) {
                this.$store.commit("newPostHTML", payload);
            },
        }
    }
}
</script>

<style></style>