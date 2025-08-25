<template>
    <label class="inline-flex items-center gap-2 cursor-pointer select-none">
      <span class="text-sm">平均スコア</span>
      <input type="checkbox" class="hidden" :checked="!modelValue" @change="toggle" />
      <span class="relative inline-block w-12 h-7">
        <span class="absolute inset-0 rounded-full transition" :class="modelValue ? 'bg-blue-500' : 'bg-pink-400'" />
        <span class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform" :style="{ transform: modelValue ? 'translateX(20px)' : 'translateX(0px)' }" />
      </span>
      <span class="text-sm">各項目</span>
    </label>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{ modelValue: boolean }>();
  const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();
  const toggle = () => emit('update:modelValue', !props.modelValue);
  </script>
  
  <style scoped>
  /* Tailwind 無しでも最低限動作する簡易スタイル */
  .inline-flex{display:inline-flex;align-items:center}
  .items-center{align-items:center}
  .gap-2{gap:.5rem}
  .cursor-pointer{cursor:pointer}
  .select-none{user-select:none}
  .relative{position:relative}
  .inline-block{display:inline-block}
  .w-12{width:3rem}
  .h-7{height:1.75rem}
  .absolute{position:absolute}
  .inset-0{top:0;right:0;bottom:0;left:0}
  .rounded-full{border-radius:9999px}
  .transition{transition:all .2s ease}
  .top-0\.5{top:.125rem}
  .left-0\.5{left:.125rem}
  .w-6{width:1.5rem}
  .h-6{height:1.5rem}
  .bg-white{background:#fff}
  .shadow{box-shadow:0 2px 8px rgba(0,0,0,.15)}
  .text-sm{font-size:.875rem}
  .bg-blue-500{background:#3b82f6}
  .bg-pink-400{background:#f472b6}
  </style>