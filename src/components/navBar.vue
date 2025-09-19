<template>
  <div class="d-flex justify-content-between align-items-center navbar">
    <router-link to="/">
      <div class="d-flex align-items-center logo">
        <img :src="image" alt="Product" />
        <div></div>
        <div>
          <span>RedSeam Clothing</span>
        </div>
      </div>
    </router-link>
    <div
      class="d-flex align-items-center login"
      @click="$router.push('/login')"
      style="cursor: pointer; margin-left: 4px"
    >
      <div class="loginImage">
        <img :src="loginImage" alt="" />
      </div>
      <div class="login">
        <span>Log in</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HandEye from "../assets/HandEye.png";
import Image from "../assets/user.png";

const image = ref(HandEye);
const loginImage = ref(Image);
</script>

<style scoped>
.logo {
  gap: 4px;
  cursor: pointer;
}
.login {
  gap: 8px;
}
</style>
