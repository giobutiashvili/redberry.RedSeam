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
          <i
            class="fas fa-sliders-h"
            style="cursor: pointer"
            @click="showSort = !showSort"
          ></i>
          <span style="cursor: pointer" @click="showSort = !showSort"
            >Sort by</span
          >
          <div
            v-show="showSort"
            style="
              position: absolute;
              top: 100%;
              left: 0;
              background: #fff;
              border: 1px solid #e1dfe1;
              border-radius: 4px;
              z-index: 10;
              min-width: 160px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            "
          >
            <select
              @change="$emit('sort', $event.target.value)"
              style="width: 100%; border: none; outline: none; padding: 8px"
            >
              <option value="new">New products first</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
          </div>
        </div>
        <div class="d-flex align-items-center" style="gap: 4px">
          Filter<i class="fas fa-angle-down"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const showSort = ref(false);
</script>
<style scoped>
h2 {
  font-style: semibold;
  font-weight: 600;
  font-size: 42px;
  line-height: 100%;
  color: #10151f;
}
</style>
