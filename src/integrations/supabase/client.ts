import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// For demo purposes, we provide a mock client if Supabase is not configured
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ 
          data: { 
            user: { id: 'demo-user', email: 'demo@example.com' }, 
            session: { access_token: 'demo-token', user: { id: 'demo-user', email: 'demo@example.com' } } 
          }, 
          error: null 
        }),
        signUp: async () => ({ data: { user: { id: 'demo-user', email: 'demo@example.com' }, session: null }, error: null }),
        signOut: async () => ({ error: null }),
      },
      from: (table: string) => ({
        select: () => ({
          order: () => {
            let data: any[] = [];
            if (table === 'contact_messages') {
              data = [
                { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Business Inquiry', message: 'Interested in your recovery services for our retail chain.', status: 'unread', created_at: new Date().toISOString() },
                { id: '2', name: 'Jane Smith', email: 'jane@firm.com', subject: 'Partnership', message: 'We are a law firm looking for recovery partners.', status: 'read', created_at: new Date(Date.now() - 86400000).toISOString() },
              ];
            } else if (table === 'blog_posts') {
              data = [
                { id: '1', title: 'The Future of Ethical Debt Recovery', status: 'published', created_at: new Date().toISOString(), profiles: { full_name: 'Alex Johnson' }, excerpt: 'How AI and ethics are reshaping the collection landscape.', content: 'Full content here...' },
                { id: '2', title: 'Top 5 Recovery Strategies for 2026', status: 'published', created_at: new Date(Date.now() - 172800000).toISOString(), profiles: { full_name: 'Sarah Miller' }, excerpt: 'Discover the most effective ways to manage your accounts receivable.', content: 'Full content here...' },
              ];
            }
            return { data, error: null };
          },
          data: [],
          error: null,
        }),
        insert: async () => ({ data: null, error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
    } as any;