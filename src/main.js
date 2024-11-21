import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/global.css';
import store from './store';  // Ensure Vuex store is imported

const app = createApp(App);
app.use(router);  // Using Vue Router
app.use(store);   // Using Vuex Store
app.mount('#app');