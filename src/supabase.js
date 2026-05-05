import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zeocbftriydodzfgixjv.supabase.co'

// 👇 حط المفتاح هنا
const supabaseKey = 'PUT_YOUR_PUBLISHABLE_KEY_HERE'

export const supabase = createClient(supabaseUrl, supabaseKey)
