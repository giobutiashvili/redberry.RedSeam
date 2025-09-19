<template>
  <div class="login-page">
    <!-- მარცხენა მხარეს სურათი -->
    <div class="login-image">
      <img :src="image" alt="login" />
    </div>

    <!-- მარჯვენა მხარეს ფორმა -->
    <div class="login-container">
      <form @submit.prevent="handleLogin" class="login-form">
        <h2>Log in</h2>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>

        <router-link to="/">
          <button type="submit">Log in</button>
        </router-link>

        <p class="register-text">
          Not a member?
          <router-link to="/register">
            <span @click="$router.push('/register')"
              >Register</span
            ></router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import image from "../assets/Rec.png"; // შენი ფოტო

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Logging in with", email.value, password.value);
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

/* მარცხენა მხარე */
.login-image {
  flex: 1;
}
.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* მარჯვენა მხარე */
.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.login-form {
  width: 100%;
  max-width: 360px;
}

.login-form h2 {
  font-size: 28px;
  margin-bottom: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 18px;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
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

.register-text {
  margin-top: 16px;
  text-align: center;
}

.register-text span {
  color: #ff4000;
  cursor: pointer;
  font-weight: 600;
}
</style>
