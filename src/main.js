import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';

createApp(App).use(PrimeVue).mount('#app')
