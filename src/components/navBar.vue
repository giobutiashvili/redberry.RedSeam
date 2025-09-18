<template>
  <div>
    <router-link
      to="/"
      class="d-flex justify-content-between align-items-center navbar"
    >
      <div class="d-flex align-items-center logo">
        <div>
          <img :src="image" alt="Product" />
        </div>
        <div>
          <span>RedSeam Clothing</span>
        </div>
      </div>
      <div class="d-flex align-items-center login">
        <div class="loginImage">
          <img :src="loginImage" alt="" />
        </div>
        <div class="login">
          <span>Log in</span>
        </div>
      </div>
    </router-link>
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
