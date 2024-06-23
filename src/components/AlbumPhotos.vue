<template>
    <div>
      <h2>{{ albumName }}</h2>
      <div class="photo-list">
        <div v-for="photo in photos" :key="photo.id" class="photo-item">
          <img :src="photo.thumbnailUrl" alt="Photo thumbnail" @click="viewPhoto(photo.url)" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const albumId = ref(route.params.id);
  const albumName = ref('');
  const photos = ref([]);
  
  const fetchPhotos = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId.value}`);
      photos.value = await response.json();
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  
  const viewPhoto = (url) => {
    window.open(url, '_blank');
  };
  
  onMounted(async () => {
    // Fetch album details or name here if needed
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId.value}`);
      const data = await response.json();
      albumName.value = data.title; // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching album details:', error);
    }
  
    fetchPhotos();
  });
  </script>
  
  <style scoped>
  .photo-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .photo-item {
    width: 160px;
    height: 160px;
    margin: 10px;
    overflow: hidden;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .photo-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  