import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, displayName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  });
  
  if (error) throw error;
  return data.user;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data.user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Database helpers
export const createUserProfile = async (userId: string, userData: any) => {
  const { error } = await supabase
    .from('users')
    .upsert({
      id: userId,
      ...userData,
      updated_at: new Date().toISOString()
    });
  
  if (error) throw error;
  return true;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

// Storage helpers
export const uploadFile = async (userId: string, file: File, folder: string = 'files') => {
  const filePath = `${userId}/${folder}/${Date.now()}_${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('user-files')
    .upload(filePath, file);
  
  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('user-files')
    .getPublicUrl(filePath);
  
  return {
    filePath,
    fileUrl: publicUrl,
    fileName: file.name,
    contentType: file.type,
    size: file.size
  };
};

export const deleteFile = async (filePath: string) => {
  const { error } = await supabase.storage
    .from('user-files')
    .remove([filePath]);
  
  if (error) throw error;
  return true;
};

export const listUserFiles = async (userId: string, folder: string = 'files') => {
  const { data, error } = await supabase.storage
    .from('user-files')
    .list(`${userId}/${folder}`);
  
  if (error) throw error;
  
  return Promise.all(data.map(async (file) => {
    const { data: { publicUrl } } = supabase.storage
      .from('user-files')
      .getPublicUrl(file.name);
      
    return {
      name: file.name,
      fullPath: `${userId}/${folder}/${file.name}`,
      url: publicUrl
    };
  }));
};