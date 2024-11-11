import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qzdaudoodevdlvojaqlp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6ZGF1ZG9vZGV2ZGx2b2phcWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyNzEzNTksImV4cCI6MjA0Njg0NzM1OX0.-UWgsEFzvhuYEfL4JztotbP6FQmV27KM-t9rKTD-PYM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})