import { supabase } from './supabaseClient';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  featured: boolean;
  published_at: string;
  image_url?: string;
  tags: string[];
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data as BlogPost[];
}

export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data as BlogPost;
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'published_at'>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

