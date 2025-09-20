<template>
  <div class="products-grid">
    <div
      class=""
      v-for="product in products"
      :key="product.id"
      @click="goToProductDetail(product.id)"
    >
      <div class="imgclass">
        <img :src="product.cover_image" alt="image" />
      </div>
      <p>{{ product.name }}</p>
      <p>{{ product.price }}$</p>
    </div>
  </div>
</template>

<script setup>
import httprequests from "../httprequests/httprequests.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const products = ref([]);

const router = useRouter();

const goToProductDetail = (id) => {
  router.push(`/product/${id}`);
};

onMounted(async () => {
  try {
    const res = await httprequests.get("/products");
    products.value = res.data.data;
    console.log(res.data);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 24px;
}
.imgclass img {
  width: 100%;
  height: 549px;
  overflow: hidden;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
}
</style>
