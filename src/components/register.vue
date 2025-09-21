<template>
  <div class="register-page mt-3">
    <div class="register-image">
      <img :src="image" alt="register" />
    </div>
    <div class="register-container">
      <form @submit.prevent="submitForm" class="register-form">
        <h2>Registration</h2>
        <div class="image-upload">
          <input
            id="fileInput"
            type="file"
            @change="handleImageUpload"
            style="display: none"
          />
          <div class="image-preview" v-if="previewImage">
            <img :src="previewImage" alt="Profile Picture" />
          </div>
          <div class="d-flex align-items-center">
            <label style="cursor: pointer" for="fileInput" class="upload-label">
              Upload new
            </label>

            <p style="margin-bottom: 0" type="button" @click="removeImage">
              Remove
            </p>
          </div>
        </div>

        <div class="form-group">
          <label class="required" for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Enter your username"
          />
        </div>

        <div class="form-group">
          <label class="required" for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label class="required" for="password">Password</label>
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
              @click="togglePasswordVisibility('password')"
              class="password-toggle"
            ></i>
          </div>
        </div>

        <div class="form-group">
          <label class="required" for="confirmPassword">Confirm Password</label>
          <div class="password-input-wrapper">
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              required
              placeholder="Confirm your password"
            />
            <i
              :class="[
                'fa',
                confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye',
              ]"
              @click="togglePasswordVisibility('confirmPassword')"
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
import { useRouter } from "vue-router";
import image from "../assets/Rec.png";
import httprequest from "../httprequests/httprequests";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const previewImage = ref(null);
const passwordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const togglePasswordVisibility = (field) => {
  if (field === "password") {
    passwordVisible.value = !passwordVisible.value;
  } else if (field === "confirmPassword") {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("username", String(username.value));
  formData.append("email", String(email.value));
  formData.append("password", String(password.value));
  formData.append("password_confirmation", String(confirmPassword.value));
  if (previewImage.value) {
    formData.append("avatar", previewImage.value);
  }

  try {
    const response = await httprequest.post("/register", formData);
    console.log(response);
    router.push("/login");
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
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
.upload-label {
  display: inline-block;
  padding: 10px 14px;
  cursor: pointer;
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
.password-input-wrapper {
  position: relative;
}

.password-input-wrapper input {
  width: 100%;
  padding-right: 40px;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}
label.required::after {
  content: "*";
  color: red;
  margin-left: 2px;
}
</style>
