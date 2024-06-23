<!-- Todos.vue -->
<template>
  <div>
    <header>
      <h1>DAFTAR KEGIATAN</h1>
      <div id="todoStatus">
        <div id="totalComp">
          <span id="totalCompleted" class="countData">{{ completedTodoNum }}</span><span class="countName">Comp.</span>
        </div>
        <div id="totalNum">
          <span id="totalTodos" class="countData">{{ visibleTodos.length }}</span><span class="countName">Total</span>
        </div>
      </div>
    </header>
    <main>
      <div id="todoInput">
        <div class="listItem">
          <input type="text" v-model="newTodoName" placeholder="Masukkan Inputan Kegiatan ..." @keydown.enter="addTodo" @keydown.esc="removeTodo(todoList[0].id)">
        </div>
      </div>
      <div id="todoList" v-for="todo in visibleTodos" :key="todo.id">
        <div class="listItem">
          <div v-if="todo.done" class="todoNameDone" @click="toggleTodo(todo.id)">
            {{ todo.name }}
          </div>
          <div v-else class="todoName" @click="toggleTodo(todo.id)">
            {{ todo.name }}
          </div>
          <button @click="removeTodo(todo.id)">×</button>
        </div>
      </div>
    </main>
    <div class="checkbox-container">
      <input type="checkbox" id="showNotCompleted" v-model="showNotCompleted">
      <label for="showNotCompleted" class="checkbox-label">Tampilkan yang Belum Selesai</label>
    </div>
    <h4 style="font-size: 11px; margin-top: 10px;"> <center>NOTE : ( TEKAN NAMA KEGIATAN KALO KEGIATAN TERSEBUT SELESAI MAKA NAMA KEGIATAN TERSEBUT AKAN TERCORET ).</center> </h4><br>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  title: String,
});

let todoList = ref([]);
const newTodoName = ref('');
const todoId = ref(0);
const showNotCompleted = ref(false);

const readLocalStorage = () => {
  const data = localStorage.getItem('todoList');
  if (data) {
    todoList.value = JSON.parse(data);
    todoId.value = todoList.value.length;
  }
};

const writeLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList.value));
};

const addTodo = () => {
  todoList.value.push({
    id: todoId.value++,
    name: newTodoName.value || 'New Todo',
    done: false
  });
  newTodoName.value = '';
  writeLocalStorage();
};

const removeTodo = (id) => {
  todoList.value.splice(todoList.value.findIndex(todo => todo.id === id), 1);
  writeLocalStorage();
};

const toggleTodo = (id) => {
  todoList.value = todoList.value.map(todo => {
    if (todo.id === id) {
      todo.done = !todo.done;
    }
    return todo;
  });
  writeLocalStorage();
};

const completedTodoNum = computed(() => {
  return todoList.value.filter(todo => todo.done).length;
});

const activeTodos = computed(() => {
  return todoList.value.filter(todo => !todo.done);
});

const visibleTodos = computed(() => {
  return showNotCompleted.value ? activeTodos.value : todoList.value;
});

readLocalStorage();
</script>

<style>
.checkbox-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-container input[type="checkbox"] {
  display: none;
}

.checkbox-label {
  display: inline-block;
  background-color: #cbbcc0;
  border: 1px solid #ccc;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
}

.checkbox-label:hover {
  background-color: #e0e0e0;
}

.checkbox-label::after {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 2px;
  margin-left: 5px;
}

.checkbox-container input[type="checkbox"]:checked + .checkbox-label::after {
  background-color: #3498db;
  border-color: #3498db;
}
</style>
