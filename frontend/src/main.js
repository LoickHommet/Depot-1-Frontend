import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous d'importer votre configuration de router correctement
import axios from 'axios';


const app = createApp(App);
app.use(router);
app.mount('#app');

axios.defaults.baseURL = 'http://localhost/api'; 
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization';