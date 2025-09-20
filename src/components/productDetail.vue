<template>
  <div class="d-flex" v-if="product">
    <div class="row m-4">
      <div class="col-2 d-flex flex-column gap-2">
        <img
          v-for="(img, i) in product.images"
          :key="i"
          :src="img"
          class="img-thumbnail small-img"
          @click="MainPhoto = img"
        />
      </div>

      <div class="col-10">
        <img :src="MainPhoto" class="big-img" />
      </div>
    </div>
    <div class="row m-4" style="width: 704px">
      <div class="mt-3 col-10">
        <div class="gap-3">
          <div class="d-flex flex-column gap-3 mb-4">
            <p class="h1">{{ product.name }}</p>
            <p class="h1">$ {{ product.price }}</p>
          </div>

          <div class="d-flex flex-column gap-3">
            <div>
              <p>Color:</p>
              <span
                v-for="(color, i) in product.available_colors"
                :key="i"
                class="color-circle"
                :style="{ backgroundColor: color }"
              >
              </span>
            </div>
            <div>
              <p>Size :</p>
              <span
                v-for="(size, i) in product.available_sizes"
                :key="i"
                class="badge bg-secondary me-2"
              >
                {{ size }}
              </span>
            </div>
            <div class="mt-3">
              <label class="d-block mb-1">Quantity: </label>
              <select v-model="productCount" class="form-select w-auto">
                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>
          <div>
            <button class="mt-4">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
          <div class="mt-4 d-flex flex-column gap-3">
            <div>
              <p>Details</p>
            </div>
            <div class="d-flex flex-column gap-2">
              <div>
                <p>Brand:</p>
              </div>
              <div>
                <p>{{ product.description }}</p>
              </div>
            </div>
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
const collor = ref("");
const productCount = ref(1);
const size = ref("");
const description = ref("");

onMounted(async () => {
  try {
    const res = await HttpRequests.get("/products");
    product.value = res.data.data.find(
      (p) => p.id == parseInt(route.params.id)
    );
    MainPhoto.value = product.value.cover_image;
    img.value = product.value.images;
    collor.value = product.value.available_colors;
    size.value = product.value.available_sizes;
    description.value = product.value.description;
    console.log(res.data);
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
});
</script>

<style scoped>
body {
  font-family: "Poppins", sans-serif;
}
.small-img {
  cursor: pointer;
  max-width: 121px;
  height: 161px;
  border-radius: 6px;
}

.big-img {
  width: 703px;
  height: 937px;
  border-radius: 10px;
}
.color-circle {
  display: inline-block;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
button {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 59px;
  background-color: #ff4000;
  color: white;
  padding: 16px 60px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
</style>
