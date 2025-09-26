<template>
  <NavBar />

  <div class="mt-4">
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/navBar.vue";
import { reactive, provide } from "vue";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const cart = reactive(savedCart);
provide("cart", cart);
</script>
