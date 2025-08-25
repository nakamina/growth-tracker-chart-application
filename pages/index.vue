<template>
    <main class="container">
      <h1>2ヶ月 成長記録（簡易版）😺</h1>
  
      <section class="card">
        <h2>今日の入力</h2>
        <form @submit.prevent="onSave">
          <div class="row">
            <label>日付</label>
            <input type="date" v-model="form.date" required />
          </div>
          <div class="row">
            <label>今日の目標</label>
            <input type="text" v-model.trim="form.mainGoal" placeholder="例：8:55出社・朝掃除・PR1本" />
          </div>
  
          <div class="grid">
            <div class="row">
              <label>時間厳守: {{ form.timeManagement }}</label>
              <input type="range" min="0" max="10" step="1" v-model.number="form.timeManagement" />
              <textarea v-model.trim="form.timeManagementNote" placeholder="メモ（任意）"></textarea>
            </div>
            <div class="row">
              <label>段取り: {{ form.planning }}</label>
              <input type="range" min="0" max="10" step="1" v-model.number="form.planning" />
              <textarea v-model.trim="form.planningNote" placeholder="メモ（任意）"></textarea>
            </div>
            <div class="row">
              <label>掃除: {{ form.cleaning }}</label>
              <input type="range" min="0" max="10" step="1" v-model.number="form.cleaning" />
              <textarea v-model.trim="form.cleaningNote" placeholder="メモ（任意）"></textarea>
            </div>
            <div class="row">
              <label>自己研鑽: {{ form.selfImprovement }}</label>
              <input type="range" min="0" max="10" step="1" v-model.number="form.selfImprovement" />
              <textarea v-model.trim="form.selfImprovementNote" placeholder="メモ（任意）"></textarea>
            </div>
          </div>
  
          <div class="row">
            <label>
              <input type="checkbox" v-model="form.githubCheck" /> GitHubに草生やす
            </label>
          </div>
  
          <div class="actions">
            <button type="submit">保存</button>
            <button type="button" @click="resetToday">今日をリセット</button>
            <button type="button" @click="clearAll" class="danger">全削除</button>
          </div>
        </form>
      </section>
  
      <section class="card">
        <div class="toolbar">
          <SwitchToggle v-model="showItems" />
        </div>
        <div class="chart">
          <AverageChart v-if="!showItems" :records="recentRecords" />
          <ItemsChart v-else :records="recentRecords" />
        </div>
      </section>
 
     <section class="card">
       <h2>履歴</h2>
       <table class="table">
         <thead>
           <tr>
             <th>日付</th>
             <th>目標</th>
             <th>平均</th>
             <th>GitHub</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="r in records" :key="r.date">
             <td>{{ r.date }}</td>
             <td>{{ r.mainGoal }}</td>
             <td>{{ averageOf(r).toFixed(1) }}</td>
             <td>{{ r.githubCheck ? '✅' : '' }}</td>
           </tr>
         </tbody>
       </table>
     </section>
   </main>
 </template>
 
 <script setup lang="ts">
 import { computed, reactive, ref, watch } from 'vue';
import AverageChart from '~/components/AverageChart.vue';
import ItemsChart from '~/components/ItemsChart.vue';
import SwitchToggle from '~/components/SwitchToggle.vue';
import { averageOf, getLastRecord, useRecords, type DailyRecord } from '~/composables/useRecords';
 
 const { records, upsert, clearAll: _clearAll } = useRecords();
 
 const todayISO = new Date().toISOString().slice(0, 10);
 
 // 初期値：前日の値をコピー（なければ 5）
 const last = getLastRecord(records.value);
 const form = reactive<DailyRecord>({
   date: todayISO,
   mainGoal: '',
   timeManagement: last ? last.timeManagement : 5,
   planning: last ? last.planning : 5,
   cleaning: last ? last.cleaning : 5,
   selfImprovement: last ? last.selfImprovement : 5,
   githubCheck: false,
 });
 
 // 日付変更時：同日があれば上書き、無ければ前日コピー
 watch(() => form.date, (newDate) => {
   const existing = records.value.find(r => r.date === newDate);
   if (existing) {
     Object.assign(form, structuredClone(existing));
     return;
   }
   const prev = [...records.value]
     .filter(r => r.date < newDate)
     .sort((a, b) => a.date.localeCompare(b.date))
     .at(-1);
   if (prev) {
     form.timeManagement = prev.timeManagement;
     form.planning = prev.planning;
     form.cleaning = prev.cleaning;
     form.selfImprovement = prev.selfImprovement;
   } else {
     form.timeManagement = 5;
     form.planning = 5;
     form.cleaning = 5;
     form.selfImprovement = 5;
   }
   form.mainGoal = '';
   form.githubCheck = false;
 });
 
 function onSave() {
   upsert(structuredClone(form));
   alert('保存しました（グラフ更新済み）');
 }
 
 function resetToday() {
   form.mainGoal = '';
   const lastRec = getLastRecord(records.value);
   form.timeManagement = lastRec ? lastRec.timeManagement : 5;
   form.planning = lastRec ? lastRec.planning : 5;
   form.cleaning = lastRec ? lastRec.cleaning : 5;
   form.selfImprovement = lastRec ? lastRec.selfImprovement : 5;
   form.githubCheck = false;
 }
 
 function clearAll() {
   if (confirm('全削除します。よろしいですか？')) _clearAll();
 }
 
 // 直近60日だけグラフ表示（保存は全期間）
 const recentRecords = computed(() => {
   const cutoff = new Date();
   cutoff.setDate(cutoff.getDate() - 60);
   const cutoffISO = cutoff.toISOString().slice(0,10);
   return records.value.filter(r => r.date >= cutoffISO);
 });
 
 const showItems = ref(false); // false: 平均, true: 各項目
 </script>
 <style scoped>
 .container { max-width: 960px; margin: 24px auto; padding: 0 16px; }
 .card { background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 10px rgba(0,0,0,.06); }
 .row { display: grid; gap: 8px; margin-bottom: 12px; }
 .grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
 @media (max-width: 640px){ .grid { grid-template-columns: 1fr; } }
 input[type="text"], input[type="date"], textarea { width: 100%; padding: 8px; border: 1px solid #e5e7eb; border-radius: 8px; }
 input[type="range"] { width: 100%; }
 .actions { display: flex; gap: 8px; flex-wrap: wrap; }
 button { padding: 8px 12px; border: none; border-radius: 8px; background: #6366f1; color: white; cursor: pointer; }
 button.danger { background: #ef4444; }
 .toolbar { display: flex; justify-content: flex-end; margin-bottom: 8px; }
 .chart { height: 320px; }
 .table { width: 100%; border-collapse: collapse; }
 .table th, .table td { border-bottom: 1px solid #eee; padding: 8px; text-align: left; }
 </style> 