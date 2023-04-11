<template>
    <div class="job-item p-4 mb-4">
        <div class="row g-4">
            <div class="col-md-1 col-12 d-flex align-items-center">
                <img class="flex-shrink-0 img-fluid border rounded" :src="this.$store.state.ProfileImage" alt=""
                    style="width: 80px; height: 80px;">
                </div>
                <div class="col-md-6 col-12 d-flex flex-column">
                    <h5 class="mb-3">{{ post.posttitle }}</h5>
                </div>
            <div class="col-md-5 col-12 d-flex flex-column align-items-end justify-content-center">
                <div class="d-flex mb-3">
                    <button @click="deletepost" class="button-3">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ListMypost",
    props: ["post"],
    methods: {
        deletepost() {
            this.$store.dispatch("DeletePost", this.post.PostID)
        }
    }
}
</script>
  
<style lang="scss" scoped>
.nav-pills .nav-item .active {
    border-bottom: 2px solid var(--primary);
}

.job-item {
    border: 1px solid transparent;
    border-radius: 2px;
    box-shadow: 0 0 45px rgba(0, 0, 0, .08);
    transition: .5s;
}

// .job-item:hover {
//   border-color: rgba(0, 0, 0, .08);
//   box-shadow: none;
// }

.button-3 {
    appearance: none;
    background-color: #aa2710;
    border: 1px solid rgba(27, 31, 35, .15);
    border-radius: 6px;
    box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
}

.button-3:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
}

.button-3:hover {
    background-color: #921904;
}

.button-3:focus {
    box-shadow: rgba(138, 5, 0, 0.856) 0 0 0 3px;
    outline: none;
}

.button-3:disabled {
    background-color: #b10505;
    border-color: rgba(27, 31, 35, .1);
    color: rgba(255, 255, 255, .8);
    cursor: default;
}

.button-3:active {
    background-color: #580300;
    box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
</style>