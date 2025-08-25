<template>
    <ClientOnly>
      <div class="chart-wrapper">
        <Line :data="data" :options="options" />
      </div>
    </ClientOnly>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import type { DailyRecord } from '~/composables/useRecords';
import { averageOf } from '~/composables/useRecords';
  
  const props = defineProps<{ records: DailyRecord[] }>();
  
  const labels = computed(() => props.records.map(r => r.date));
  const averages = computed(() => props.records.map(r => averageOf(r)));
  
  const data = computed(() => ({
    labels: labels.value,
    datasets: [
      {
        label: '平均スコア',
        data: averages.value,
        tension: 0.3,
        fill: false,
        borderColor: '#6366f1',
        pointRadius: 3
      }
    ]
  }));
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { suggestedMin: 0, suggestedMax: 10, ticks: { stepSize: 1 } }
    },
    plugins: { legend: { display: true } }
  };
  </script>
  
  <style scoped>
  .chart-wrapper{ height:320px; }
  </style>