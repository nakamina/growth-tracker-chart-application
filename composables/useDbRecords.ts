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
          
     // データベースから取得したデータをアプリケーションの型に変換
     const records = (data ?? []).map(record => ({
       date: record.date,
       mainGoal: record.maingoal || '',
       timeManagement: record.timemanagement || 5,
       timeManagementNote: record.timemanagementnote || '',
       planning: record.planning || 5,
       planningNote: record.planningnote || '',
       cleaning: record.cleaning || 5,
       cleaningNote: record.cleaningnote || '',
       selfImprovement: record.selfimprovement || 5,
       selfImprovementNote: record.selfimprovementnote || '',
       githubCheck: record.githubcheck || false
     })) as Records
     
     return records
   }
 
   // 同日があれば上書き（UPSERT）
   const upsertOne = async (r: DailyRecord) => {
    
    try {
      // すべてのカラムをデータベースに送信
      const dbRecord = {
        date: r.date,
        maingoal: r.mainGoal,
        timemanagement: r.timeManagement,
        timemanagementnote: r.timeManagementNote,
        planning: r.planning,
        planningnote: r.planningNote,
        cleaning: r.cleaning,
        cleaningnote: r.cleaningNote,
        selfimprovement: r.selfImprovement,
        selfimprovementnote: r.selfImprovementNote,
        githubcheck: r.githubCheck
      }
      
      
      const { data, error } = await $supabase
        .from(TABLE)
        .upsert(dbRecord, { onConflict: 'date' })
      
    } catch (e) {
      console.error('upsertOne exception:', e)
      throw e
    }
   }
 
   const clearAll = async () => {
     const { error } = await $supabase.from(TABLE).delete().neq('date', '')
     if (error) throw error
   }
 
   return { fetchAll, upsertOne, clearAll }
 }
 