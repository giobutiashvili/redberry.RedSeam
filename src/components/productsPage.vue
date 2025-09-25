<template>
  <ProductFilter @sort="handleSort" @price="handlePrice" />
  <div class="products-grid">
    <div
      class="product-item d-flex flex-column"
      v-for="product in filteredProducts"
      :key="product.id"
      @click="goToProductDetail(product.id)"
    >
      <div class="imgclass">
        <img
          v-if="product.cover_image"
          :src="product.cover_image"
          alt="image"
        />
      </div>
      <div class="d-flex flex-column" style="gap: 2px">
        <p style="font-size: 18px !important">
          {{ product.name }}
        </p>
        <p style="font-size: 16px !important">{{ product.price }}$</p>
      </div>
    </div>
  </div>

  <div>
    <div class="pagination">
      <p
        style="
          cursor: pointer;
          margin-right: 10px;
          margin-left: 10px;
          margin-bottom: 0;
        "
        :disabled="currentPage === 1"
        @click="fetchProducts(currentPage - 1)"
      >
        &lt;
      </p>

      <template v-for="(page, index) in pagesWithDots" :key="index">
        <span v-if="page === '...'">…</span>
        <button
          v-else
          :class="{ active: page === currentPage }"
          @click="fetchProducts(page)"
        >
          {{ page }}
        </button>
      </template>
      <p
        style="
          cursor: pointer;
          margin-right: 10px;
          margin-left: 10px;
          margin-bottom: 0;
        "
        :disabled="currentPage === lastPage"
        @click="fetchProducts(currentPage + 1)"
      >
        &gt;
      </p>
    </div>
  </div>
</template>

<script setup>
import httprequests from "../httprequests/httprequests.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import ProductFilter from "./productFilter.vue";

const sortOption = ref("new");
const products = ref([]);
const router = useRouter();
const currentPage = ref(1);
const lastPage = ref(11);
const priceFilter = ref({ from: null, to: null });
const handleSort = async (option) => {
  sortOption.value = option;
  await router.push({
    query: {
      page: currentPage.value,
      sort: option,
      from: priceFilter.value.from,
      to: priceFilter.value.to,
    },
  });
};
const filteredProducts = computed(() => {
  let result = [...products.value];
  if (priceFilter.value.from !== null && priceFilter.value.to !== null) {
    result = result.filter(
      (p) =>
        p.price >= priceFilter.value.from && p.price <= priceFilter.value.to
    );
  }
  if (sortOption.value === "new") {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOption.value === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }
  return result;
});

const handlePrice = async (range) => {
  priceFilter.value = range;
  await router.push({
    query: {
      page: currentPage.value,
      sort: sortOption.value,
      from: range.from,
      to: range.to,
    },
  });
};

const goToProductDetail = (id) => {
  router.push(`/product/${id}`);
};

const fetchProducts = async (page = 1) => {
  const res = await httprequests.get(`/products?page=${page}`);
  products.value = res.data.data;
  currentPage.value = page;
  lastPage.value = res.data.meta.last_page;
  await router.push({ query: { page } });
};

const pagesWithDots = computed(() => {
  const pages = [];
  if (lastPage.value <= 5) {
    for (let i = 1; i <= lastPage.value; i++) pages.push(i);
    return pages;
  }

  if (currentPage.value > 2) pages.push(1);
  if (currentPage.value > 3) pages.push("...");

  if (currentPage.value > 1 && currentPage.value < lastPage.value)
    pages.push(currentPage.value - 1);
  pages.push(currentPage.value);
  if (currentPage.value < lastPage.value) pages.push(currentPage.value + 1);

  if (currentPage.value < lastPage.value - 2) pages.push("...");
  if (currentPage.value < lastPage.value - 1) pages.push(lastPage.value);

  return pages.filter((p, i, arr) => arr.indexOf(p) === i);
});

onMounted(async () => {
  const pageFromUrl = parseInt(router.currentRoute.value.query.page) || 1;
  const sortFromUrl = router.currentRoute.value.query.sort || "new";
  sortOption.value = sortFromUrl;
  await fetchProducts(pageFromUrl);
});
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
  gap: 24px;
}
.product-item {
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.pagination button {
  padding: 5px 10px;
  color: #212b36;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button.active {
  border: 1px solid #ff4000;
  color: #ff4000;
  font-weight: bold;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
