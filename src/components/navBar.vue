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
    <div class="d-flex align-items-center" style="margin-left: 4px">
      <!-- თუ არ არის დალოგინებული -->
      <div
        v-if="!isAuthenticated"
        class="d-flex align-items-center login"
        @click="$router.push('/login')"
        style="cursor: pointer"
      >
        <div class="loginImage">
          <img :src="loginImage" alt="" />
        </div>
        <div class="login">
          <span>Log in</span>
        </div>
      </div>

      <div
        v-else
        class="d-flex align-items-center"
        style="gap: 20px; width: 108px; height: 40px; cursor: pointer"
      >
        <span @click="cartModal()"> 🛒 </span>
        <CartModal ref="cartModalRef" />
        <img
          :src="avatar"
          alt="avatar"
          class="rounded-circle"
          width="40"
          height="40"
        />
        <button @click="logout" class="btn btn-sm btn-danger">Logout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import HandEye from "../assets/HandEye.png";
import Image from "../assets/user.png";
import CartModal from "./cartModal.vue";

const image = ref(HandEye);
const loginImage = ref(Image);
const avatar = ref(null);

const isAuthenticated = computed(() => !!localStorage.getItem("token"));

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    avatar.value = user.avatar || loginImage.value;
  }

  // Custom Event
  window.addEventListener("user-logged-in", (e) => {
    avatar.value = e.detail.avatar || loginImage.value;
  });
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  avatar.value = null;
  location.reload();
}

const cartModalRef = ref(null);
function cartModal() {
  if (cartModalRef.value) {
    cartModalRef.value.open();
  }
}
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
