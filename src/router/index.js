import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Post from '../components/Post.vue';
import Albums from '../components/Albums.vue';
import AlbumPhotos from '../components/AlbumPhotos.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Post },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumPhotos, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
