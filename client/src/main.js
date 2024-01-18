import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { CoHome, MdDaterangeTwotone } from 'oh-vue-icons/icons';
import App from './App.vue';
import router from './router';

addIcons(CoHome, MdDaterangeTwotone);

const app = createApp(App);

app.component('v-icon', OhVueIcon);

app.use(createPinia());
app.use(router);

app.mount('#app');
