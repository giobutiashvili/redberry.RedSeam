<template>
  <div class="d-flex" v-if="product">
    <div style="flex-wrap: nowrap" class="row m-4">
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
        <div class="d-flex flex-column" style="gap: 30px">
          <div class="d-flex flex-column gap-3 mb-4">
            <p class="h1">{{ product.name }}</p>
            <p class="h1">$ {{ product.price }}</p>
          </div>
          <div class="d-flex flex-column gap-3">
            <div>
              <p>Color: {{ selectColor }}</p>
              <span
                v-for="(color, i) in product.available_colors"
                :key="i"
                class="color-circle"
                :style="{ backgroundColor: color }"
                :class="{ active: selectColor === color }"
                @click="selectColor = color"
              ></span>
            </div>
            <div class="mt-3">
              <p>Size: {{ selectSize }}</p>
              <span
                v-for="(size, i) in product.available_sizes"
                :key="i"
                class="badge me-2"
                :class="{ active: selectSize === size }"
                @click="selectSize = size"
              >
                {{ size }}
              </span>
            </div>
            <div class="mt-3">
              <label class="d-block mb-1">Quantity: </label>
              <select
                v-model="productCount"
                class="form-select w-auto quantity"
              >
                <option v-for="n in 10" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <button class="mt-4" @click="addToCard">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
          <div class="divider"></div>
          <div class="mt-4 d-flex flex-column gap-3">
            <div
              class="d-flex align-items-center justify-content-between gap-3"
            >
              <p>Details</p>
              <img
                style="width: 109px; height: 61px"
                :src="brandimg"
                alt="img"
              />
            </div>
            <div class="d-flex flex-column gap-2">
              <div>
                <p>Brand: {{ brandName }}</p>
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
import { ref, onMounted, watch } from "vue";
import HttpRequests from "../httprequests/httprequests.js";
import { inject } from "vue";

const route = useRoute();
const product = ref(null);
const MainPhoto = ref("");
const img = ref("");
const collor = ref("");
const productCount = ref(1);
const size = ref("");
const description = ref("");
const brandName = ref("");
const brandimg = ref("");
const selectSize = ref("S");
const selectColor = ref();

//პროდუქტის მონაცემების წამოღება
const fetchProduct = async (id) => {
  try {
    const res = await HttpRequests.get(`/products/${id}`);
    product.value = res.data;
    MainPhoto.value = product.value.cover_image;
    img.value = product.value.images;
    collor.value = product.value.available_colors;
    size.value = product.value.available_sizes;
    description.value = product.value.description;
    brandName.value = product.value.brand.name;
    brandimg.value = product.value.brand.image;

    console.log("~ product:", product.value);
  } catch (err) {
    console.error("Failed~:", err);
  }
};

onMounted(() => {
  fetchProduct(route.params.id);
});

watch(
  () => route.params.id,
  (newid) => {
    fetchProduct(newid);
  }
);

const cart = inject("cart");
// კალათაში დამატება
const addToCard = () => {
  if (selectColor.value) {
    alert("გთხოვთ აირჩიოთ ფერი");
    return;
  }
  cart.push({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    color: selectColor.value,
    size: selectSize.value,
    quantity: productCount.value,
    image: MainPhoto.value,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};
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
  object-fit: cover;
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
  cursor: pointer;
  border: 1px solid transparent;
  transition: border 0.2s;
}

.color-circle.active {
  padding: 3px;
  outline: 1px solid #e1dfe1;
  outline-offset: 4px;
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
.divider {
  height: 0;
  border: 1px solid #e1dfe1;
  margin: 20px 0;
  opacity: 1;
}

.badge {
  background-color: #f4f4f4;
  color: #212b36;
  padding: 9px 16px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  cursor: pointer;
  border: 1px solid #e1dfe1;
}
.badge.active {
  background-color: #e0e0e0;
  border: 1px solid #10151f;
}
.quantity {
  cursor: pointer;
  background-color: #f4f4f4;
  border: 1px solid #e1dfe1;
  border-radius: 10px;
}
</style>
