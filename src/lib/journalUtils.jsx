import { supabase } from './supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

export const saveJournalEntry = async (entryData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated for saving journal entry");
    return { error: { message: "Usuário não autenticado." } };
  }

  if (!entryData.patient_id) {
    console.error("Patient ID is required for saving journal entry");
    return { error: { message: "ID do Paciente é obrigatório." } };
  }

  const dataToSave = {
    ...entryData,
    therapist_user_id: user.id,
  };

  const { data, error } = await supabase
    .from('journal_entries')
    .insert(dataToSave)
    .select()
    .single();

  if (error) {
    console.error('Error saving journal entry:', error);
    return { error };
  }
  return data;
};

export const getJournalEntriesForPatient = async (patientId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated for fetching journal entries");
    return { error: { message: "Usuário não autenticado." }, data: [] };
  }

  if (!patientId) {
    console.error("Patient ID is required for fetching journal entries");
    return { error: { message: "ID do Paciente é obrigatório." }, data: [] };
  }

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('patient_id', patientId)
    .eq('therapist_user_id', user.id)
    .order('entry_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching journal entries:', error);
    return { error, data: [] };
  }
  return { data, error: null };
};

export const getJournalEntryById = async (entryId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated for fetching journal entry");
    return { error: { message: "Usuário não autenticado." } };
  }
  
  if (!entryId) {
    console.error("Entry ID is required for fetching journal entry");
    return { error: { message: "ID da Entrada é obrigatório." } };
  }

  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('id', entryId)
    .eq('therapist_user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching journal entry by ID:', error);
    return { error };
  }
  return data;
};


export const updateJournalEntry = async (entryId, updateData) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated for updating journal entry");
    return { error: { message: "Usuário não autenticado." } };
  }

  if (!entryId) {
    console.error("Entry ID is required for updating journal entry");
    return { error: { message: "ID da Entrada é obrigatório." } };
  }
  
  const dataToUpdate = {
    ...updateData,
    updated_at: new Date().toISOString(), 
  };

  const { data, error } = await supabase
    .from('journal_entries')
    .update(dataToUpdate)
    .eq('id', entryId)
    .eq('therapist_user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating journal entry:', error);
    return { error };
  }
  return data;
};

export const deleteJournalEntry = async (entryId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated for deleting journal entry");
    return { error: { message: "Usuário não autenticado." } };
  }
  
  if (!entryId) {
    console.error("Entry ID is required for deleting journal entry");
    return { error: { message: "ID da Entrada é obrigatório." } };
  }

  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', entryId)
    .eq('therapist_user_id', user.id);

  if (error) {
    console.error('Error deleting journal entry:', error);
    return { error };
  }
  return { success: true };
};