import './assets/css/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Lara from './assets/presets/lara';
import ToastService from 'primevue/toastservice';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(PrimeVue, { unstyled: true, pt: Lara })
  .use(ToastService)
  .mount('#app');
