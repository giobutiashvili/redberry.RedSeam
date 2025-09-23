<template>
  <transition name="slide-right">
    <div v-if="show" class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <button class="close-btn" @click="close">X</button>
        <h3>კალათა</h3>
        <div>
          <ul>
            ცარიელია
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";

const show = ref(false);

function open() {
  show.value = true;
}
function close() {
  show.value = false;
}

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
  justify-content: flex-end; /* მოდალი მარჯვნივ */
  align-items: stretch;
  z-index: 999;
}

.modal-content {
  background: #fff;
  width: 300px;
  max-width: 80%;
  padding: 20px;
  border-radius: 8px 0 0 8px; /* მხოლოდ მარცხენა კუთხეები გარშემო */
  position: relative;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
}

/* Close button */
.close-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

/* Slide animation */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}
</style>
