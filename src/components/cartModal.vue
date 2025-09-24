<template>
  <transition name="slide-right">
    <div v-if="show" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <div
          class="d-flex justify-content-between align-items-center mb-3 modal-header"
        >
          <h3>Shopping cart ({{ cart.length }})</h3>
          <h3
            style="width: 32px; height: 32px"
            class="close-btn"
            @click="close"
          >
            X
          </h3>
        </div>
        <div
          class="modal-body d-flex flex-column justify-content-between"
          style="cursor: default !important"
        >
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
                <img :src="item.image" alt="img" class="cart-image" />
              </div>
              <div
                class="d-flex flex-column justify-content-between"
                style="flex: 1"
              >
                <div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
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
                  </div>
                  <div class="d-flex flex-column" style="gap: 5px">
                    <p
                      style="
                        font-size: 12px;
                        color: #3e424a;
                        margin-bottom: 0.4rem;
                      "
                    >
                      {{ item.color }}
                    </p>
                    <p
                      style="
                        font-size: 12px;
                        color: #3e424a;
                        margin-bottom: 0.4rem;
                      "
                    >
                      {{ item.size }}
                    </p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="d-flex align-items-center quantity">
                      <button
                        :disabled="item.quantity <= 1"
                        :style="
                          item.quantity <= 1
                            ? {
                                border: 'none',
                                color: '#E1DFE1',
                              }
                            : {}
                        "
                        class="btn btn-sm"
                        @click="
                          item.quantity > 1 &&
                            updateQuantity(item, item.quantity - 1)
                        "
                      >
                        -
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button
                        class="btn btn-sm"
                        @click="updateQuantity(item, item.quantity + 1)"
                      >
                        +
                      </button>
                    </div>

                    <div style="cursor: pointer">
                      <p style="color: #3e424a" @click="removeCard()">Remove</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul class="list-unstyled d-flex flex-column gap-2">
              <li class="d-flex justify-content-between">
                <span>Items subtotal</span>
                <span>${{ totoalPrice }}</span>
              </li>
              <li class="d-flex justify-content-between">
                <span>Delivery</span>
                <span>$5</span>
              </li>
              <li
                class="d-flex justify-content-between fw-bold border-top pt-2"
              >
                <span>Total</span>
                <span>${{ totoalPrice + 5 }}</span>
              </li>
            </ul>
          </div>

          <div>
            <button
              v-if="cart.length > 0"
              type="submit"
              class="btn btn-dark w-100 mt-3"
              @click="
                close();
                $router.push('/checkout');
              "
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import cardImage from "../assets/cardImage.png";
import { inject } from "vue";
const cart = inject("cart");

const show = ref(false);
const totoalPrice = ref(0);
function open() {
  show.value = true;
}
function close() {
  show.value = false;
}
const updateQuantity = (item, quantity) => {
  item.quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
};
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

.quantity {
  gap: 2px;
  border: 1px solid #e1dfe1;
  border-radius: 22px;
  justify-content: space-between;
  padding: 4px 8px;
  height: 26px;
}
.cart-image {
  width: 100px;
  height: 134px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #e1dfe1;
}
</style>
