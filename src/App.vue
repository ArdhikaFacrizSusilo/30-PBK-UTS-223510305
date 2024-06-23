<template>
  <div class="container">
    <div class="button-container">
      <button @click="navigateTo('/todos')">Todos</button>
      <button @click="navigateTo('/posts')">Post</button>
      <button @click="navigateTo('/albums')">Albums</button>
    </div>
    <router-view />   
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
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
