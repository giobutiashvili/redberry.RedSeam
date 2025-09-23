<template>
  <transition name="slide-right">
    <div v-if="show" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <div
          class="d-flex justify-content-between align-items-center mb-3 modal-header"
        >
          <h3>Shopping cart</h3>
          <h3
            style="width: 32px; height: 32px"
            class="close-btn"
            @click="close"
          >
            X
          </h3>
        </div>
        <div class="modal-body" style="cursor: default !important">
          <div v-if="cart.length === 0">
            <div
              class="d-flex flex-column align-items-center"
              style="gap: 20px; margin-top: 100px"
            >
              <img :src="cardImage" alt="opss." />
              <h3>Opsss !!!</h3>
              <p>You’ve got nothing in your cart just yet...</p>
              <button
                type="submit"
                @click="
                  close();
                  $router.push('/');
                "
              >
                Start Shopping
              </button>
            </div>
          </div>
          <div v-else>
            <div
              v-for="item in cart"
              :key="item.id"
              class="d-flex mb-3"
              style="gap: 10px"
            >
              <div>
                <img
                  :src="item.image"
                  alt="img"
                  style="
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                  "
                />
              </div>
              <div
                class="d-flex flex-column justify-content-between"
                style="flex: 1"
              >
                <div>
                  <p
                    style="
                      font-size: 18px;
                      font-weight: 500;
                      margin-bottom: 5px;
                    "
                  >
                    {{ item.name }}
                  </p>
                  <p
                    style="
                      font-size: 16px;
                      font-weight: 400;
                      margin-bottom: 5px;
                    "
                  >
                    {{ item.price }}$
                  </p>
                  <p style="font-size: 14px; font-weight: 400; color: #555">
                    Quantity: {{ item.quantity }}
                  </p>
                </div>
                <div>
                  <button @click="removeCard()">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import cardImage from "../assets/cardImage.png";
import { inject } from "vue";
const cart = inject("cart");

const show = ref(false);

function open() {
  show.value = true;
}
function close() {
  show.value = false;
}
onMounted(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(...savedCart);
});

watch(
  cart,
  (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  },
  { deep: true }
);
const removeCard = (index) => {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
};

defineExpose({ open, close });
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  z-index: 999;
}

.modal-content {
  background: #fff;
  width: 540px;
  padding: 20px;
  border-radius: 8px 0 0 8px;
  position: relative;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}
.modal-header {
  padding-right: 40px;
  padding-left: 40px;
}

button[type="submit"] {
  width: 100%;
  padding: 12px;
  background: #ff4000;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button[type="submit"]:hover {
  background: #e63900;
}
</style>
