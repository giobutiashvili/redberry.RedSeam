<template>
  <div>
    <h1>Checkout</h1>
  </div>
  <div class="grid">
    <div class="order-details">
      <h4 style="padding-bottom: 30px">Order details</h4>
      <div class="form-grid">
        <div class="d-flex" style="gap: 23px">
          <input type="text" placeholder="Name" required v-model="name" />
          <input type="text" placeholder="Surname" required v-model="surname" />
        </div>
        <input
          type="email"
          :placeholder="Email.text"
          class="mailinput"
          v-model="email"
          required
        />
        <div class="d-flex" style="gap: 23px">
          <input type="text" placeholder="Address" required v-model="address" />
          <input
            type="number"
            placeholder="Zip code"
            required
            v-model="zipcode"
          />
        </div>
      </div>
    </div>

    <div style="width: 460px; gap: 81px; display: flex; flex-direction: column">
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
          @click="success()"
          :disabled="!(name && surname && email && address && zipcode)"
        >
          Proceed to Checkout
        </button>
      </div>
      <div v-if="showsuccess" class="fullscren">
        <div class="message">
          <div class="d-flex justify-content-end">
            <i class="fa-solid fa-xmark"></i>
          </div>

          <div
            class="d-flex justify-content-center align-items-center flex-column smssuccess"
          >
            <div class="vector">
              <img class="vectorimg" :src="vector" alt="image" />
            </div>
            <div class="d-flex flex-column" style="gap: 16px">
              <div>
                <h1>Congrats!</h1>
              </div>
              <div>
                <h3>Your order is placed successfully!</h3>
              </div>
              <div>
                <button
                  type="submit"
                  class="continueshopping"
                  @click="
                    clearcart();
                    $router.push('/');
                  "
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { inject } from "vue";
import imgmail from "../assets/env.png";
import vector from "../assets/Vector.png";

const Email = { img: imgmail, text: "Email" };
const cart = inject("cart", ref([]));
const showsuccess = ref(false);
const name = ref("");
const surname = ref("");
const email = ref("");
const address = ref("");
const zipcode = ref("");

function success() {
  showsuccess.value = true;
}
function clearcart() {
  cart.length = 0;
}
const updateQuantity = (item, quantity) => {
  item.quantity = quantity;
};

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
};
</script>

<style scoped>
h1 {
  font-family: poppins !important;
  font-weight: 600 !important;
  font-size: 42px !important;
  line-height: 100%;
  letter-spacing: 0%;
  color: #10151f;
}
h3 {
  font-family: poppins !important;
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 100%;
  letter-spacing: 0%;
  color: #3e424a;
}

.grid {
  display: flex;
  gap: 50px;
}

.order-details {
  padding: 100px;
  width: 1129px;
  border-radius: 16px;
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
button[type="submit"]:disabled {
  opacity: 0, 5;
  cursor: not-allowed;
}
.continueshopping {
  padding: 10px 20px;
  font-size: 14px;
  font-family: poppins;
  font-weight: 400;
  margin-top: 40px;
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
.fullscren {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.message {
  width: 100%;
  height: 100vh;
  background: white;
  padding: 50px 40px;
  font-size: 20px;
  font-weight: bold;
  color: green;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.smssuccess {
  margin-top: 50px;
  gap: 40px;
}
.vector {
  position: relative;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background-color: #e1dfe1;
}
.vectorimg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
