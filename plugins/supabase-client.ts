 // plugins/supabase.client.ts
 import { createClient, type SupabaseClient } from '@supabase/supabase-js'
 
 export default defineNuxtPlugin(() => {
   const config = useRuntimeConfig()
   const supabase: SupabaseClient = createClient(
     config.public.supabaseUrl!,
     config.public.supabaseAnonKey!
   )
   return { provide: { supabase } }
 })