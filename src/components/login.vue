<template>
  <div class="login-page mt-3">
    <div class="login-image">
      <img :src="image" alt="login" />
    </div>

    <div class="login-container">
      <form @submit.prevent="submitForm" class="login-form">
        <h2>Log in</h2>

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

        <button type="submit">Log in</button>

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
import { useRouter } from "vue-router";
import image from "../assets/Rec.png";
import httprequest from "../httprequests/httprequests";

const email = ref("");
const password = ref("");
const router = useRouter();
// პაროლი რო გამოჩნდეს
const passwordVisible = ref(false);
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("password", password.value);

  try {
    const response = await httprequest.post("/login", formData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // user-loginის მერე რო რამე ცვლილებ მოხდეს ეს უზრუნველყოფს
      window.dispatchEvent(
        new CustomEvent("user-logged-in", { detail: response.data.user })
      );
      // გვერდის რეფრეში აუცილებელია რადგან და-login-ებული user-ის ავატარი გამოჩნდეს მთავარ გვერძე
      router.push("/").then(() => {
        window.location.reload();
      });
    }
    console.log("Login successful:", response.data);
  } catch (error) {
    console.error("Login error:", error);
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}

.login-image {
  flex: 1;
}
.login-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

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
