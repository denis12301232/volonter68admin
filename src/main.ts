import './assets/main.css';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/eva-icons/eva-icons.css';
import 'quasar/src/css/index.sass';
import { Quasar } from 'quasar';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(Quasar, {
    plugins: {},
  })
  .mount('#app');
