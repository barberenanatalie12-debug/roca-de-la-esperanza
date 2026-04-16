import { createClient } from '@supabase/supabase-js'

// 🔑 Replace these with your actual values
const supabaseUrl = 'https://jzgxtokewmodjcviwlxh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Z3h0b2tld21vZGpjdml3bHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMDM1NTksImV4cCI6MjA5MTY3OTU1OX0.u6KbeuShxgbURE_8EXhBYoL8fhLpaedbJ_cw4GfRTaY'

// 🚀 Create and export the client
export const supabase = createClient(supabaseUrl, supabaseKey)