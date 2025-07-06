import { supabase } from './supabaseClient';

export interface User {
  id: string;
  email: string;
}

export async function signIn(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.user ? { id: data.user.id, email: data.user.email! } : null;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user ? { id: user.id, email: user.email! } : null;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    const user = session?.user ? { id: session.user.id, email: session.user.email! } : null;
    callback(user);
  });
} 