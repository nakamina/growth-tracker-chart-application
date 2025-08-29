 // composables/useDbRecords.ts
 import type { DailyRecord, Records } from './useRecords'
 
 const TABLE = 'records'
 
 export function useDbRecords() {
   const { $supabase } = useNuxtApp()
 
   // 直近60日分をサーバから取得（全保存はDB側に保持）
   const fetchAll = async (): Promise<Records> => {
     const { data, error } = await $supabase
       .from(TABLE)
       .select('*')
       .order('date', { ascending: true })
     if (error) throw error
     return (data ?? []) as Records
   }
 
   // 同日があれば上書き（UPSERT）
   const upsertOne = async (r: DailyRecord) => {
    console.log('test')
     const { error } = await $supabase
       .from(TABLE)
       .upsert(r, { onConflict: 'date' })
     if (error) throw error
   }
 
   const clearAll = async () => {
     const { error } = await $supabase.from(TABLE).delete().neq('date', '')
     if (error) throw error
   }
 
   return { fetchAll, upsertOne, clearAll }
 }
 