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
          <img :src="loginImage" alt="" style="width: 24px" />
        </div>
        <div class="login">
          <span>Log in</span>
        </div>
      </div>

      <div
        v-else
        class="d-flex align-items-center"
        style="gap: 20px; cursor: pointer"
      >
        <span @click="cartModal()" style="font-size: 24px"> 🛒 </span>
        <CartModal ref="cartModalRef" />
        <div @click="showlogOut = !showlogOut">
          <img
            :src="avatar"
            alt="avatar"
            class="rounded-circle"
            width="40px"
            height="40px"
          />
          <button class="showlogout">
            <i class="fa fa-angle-down"></i>
          </button>
        </div>

        <button
          v-if="showlogOut"
          @click="logout"
          class="btn btn-sm btn-danger showlogoutin"
        >
          Logout
        </button>
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
const showlogOut = ref(false);

// თუ არა დალოგინებული შეამოწმე
const isAuthenticated = computed(() => !!localStorage.getItem("token"));

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    avatar.value = user.avatar || loginImage.value;
  }
});
// უსერის ლოგაუთი
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  avatar.value = null;
  location.reload();
}
// მოდალის გახნსა
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
.showlogout {
  border: none !important;
  position: relative;
  background-color: #f8f6f7;
}
.showlogoutin {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
}
</style>
