<template>
  <div class="register-page">
    <div class="register-image">
      <img :src="image" alt="register" />
    </div>
    <div class="register-container">
      <form @submit.prevent="handleRegister" class="register-form">
        <h2>Registration</h2>
        <div class="image-upload">
          <input type="file" @change="handleImageUpload" />
          <div class="image-preview" v-if="previewImage">
            <img :src="previewImage" alt="Profile Picture" />
          </div>
          <button type="button" @click="removeImage">Remove</button>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Enter your username"
          />
        </div>

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
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="passwordVisible ? 'text' : 'password'"
              required
              placeholder="Enter your password"
            />
            <i
              :class="['fa', passwordVisible ? 'fa-eye-slash' : 'fa-eye']"
              @click="togglePasswordVisibility"
              class="password-toggle"
            ></i>
          </div>
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <div class="password-input-wrapper">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="passwordVisible ? 'text' : 'password'"
              required
              placeholder="Confirm your password"
            />
            <i
              :class="['fa', passwordVisible ? 'fa-eye-slash' : 'fa-eye']"
              @click="togglePasswordVisibility"
              class="password-toggle"
            ></i>
          </div>
        </div>

        <button type="submit">Register</button>

        <p class="login-text">
          Already a member?
          <router-link to="/login">
            <span>Log in</span>
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import image from "../assets/Rec.png";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const previewImage = ref(null);

const handleRegister = () => {
  console.log(
    "Registering with",
    username.value,
    email.value,
    password.value,
    confirmPassword.value
  );
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  previewImage.value = null;
};
</script>

<style scoped>
.register-page {
  display: flex;
  height: 100vh;
}

.register-image {
  flex: 1;
}
.register-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.register-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}

.register-form {
  width: 100%;
  max-width: 360px;
}

.register-form h2 {
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

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.image-upload input {
  margin-bottom: 10px;
}

.image-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

button[type="button"] {
  padding: 8px;
  background: #ff4000;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button[type="button"]:hover {
  background: #e63900;
}

.login-text {
  margin-top: 16px;
  text-align: center;
}

.login-text span {
  color: #ff4000;
  cursor: pointer;
  font-weight: 600;
}
</style>
