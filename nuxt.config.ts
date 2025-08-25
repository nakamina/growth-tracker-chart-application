 // nuxt.config.ts
 export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { strict: true },
  compatibilityDate: '2024-11-01',
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    }
  }
})