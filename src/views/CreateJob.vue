<template>


        <div class="col-md-8 col-md-offset-2">

            <h1>Post Job</h1>

            <form>
                <ImagePreview v-show="this.$store.state.PostPhotoPreview" />
                <Loading v-show="loading" />
                <div class="form-group has-error">
                    <label for="Name">Title <span class="require"></span></label>
                    <input type="text" class="form-control" name="Name" v-model="posttitle" />

                </div>
                <div class="form-group upload-file">
                    <label for="Post-photo" class="bn3">Upload Cover Photo</label>
                    <input type="file" ref="PostPhoto" id="Post-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
                    <button @click.prevent="openPreview" class="preview bn3"
                        :class="{ 'button-inactive': !this.$store.state.PostPhotoFileURL }">
                        Preview Photo
                    </button>
                    <span>File Chosen: {{ this.$store.state.PostPhotoName }}</span>
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
                    <VueEditor :editor-toolbar="customToolbar" v-model="PostHTML" />
                </div>
                <div :class="{ invisible: !error }" class="err-message">
                    <p><span>Error:</span>{{ this.errorMsg }}</p>
                </div>
                <div class="form-group">
                    <button @click.prevent="uploadPost" class="btn btn-primary">Create</button>
                </div>


            </form>
        </div>


 
</template>

<script>
import { VueEditor, Quill } from "vue3-editor";
import ImagePreview from "../components/ImagePreview.vue";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loading from "../components/Loading";
export default {

    name: "CreateJob",
    data() {
        return {
            file: null,
            error: null,
            errorMsg: null,
            loading: null,
            downloadURL:"",
            customToolbar: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["code-block"]
            ]

        };
    },
    components: {
        VueEditor,
        ImagePreview,
        Loading,

    },

    methods: {
        fileChange() {
            this.file = this.$refs.PostPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        }

        ,
        openPreview() {
            this.$store.commit("openPhotoPreview");
        },
        imageHandler(file, Editor, cursorLocation, resetUploader) {
            const stroge = getStorage()
            const storageRef = ref(stroge, `documents/PostPhotos/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => { console.log(snapshot); },
                (err) => {
                    console.log(err);
                },
                async () => {
                    const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
                    Editor.insertEmbed(cursorLocation, "image", downloadURL);
                    resetUploader();
                }
            );
        },
        uploadPost() {
            if (this.posttitle.length !== 0 && this.PostHTML.length !== 0 && this.posttype !== "" && this.posteducation !== "" && this.postsalary !== 0) {
                if (this.file) {
                    this.loading = true;
                    const stroge = getStorage()
                    
                    const storageRef = ref(stroge, `documents/PostCoverPhotos/${this.$store.state.PostPhotoName}`);
                    const uploadTask = uploadBytesResumable(storageRef, this.file);

                    uploadTask.on("state_changed", (snapshot) => { console.log(snapshot); },
                        (err) => {
                            console.log(err);
                            this.loading = false;
                        },
                         async () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                            const newDocRef = doc(collection(db, "post"))
                            setDoc(
                                newDocRef,
                                {
                                    PostID: newDocRef.id,
                                    PostHTML: this.PostHTML,
                                    posttitle: this.posttitle,
                                    postsalary: this.postsalary,
                                    posteducation: this.posteducation,
                                    posttype: this.posttype,
                                    profileId: this.ProfileId,
                                    PostCoverPhoto: url,
                                    PostCoverPhotoName: this.PostCoverPhotoName,
                                    date:serverTimestamp(),
                                }
                            )
                            console.log("Document written with ID: ", newDocRef.id);
                            // await this.$store.dispatch("getPost");
                            this.loading = false;
                            this.$router.push({ name: "Post"});
                        })}
                    );
                    return;
                }
                this.error = true;
                this.errorMsg = "Please ensure you uploaded a cover photo!";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
                return;
            }
            this.error = true;
            this.errorMsg = "Please fill all the field";
            setTimeout(() => {
                this.error = false;
            }, 5000);
            return;
        },

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
        }, PostCoverPhotoName() {
            return this.$store.state.PostPhotoName;
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    padding: 5px;
}

.form-group {
    padding: 10px;
}

.bn3 {
    display: inline-block;
    padding: 0em 1.7em;
    border: 0.1em solid rgb(0, 0, 0);
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    color: #000000;
    text-shadow: 0 0.04em 0.04em rgba(68, 68, 68, 0.253);
    text-align: center;
    transition: all 0.2s;
    cursor: pointer;
}

.bn3:hover {
    color: black;
    background-color: rgb(255, 255, 255);
}

.upload-file {
    flex: 1;
    margin-left: 16px;
    position: relative;
    display: flex;

    input {
        display: none;
    }

    .preview {
        margin-left: 16px;
        text-transform: initial;
    }

    span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
    }
}
</style>