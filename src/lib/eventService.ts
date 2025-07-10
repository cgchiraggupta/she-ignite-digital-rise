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
  registration_fields: string[]; 
  thank_you_message: string;
}

export interface Registration {
  id: string;
  event_id: string;
  registration_data: {
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  created_at: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface RegistrationWithEvent extends Registration {
  event_title?: string;
  event_date?: string;
  event_time?: string;
  event_location?: string;
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


export async function fetchRegistrations(eventId?: string): Promise<Registration[]> {
  let query = supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (eventId) {
    query = query.eq('event_id', eventId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    // Try with old schema column name
    let fallbackQuery = supabase
      .from('registrations')
      .select('*')
      .order('registered_at', { ascending: false });
    
    if (eventId) {
      fallbackQuery = fallbackQuery.eq('event_id', eventId);
    }
    
    const { data: fallbackData, error: fallbackError } = await fallbackQuery;
    
    if (fallbackError) throw fallbackError;
    
    // Transform old schema to new format
    return (fallbackData || []).map(reg => ({
      ...reg,
      registration_data: {
        name: reg.name,
        email: reg.email,
        phone: reg.phone,
        ...reg.additional_info
      },
      created_at: reg.registered_at
    }));
  }
  
  return data || [];
}

// New function to fetch registrations with event details
export async function fetchRegistrationsWithEvents(eventId?: string): Promise<RegistrationWithEvent[]> {
  let query = supabase
    .from('registrations')
    .select(`
      *,
      events!inner(
        title,
        event_date,
        event_time,
        location
      )
    `)
    .order('created_at', { ascending: false });
  
  if (eventId) {
    query = query.eq('event_id', eventId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    // Try with old schema column name
    let fallbackQuery = supabase
      .from('registrations')
      .select(`
        *,
        events!inner(
          title,
          event_date,
          event_time,
          location
        )
      `)
      .order('registered_at', { ascending: false });
    
    if (eventId) {
      fallbackQuery = fallbackQuery.eq('event_id', eventId);
    }
    
    const { data: fallbackData, error: fallbackError } = await fallbackQuery;
    
    if (fallbackError) throw fallbackError;
    
    // Transform old schema to new format
    const transformedData = (fallbackData || []).map(registration => ({
      ...registration,
      registration_data: {
        name: registration.name,
        email: registration.email,
        phone: registration.phone,
        ...registration.additional_info
      },
      created_at: registration.registered_at,
      event_title: registration.events?.title,
      event_date: registration.events?.event_date,
      event_time: registration.events?.event_time,
      event_location: registration.events?.location,
    }));
    
    return transformedData;
  }
  
  // Transform the data to match our interface
  const transformedData = data?.map(registration => ({
    ...registration,
    event_title: registration.events?.title,
    event_date: registration.events?.event_date,
    event_time: registration.events?.event_time,
    event_location: registration.events?.location,
  })) || [];
  
  return transformedData;
}

export async function createRegistration(registration: Omit<Registration, 'id' | 'created_at'>): Promise<Registration> {
  // Try the new schema first (with registration_data column)
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert([registration])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    // If it fails, try the old schema (individual columns)
    if (error.message?.includes('column "registration_data" does not exist') || 
        error.message?.includes('violates row-level security policy')) {
      
      console.log('Falling back to old schema format');
      
      // Extract data from registration_data for old schema
      const { registration_data, event_id, status } = registration;
      const { name, email, phone, ...additional_info } = registration_data;
      
      const oldSchemaData = {
        event_id,
        name: name || '',
        email: email || '',
        phone: phone || '',
        additional_info: additional_info || {},
        status,
        registered_at: new Date().toISOString()
      };
      
      const { data, error: oldSchemaError } = await supabase
        .from('registrations')
        .insert([oldSchemaData])
        .select()
        .single();
      
      if (oldSchemaError) throw oldSchemaError;
      
      
      return {
        ...data,
        registration_data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          ...data.additional_info
        },
        created_at: data.registered_at
      };
    }
    
    throw error;
  }
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