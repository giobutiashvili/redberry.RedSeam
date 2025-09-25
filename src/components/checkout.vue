<template>
  <div>
    <h1>Checkout</h1>
  </div>
  <div class="grid">
    <div class="order-details">
      <h4 style="padding-bottom: 30px">Order details</h4>
      <div class="form-grid">
        <div class="d-flex" style="gap: 23px">
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Surname" />
        </div>
        <input type="email" :placeholder="Email.text" class="mailinput" />
        <div class="d-flex" style="gap: 23px">
          <input type="text" placeholder="Address" />
          <input type="number" placeholder="Zip code" />
        </div>
      </div>
    </div>

    <div style="width: 460px">
      <div>
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
              <div class="d-flex justify-content-between align-items-center">
                <p
                  style="font-size: 18px; font-weight: 500; margin-bottom: 5px"
                >
                  {{ item.name }}
                </p>
                <p
                  style="font-size: 16px; font-weight: 400; margin-bottom: 5px"
                >
                  {{ item.price }}$
                </p>
              </div>
              <div class="d-flex flex-column" style="gap: 5px">
                <p
                  style="font-size: 12px; color: #3e424a; margin-bottom: 0.4rem"
                >
                  {{ item.color }}
                </p>
                <p
                  style="font-size: 12px; color: #3e424a; margin-bottom: 0.4rem"
                >
                  {{ item.size }}
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
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
            <span>${{ totalPrice }}</span>
          </li>
          <li class="d-flex justify-content-between">
            <span>Delivery</span>
            <span>$5</span>
          </li>
          <li class="d-flex justify-content-between fw-bold border-top pt-2">
            <span>Total</span>
            <span>${{ totalPrice + 5 }}</span>
          </li>
        </ul>
      </div>

      <div>
        <button
          v-if="cart.length > 0"
          type="submit"
          class="btn btn-dark w-100 mt-3"
          @click="close()"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { inject } from "vue";
import imgmail from "../assets/env.png";

const Email = { img: imgmail, text: "Email" };
const cart = inject("cart", ref([]));

const updateQuantity = (item, quantity) => {
  item.quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
};
onMounted(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(...savedCart);
});
const totalPrice = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
</script>

<style scoped>
.grid {
  display: flex;
  gap: 50px;
}

.order-details {
  padding: 100px;
  width: 1129px;
  background-color: #f1ebee;
}
input {
  padding-right: 12px;
  padding-left: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 277px;
  height: 42px;

  margin-bottom: 20px;
}
.mailinput {
  width: 578px;
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
