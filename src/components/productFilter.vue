<template>
  <div class="d-flex justify-content-between" style="margin-top: 72px">
    <div>
      <h2>Products</h2>
    </div>

    <div
      class="d-flex justify-content-between align-items-center"
      style="gap: 32px"
    >
      <div style="color: #3e424a; font-size: 12px">
        Showing 1–10 of 100 results
      </div>
      <div style="width: 1px; height: 24px; background-color: #e1dfe1"></div>
      <div class="d-flex justify-content-between" style="gap: 20px">
        <div
          class="d-flex align-items-center"
          style="gap: 8px; position: relative"
        >
          <div @change="$emit('sort', $event.target.value)">
            <span style="cursor: pointer" @click="showSort = !showSort"
              >Sort by</span
            >
            <div class="show-sort" v-show="showSort">
              <ul
                class="d-flex flex-column gap-3"
                style="width: 100%; border: none; outline: none; padding: 8px"
              >
                <li style="font-weight: 600">Sort By</li>

                <li @click="handleClick('new')">New products first</li>
                <li @click="handleClick('price-asc')">Price, low to high</li>
                <li @click="handleClick('price-desc')">Price, high to low</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          style="gap: 8px; position: relative"
          @change="$emit('price', $event.target.value)"
        >
          <span style="cursor: pointer" @click="showprice = !showprice">
            Filter<i class="fas fa-angle-down"></i>
          </span>
          <div class="show-price" v-show="showprice">
            <div
              class="d-flex flex-column gap-3"
              style="width: 100%; border: none; outline: none; padding: 8px"
            >
              <label style="font-weight: 600">Select Price</label>
              <div class="d-flex align-items-center" style="gap: 10px">
                <input
                  type="number"
                  v-model="priceFrom"
                  placeholder="From *"
                  min="0"
                />

                <input
                  type="number"
                  v-model="priceTo"
                  placeholder="To *"
                  min="0"
                />
              </div>
              <button type="submit" @click="fillterToPrice">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const showSort = ref(false);
const showprice = ref(false);
const priceFrom = ref("");
const priceTo = ref("");

const emit = defineEmits(["sort", "price"]);

function handleClick(value) {
  emit("sort", value);
  showSort.value = false;
}

const fillterToPrice = () => {
  emit("price", { from: priceFrom.value, to: priceTo.value });
  showprice.value = ref(false);
};
</script>
<style scoped>
h2 {
  font-style: semibold;
  font-weight: 600;
  font-size: 42px;
  line-height: 100%;
  color: #10151f;
}
li {
  list-style: none;
  font-size: 16px;
  line-height: 100%;
  font-weight: 400px;
  color: #10151f;
  cursor: pointer;
}
.show-sort,
.show-price {
  position: absolute;
  left: -34px;
  background: #fff;
  border: 1px solid #e1dfe1;
  border-radius: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  z-index: 10;
  min-width: 160px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.show-price {
  left: -265px;
}
label.required::after {
  content: "*";
  color: red;
  margin-left: 2px;
}
button {
  align-self: end;
  width: 124px;
  height: 41px;
  background: #ff4000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}
input {
  margin: 0;
  font-family: poponis;
  font-size: 14px;
  line-height: 100%;
  font-weight: 400;
  padding: 4px 8px;
  border: 1px solid rgb(225, 223, 225);
  border-radius: 8px;
}
</style>
