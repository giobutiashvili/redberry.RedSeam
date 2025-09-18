import { createRouter, createWebHistory } from "vue-router";

import productDetail from "../components/productDetail.vue";
import productsPage from "../components/productsPage.vue";


const routes = [
    {path: "/", component: productsPage, name: "productsPage"},
    {path: "/product/:id", component: productDetail, name: "productDetail"},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;