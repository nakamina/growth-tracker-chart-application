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
  
  const props = defineProps<{ records: DailyRecord[] }>();
  
  const labels = computed(() => props.records.map(r => r.date));
  
  const data = computed(() => ({
    labels: labels.value,
    datasets: [
      {
        label: '時間厳守',
        data: props.records.map(r => r.timeManagement),
        borderColor: '#ef4444',
        tension: 0.3,
        fill: false
      },
      {
        label: '段取り',
        data: props.records.map(r => r.planning),
        borderColor: '#10b981',
        tension: 0.3,
        fill: false
      },
      {
        label: '掃除',
        data: props.records.map(r => r.cleaning),
        borderColor: '#3b82f6',
        tension: 0.3,
        fill: false
      },
      {
        label: '自己研鑽',
        data: props.records.map(r => r.selfImprovement),
        borderColor: '#f59e0b',
        tension: 0.3,
        fill: false
      }
    ]
  }));
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { suggestedMin: 0, suggestedMax: 10, ticks: { stepSize: 1 } }
    },
    plugins: { legend: { position: 'bottom' as const } }
  };
  </script>
  
  <style scoped>
  .chart-wrapper{ height:320px; }
  </style>