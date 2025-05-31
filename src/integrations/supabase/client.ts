import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

//supabase connection details
const SUPABASE_URL = "https://lqkkmrnrjnpxbegbafor.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxxa2ttcm5yam5weGJlZ2JhZm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzA1NzMsImV4cCI6MjA2Mzg0NjU3M30.Kj5FkvcICWsC37QkIZu_J5pU45x_0qVrEhBUgKGDCh4";


export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);