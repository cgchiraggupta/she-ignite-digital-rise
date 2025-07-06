import { supabase } from './supabaseClient';

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  image_url: string;
  registration_enabled: boolean;
  max_attendees: number;
  price: number;
  currency: string;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published' | 'ended';
  registration_fields: string[]; // JSON array of required fields
  thank_you_message: string;
}

export interface Registration {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone: string;
  additional_info: any; // JSON object for custom fields
  registered_at: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface RegistrationWithEvent extends Registration {
  event?: {
    title: string;
    event_date: string;
    location: string;
  };
}

// Event CRUD operations
export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function fetchEventById(id: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .update({ ...event, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Registration CRUD operations
export async function fetchRegistrations(eventId?: string): Promise<Registration[]> {
  let query = supabase
    .from('registrations')
    .select('*')
    .order('registered_at', { ascending: false });
  
  if (eventId) {
    query = query.eq('event_id', eventId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

// New function to fetch registrations with event details
export async function fetchRegistrationsWithEvents(eventId?: string): Promise<RegistrationWithEvent[]> {
  let query = supabase
    .from('registrations')
    .select(`
      *,
      event:events!inner(
        title,
        event_date,
        location
      )
    `)
    .order('registered_at', { ascending: false });
  
  if (eventId) {
    query = query.eq('event_id', eventId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

export async function createRegistration(registration: Omit<Registration, 'id' | 'registered_at'>): Promise<Registration> {
  const { data, error } = await supabase
    .from('registrations')
    .insert([{ ...registration, registered_at: new Date().toISOString() }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateRegistrationStatus(id: string, status: Registration['status']): Promise<void> {
  const { error } = await supabase
    .from('registrations')
    .update({ status })
    .eq('id', id);
  
  if (error) throw error;
}

export async function deleteRegistration(id: string): Promise<void> {
  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
} 