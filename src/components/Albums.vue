<template>
    <div>
      <h2>Daftar Album</h2>
      <q-card v-for="album in albums" :key="album.id" class="album-card">
        <q-card-section>
          <q-card-title>{{ album.title }}</q-card-title>
        </q-card-section>
        <q-card-section>
          <router-link :to="'/albums/' + album.id">
            <q-btn color="bg-white" label="View Album"></q-btn>
          </router-link>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const albums = ref([]);
  
  const fetchAlbums = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      albums.value = await response.json();
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };
  
  onMounted(() => {
    fetchAlbums();
  });
  </script>
  
  <style scoped>
  .album-card {
    max-width: 300px;
    margin-bottom: 20px;
  }
  </style>
  