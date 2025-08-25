// plugins/chartjs.client.ts
import { Chart, registerables } from 'chart.js';
import { defineNuxtPlugin } from 'nuxt/app';
export default defineNuxtPlugin(() => {
  Chart.register(...registerables);
});