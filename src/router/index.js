import { createRouter, createWebHashHistory } from "vue-router";

import productDetail from "../components/productDetail.vue";
import productsPage from "../components/productsPage.vue";
import loginPage from "../components/login.vue";
import registerPage from "../components/register.vue";
import checkout from "../components/checkout.vue";

const routes = [
  { path: "/", component: productsPage, name: "productsPage" },
  { path: "/product/:id", component: productDetail, name: "productDetail" },
  { path: "/login", component: loginPage, name: "login" },
  { path: "/register", component: registerPage, name: "register" },
  {path: "/checkout", component: checkout, name:"checkout" }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
