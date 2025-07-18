import './assets/main.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import registerDirectives from './directive';

import App from './App';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.use(registerDirectives);

app.mount('#app');
