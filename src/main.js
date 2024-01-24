import { createApp } from 'vue';
import store from './store'; // 导入 Vuex store
import App from './App.vue';

const app = createApp(App);
app.use(store); // 使用 Vuex store
app.mount('#app');
