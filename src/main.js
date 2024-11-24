import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/global.css';
import store from './store';  // Ensure Vuex store is imported

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle, faStopCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the icons to the library
library.add(faPlayCircle, faStopCircle, faCheckCircle, faTimesCircle);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);  // Using Vue Router
app.use(store);   // Using Vuex Store
app.mount('#app');