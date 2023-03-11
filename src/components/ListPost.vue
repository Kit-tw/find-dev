<template>
  <div class="container-xl py-1">
          <div class="container">
              <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                  <div class="tab-content">
                      <div id="tab-1" class="tab-pane fade show p-0 active">
                          <div class="job-item p-4 mb-4">
                              <div class="row g-4">
                                  <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                      <img class="flex-shrink-0 img-fluid border rounded" :src="post.postProfileImage" alt="" style="width: 80px; height: 80px;">
                                      <div class="text-start ps-4">
                                          <h5 class="mb-3">{{post.posttitle}}</h5>
                                          <span class="text-truncate me-3"><font-awesome-icon :style="{color: '#00B074'}" class="me-2 " icon="fa-solid fa-briefcase" />{{post.posttype}}</span>
                                          <span class="text-truncate me-3"><font-awesome-icon :style="{color: '#00B074'}" class="me-2 " icon="fas fa-graduation-cap" />{{post.posteducation}}</span>
                                          <span class="text-truncate me-0"><font-awesome-icon :style="{color: '#00B074'}" class="me-2 " icon="fa-solid fa-money-check-dollar" />{{post.postsalary}} บาท</span>
                                      </div>
                                  </div>
                                  <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                      <div class="d-flex mb-3"> 
                                          <router-link :to="{name : 'DetailJob' ,params : {postid : this.post.PostID}}" class="button-3">View More</router-link>
                                      </div>
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
export default {
name:"ListPost",
props:["post"]
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
background-color: #2ea44f;
border: 1px solid rgba(27, 31, 35, .15);
border-radius: 6px;
box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
box-sizing: border-box;
color: #fff;
cursor: pointer;
display: inline-block;
font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
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
background-color: #2c974b;
}

.button-3:focus {
box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
outline: none;
}

.button-3:disabled {
background-color: #94d3a2;
border-color: rgba(27, 31, 35, .1);
color: rgba(255, 255, 255, .8);
cursor: default;
}

.button-3:active {
background-color: #298e46;
box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
</style>