<!-- Post.vue -->
<template>
  <top>
    <div>
      <div style="margin-left: 60px;">
        <h2>Post</h2>
        <select v-model="selectedUser" @change="fetchPosts" class="select-user">
          <option value="">Select User</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <ul v-if="posts.length" class="post-list">
        <li v-for="post in posts" :key="post.id" class="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
      <p v-else-if="selectedUser && !posts.length" class="no-posts">No posts available for this user</p>
      <p v-else class="no-posts" style="margin-left: 60px;">No posts available</p>
    </div>
  </top>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: String,
});

const users = ref([]);
const selectedUser = ref('');
const posts = ref([]);

const fetchUsers = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchPosts = async () => {
  try {
    if (!selectedUser.value) return;
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
    const data = await response.json();
    posts.value = data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style>
.top {
  margin-left: 215px;
}

.select-user {
  margin-bottom: 20px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 32px 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>');
  background-repeat: no-repeat;
  background-position: right 8px center;
  cursor: pointer;
}

.select-user:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.select-user option {
  background-color: #fff;
  color: #333;
  margin-left: 60px;
}

.select-user::-ms-expand {
  display: none;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  border: 1px solid #cbbcc0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.no-posts {
  font-style: italic;
  color: #888;
}
</style>
