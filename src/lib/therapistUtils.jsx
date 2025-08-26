import { supabase } from './supabaseClient';
import { getCurrentUser } from './authUtils';

export const getTherapists = async () => {
  const user = await getCurrentUser();
  if (!user) {
    console.error("No user logged in");
    return { data: [], error: { message: "Usuário não autenticado." } };
  }
  const userId = user.id;

  try {
    const { data, error } = await supabase
      .from('therapists')
      .select('*')
      .eq('owner_user_id', userId) 
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching therapists:', error);
      return { data: null, error };
    }
    return { data, error: null };
  } catch (error) {
    console.error('Catch block error fetching therapists:', error);
    return { data: null, error: { message: error.message || "Erro desconhecido ao buscar terapeutas." } };
  }
};


export const saveTherapist = async (therapistData) => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Usuário não autenticado.", therapist: null };
  
  const dataToSave = {
    ...therapistData,
    owner_user_id: user.id 
  };

  const { data, error } = await supabase
    .from('therapists')
    .insert([dataToSave])
    .select()
    .single();

  if (error) {
    console.error('Error saving therapist:', error);
    return { success: false, message: error.message, therapist: null };
  }
  return { success: true, message: 'Terapeuta salvo com sucesso!', therapist: data };
};

export const updateTherapist = async (id, therapistData) => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Usuário não autenticado.", therapist: null };

  const dataToUpdate = { ...therapistData };
  
  const { data, error } = await supabase
    .from('therapists')
    .update(dataToUpdate)
    .eq('id', id)
    .eq('owner_user_id', user.id) 
    .select()
    .single();

  if (error) {
    console.error('Error updating therapist:', error);
    return { success: false, message: error.message, therapist: null };
  }
  return { success: true, message: 'Terapeuta atualizado com sucesso!', therapist: data };
};

export const deleteTherapist = async (id) => {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Usuário não autenticado."};

  const { error } = await supabase
    .from('therapists')
    .delete()
    .eq('id', id)
    .eq('owner_user_id', user.id);

  if (error) {
    console.error('Error deleting therapist:', error);
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Terapeuta removido com sucesso!' };
};