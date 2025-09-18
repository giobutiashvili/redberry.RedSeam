<template>
  <div class="container">
    <div class="row m-4" v-if="product">
      <div>
        <p>{{ product.available_colors }}</p>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <img :src="MainPhoto" class="img-fluid" />
      </div>
      <div class="col-12 col-md-6 col-lg-8">
        <p>{{ product.collor }} rame</p>
        <p class="h1">{{ product.name }}</p>

        <p>{{ product.description }}</p>
        <p>{{ product.price }} $</p>
        <div class="row">
          <div class="col-3" v-for="(img, i) in product.images" :key="i">
            <img :src="img" class="img-fluid" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-8">
            <input
              type="number"
              min="0"
              v-model="productCount"
              class="form-control"
            />
          </div>
          <div class="col-4">
            <button
              :disabled="productCount == 0"
              class="btn btn-success"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import HttpRequests from "../httprequests/httprequests.js";

const route = useRoute();
const id = route.params.id;
const product = ref(null);
const MainPhoto = ref("");
const img = ref("");
const productCount = ref(0);
const http = new HttpRequests();
const collor = ref("");

onMounted(async () => {
  try {
    const res = await http.getproducts();
    product.value = res.data.data.find(
      (p) => p.id == parseInt(route.params.id)
    );
    MainPhoto.value = product.value.cover_image;
    img.value = product.value.images;
    collor.value = product.value.available_colors;
    console.log(res.data);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
});
</script>
