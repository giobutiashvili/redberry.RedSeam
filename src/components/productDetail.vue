<template>
  <div>
    <h1>Product ID: {{ id }}</h1>
    <!-- აქ შეგიძლია წამოიღო ინფორმაცია API-დან ამ ID-ით -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>
