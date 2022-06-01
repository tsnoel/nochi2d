import { createApp } from 'vue';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';

import App from './App.vue';

// Bind the IonPhaser custom element to the window object
defineIonPhaser(window);

createApp(App).mount('#app');
