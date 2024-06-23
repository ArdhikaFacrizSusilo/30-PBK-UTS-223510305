import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './stores';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import './assets/main.css'
import '@quasar/extras/material-icons/material-icons.css';

createApp(App)
  .use(router)
  .use(pinia)
  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  .mount('#app');