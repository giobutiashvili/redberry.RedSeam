<template>
  <NavBar />
  <div>
    <router-view />
  </div>
</template>

<script setup>
import NavBar from "./components/navBar.vue";
import { reactive, provide } from "vue";

const cart = reactive([]);
provide("cart", cart);
</script>
