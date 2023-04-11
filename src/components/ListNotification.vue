<template>
  <div class="job-item p-4 mb-4">
    <div class="row g-4">
      <div class="col-sm-12 col-md-8 d-flex align-items-center">
        <img class="flex-shrink-0 img-fluid border rounded-circle" v-if="role == 'user'" :src="post.postcreatorImage"
          alt="" style="width: 80px; height: 80px;">
        <img class="flex-shrink-0 img-fluid border rounded-circle" v-if="role == 'organize'" :src="post.postuserimage"
          alt="" style="width: 80px; height: 80px;">
        <div class="text-start ps-4">
          <h5 class="mb-3" v-if="role == 'user'">{{ post.posttitle }}</h5>
          <h5 class="mb-3" v-if="role == 'organize'">สมัครโดย {{ post.postuserfirstname }} {{ post.postuserlastname }}</h5>
          <span class="text-truncate me-3" v-if="role == 'user'"><font-awesome-icon :style="{ color: '#00B074' }"
              class="me-2 " icon="fa-solid fa-briefcase" />{{ post.posttype }}</span>
          <span class="text-truncate me-3" v-if="role == 'user'"><font-awesome-icon :style="{ color: '#00B074' }"
              class="me-2 " icon="fas fa-graduation-cap" />{{ post.posteducation }}</span>
          <span class="text-truncate me-0" v-if="role == 'user'"><font-awesome-icon :style="{ color: '#00B074' }"
              class="me-2 " icon="fa-solid fa-money-check-dollar" />{{ post.postsalary }} บาท </span>

          <span class="text-truncate me-3" v-if="role == 'organize'"><font-awesome-icon :style="{ color: '#00B074' }"
              class="me-2 " icon="fa-solid fa-pen" />{{ post.posttitle }}</span>
          <span class="text-truncate me-3" v-if="role == 'organize'"><font-awesome-icon :style="{ color: '#00B074' }"
              class="me-2 " icon="fas fa-graduation-cap" />{{ post.postusereducation }}</span>
          <span class="text-truncate me-3" v-if="role == 'organize'"><font-awesome-icon :style="{ color: '#00B074' }"
              class="me-2 " icon="fa-solid fa-venus-mars" />{{ post.postusergender }}</span>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
        <div class="d-flex mb-3">
          <span class="text-truncate me-3">Status : </span>
          <span class="text-truncate me-3">{{ post.status }}</span>
        </div>
        <div class="d-flex">
          <span v-if="post.status == 'รับสัมภาษณ์'" class="text-truncate me-3">วันที่ {{ post.postdate }} </span>

        </div>
        <div class="d-flex mb-4">
          <router-link v-if="role == 'organize'"
            :to="{ name: 'DetailNotification', params: { notificationID: this.post.postnotificationID } }"
            class="button-3">View More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List-Notification",
  props: ["post"],
  computed: {
    close,
    role() {
      return this.$store.state.Role
    }
  },

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

.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    height: 400px;
    width: 600px;
    padding: 50px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }

    img {
      margin-top: 16px;
      display: block;
      width: auto;
      height: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}</style>