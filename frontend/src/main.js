import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assurez-vous d'importer votre configuration de router correctement

const app = createApp(App);
app.use(router);
app.mount('#app');
