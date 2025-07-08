import { supabase } from './supabaseClient';

export interface Training {
  id: string;
  title: string;
  description: string;
  start_date: string;
  start_time: string;
  end_date?: string;
  end_time?: string;
  location: string;
  image_url?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  max_participants: number;
  price: number;
  currency: string;
  status: 'draft' | 'published' | 'completed' | 'cancelled';
  topics: string[];
  requirements?: string[];
  instructor: string;
  instructor_bio?: string;
  registration_enabled: boolean;
  registration_fields: string[];
  certificate_provided: boolean;
  materials_included: string[];
  created_at: string;
  updated_at: string;
}

export interface TrainingRegistration {
  id: string;
  training_id: string;
  registration_data: {
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface TrainingRegistrationWithTraining extends TrainingRegistration {
  training_title?: string;
  training_start_date?: string;
  training_start_time?: string;
  training_location?: string;
}

export const fetchTrainings = async (): Promise<Training[]> => {
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    throw error;
  }

  return data || [];
};

export const fetchTrainingById = async (id: string): Promise<Training | null> => {
  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching training:', error);
    return null;
  }

  return data;
};

export const createTraining = async (training: Omit<Training, 'id' | 'created_at' | 'updated_at'>): Promise<Training> => {
  // Check if the training data contains arrays that might need to be converted
  const processedTraining = {
    ...training,
    topics: Array.isArray(training.topics) ? training.topics : [],
    requirements: Array.isArray(training.requirements) ? training.requirements : [],
    registration_fields: Array.isArray(training.registration_fields) ? training.registration_fields : [],
    materials_included: Array.isArray(training.materials_included) ? training.materials_included : [],
    // Handle empty date/time fields - convert empty strings to null
    end_date: training.end_date && training.end_date.trim() !== '' ? training.end_date : null,
    end_time: training.end_time && training.end_time.trim() !== '' ? training.end_time : null,
    instructor_bio: training.instructor_bio && training.instructor_bio.trim() !== '' ? training.instructor_bio : null,
  };

  const { data, error } = await supabase
    .from('trainings')
    .insert([processedTraining])
    .select()
    .single();

  if (error) {
    console.error('Training creation error:', error);
    throw error;
  }

  return data;
};

export const updateTraining = async (id: string, training: Partial<Training>): Promise<Training> => {
  // Process array fields to ensure they're in the correct format
  const processedTraining = { ...training };
  
  if (training.topics) {
    processedTraining.topics = Array.isArray(training.topics) ? training.topics : [];
  }
  if (training.requirements) {
    processedTraining.requirements = Array.isArray(training.requirements) ? training.requirements : [];
  }
  if (training.registration_fields) {
    processedTraining.registration_fields = Array.isArray(training.registration_fields) ? training.registration_fields : [];
  }
  if (training.materials_included) {
    processedTraining.materials_included = Array.isArray(training.materials_included) ? training.materials_included : [];
  }
  
  // Handle empty date/time fields - convert empty strings to null
  if ('end_date' in training) {
    processedTraining.end_date = training.end_date && training.end_date.trim() !== '' ? training.end_date : null;
  }
  if ('end_time' in training) {
    processedTraining.end_time = training.end_time && training.end_time.trim() !== '' ? training.end_time : null;
  }
  if ('instructor_bio' in training) {
    processedTraining.instructor_bio = training.instructor_bio && training.instructor_bio.trim() !== '' ? training.instructor_bio : null;
  }

  const { data, error } = await supabase
    .from('trainings')
    .update(processedTraining)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Training update error:', error);
    throw error;
  }

  return data;
};

export const deleteTraining = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('trainings')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};

export const createTrainingRegistration = async (registration: Omit<TrainingRegistration, 'id' | 'created_at'>): Promise<TrainingRegistration> => {
  // Try the new schema first (with registration_data column)
  try {
    const { data, error } = await supabase
      .from('training_registrations')
      .insert([registration])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error: any) {
    // If it fails, try the old schema (individual columns)
    if (error.message?.includes('column "registration_data" does not exist') || 
        error.message?.includes('violates row-level security policy')) {
      
      console.log('Falling back to old schema format for training registrations');
      
      // Extract data from registration_data for old schema
      const { registration_data, training_id, status } = registration;
      const { name, email, phone, ...additional_info } = registration_data;
      
      const oldSchemaData = {
        training_id,
        name: name || '',
        email: email || '',
        phone: phone || '',
        additional_info: additional_info || {},
        status,
        created_at: new Date().toISOString()
      };
      
      const { data, error: oldSchemaError } = await supabase
        .from('training_registrations')
        .insert([oldSchemaData])
        .select()
        .single();
      
      if (oldSchemaError) throw oldSchemaError;
      
      // Transform back to expected format
      return {
        ...data,
        registration_data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          ...data.additional_info
        }
      };
    }
    
    throw error;
  }
};

export const fetchTrainingRegistrations = async (trainingId?: string): Promise<TrainingRegistration[]> => {
  let query = supabase
    .from('training_registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (trainingId) {
    query = query.eq('training_id', trainingId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching training registrations:', error);
    return [];
  }

  // Transform data to match expected format if using old schema
  const transformedData = (data || []).map(reg => {
    if (reg.registration_data) {
      return reg; // Already in new format
    } else {
      // Transform from old format
      return {
        ...reg,
        registration_data: {
          name: reg.name,
          email: reg.email,
          phone: reg.phone,
          ...reg.additional_info
        }
      };
    }
  });

  return transformedData;
};

export const fetchTrainingRegistrationsWithTrainings = async (trainingId?: string): Promise<TrainingRegistrationWithTraining[]> => {
  let query = supabase
    .from('training_registrations')
    .select(`
      *,
      trainings!inner(
        title,
        start_date,
        start_time,
        location
      )
    `)
    .order('created_at', { ascending: false });

  if (trainingId) {
    query = query.eq('training_id', trainingId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  // Transform the data to match our interface
  const transformedData = data?.map(registration => ({
    ...registration,
    training_title: registration.trainings?.title,
    training_start_date: registration.trainings?.start_date,
    training_start_time: registration.trainings?.start_time,
    training_location: registration.trainings?.location,
  })) || [];

  return transformedData;
}; 