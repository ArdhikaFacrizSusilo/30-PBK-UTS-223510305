<template>
  <div class="container">
    <div class="button-container">
      <button @click="handleMenuClick('Todos')">Todos</button>
      <button @click="handleMenuClick('Post')">Post</button>
    </div>

    <div>
      <!-- Menampilkan komponen Todos jika menu Todos dipilih -->
      <Todos v-if="selectionMenu === 'Todos'" />

      <!-- Menampilkan komponen Post jika menu Post dipilih -->
      <Post v-if="selectionMenu === 'Post'" />

      <!-- Pesan ketika tidak ada menu yang dipilih -->
      <p v-if="!selectionMenu">Pilih Salah Satu Menu</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Todos.vue';
import Post from './components/Post.vue';

const selectionMenu = ref('');

const handleMenuClick = (menu) => {
  selectionMenu.value = menu;
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 100px;
  background-color: #cbbcc0;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
  box-shadow: 0 0 5px #007BFF;
}
</style>
