import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnzmdilhscakbdzcauxm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxuem1kaWxoc2Nha2JkemNhdXhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMzYxOTUsImV4cCI6MjA2MjgxMjE5NX0.k20YPkB-2Wf6FcIX8IYVVwO-G2uJlPg2GciK0bQ0mWA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);