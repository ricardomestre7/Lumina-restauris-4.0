import React from 'react';
import { supabase } from '@/lib/supabaseClient';

export const savePatient = async (patientData) => {
  const { name, email, phone, birth_date, address, gender, profession, marital_status, therapist_id } = patientData;
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for saving patient.');
    return { error: { message: "Usuário não autenticado. Faça login novamente." } };
  }
  
  const dataToInsert = { 
    name, 
    email, 
    phone, 
    birth_date: birth_date || null, 
    address, 
    gender, 
    profession, 
    marital_status, 
    therapist_id: therapist_id || null,
    therapist_user_id: user.id 
  };
  
  const { data: newPatient, error } = await supabase
    .from('patients')
    .insert([dataToInsert])
    .select()
    .single();

  if (error) {
    console.error('Error saving patient:', error);
    return { error }; 
  }
  return newPatient;
};

export const updatePatient = async (patientId, patientData) => {
  const { name, email, phone, birth_date, address, gender, profession, marital_status, therapist_id } = patientData;
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for updating patient.');
    return { error: { message: "Usuário não autenticado. Faça login novamente." } };
  }

  const dataToUpdate = { 
    name, 
    email, 
    phone, 
    birth_date: birth_date || null, 
    address, 
    gender, 
    profession, 
    marital_status, 
    therapist_id: therapist_id || null,
    therapist_user_id: user.id 
  };
  
  const { data: updatedPatient, error } = await supabase
    .from('patients')
    .update(dataToUpdate)
    .eq('id', patientId)
    .eq('therapist_user_id', user.id) 
    .select()
    .single();

  if (error) {
    console.error('Error updating patient:', error);
    if (error.code === 'PGRST204') { 
      return { error: { message: 'Paciente não encontrado ou você não tem permissão para atualizá-lo.'} };
    }
    return { error };
  }
  return updatedPatient;
};

export const getAllPatients = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for fetching patients.');
    return { error: { message: "Usuário não autenticado. Faça login novamente." }, data: [] };
  }

  const { data: patients, error } = await supabase
    .from('patients')
    .select(`
      *,
      therapists (
        id,
        name
      ),
      patient_current_phase!patient_current_phase_patient_id_fkey (
        current_phase_number,
        phase_start_date
      )
    `)
    .eq('therapist_user_id', user.id) 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching patients:', error);
    return { error, data: [] };
  }
  
  return { 
    error: null, 
    data: patients.map(p => ({
      ...p,
      therapistName: p.therapists ? p.therapists.name : "Não atribuído",
      therapist_id_fk: p.therapists ? p.therapists.id : null, 
      current_phase_number: p.patient_current_phase && p.patient_current_phase.length > 0 ? p.patient_current_phase[0].current_phase_number : 1,
      phase_start_date: p.patient_current_phase && p.patient_current_phase.length > 0 ? p.patient_current_phase[0].phase_start_date : null,
    }))
  };
};

export const getPatientById = async (id) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for fetching patient by ID.');
    return { data: null, error: { message: 'User not authenticated.' } };
  }

  const { data: patient, error } = await supabase
    .from('patients')
    .select(`
      *,
      therapists (
        id,
        name
      )
    `)
    .eq('id', id)
    .eq('therapist_user_id', user.id) 
    .single();

  if (error) {
    console.error('Error fetching patient by ID:', error);
    if (error.code === 'PGRST116'){ 
      console.warn(`Patient with ID ${id} not found for user ${user.id} or RLS prevented access.`);
      return { data: null, error: { message: 'Patient not found.' } };
    }
    return { data: null, error };
  }
  
  return { 
    data: patient ? {
      ...patient,
      therapistName: patient.therapists ? patient.therapists.name : "Não atribuído",
      therapist_id_fk: patient.therapists ? patient.therapists.id : null, 
    } : null,
    error: null
  };
};

export const getPatientCurrentPhase = async (patientId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: { message: 'User not authenticated.' } };
  }

  const { data, error } = await supabase
    .from('patient_current_phase')
    .select('*')
    .eq('patient_id', patientId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching patient current phase:', error);
    return { data: null, error };
  }
  
  if (!data) {
    return { data: { current_phase_number: 1, phase_start_date: null, id: null }, error: null };
  }

  return { data, error: null };
};


export const updatePatientHasAnalysis = async (patientId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for updating patient has_analysis.');
    return { error: { message: "Usuário não autenticado. Faça login novamente." } };
  }

  const { error } = await supabase
    .from('patients')
    .update({ has_analysis: true })
    .eq('id', patientId)
    .eq('therapist_user_id', user.id); 

  if (error) {
    console.error('Error updating patient has_analysis:', error);
    if (error.code === 'PGRST204') {
      return { error: { message: 'Paciente não encontrado ou você não tem permissão para atualizá-lo.'} };
    }
    return { error };
  }
  return { error: null };
};

export const updatePatientCurrentPhase = async (current_phase_id_pk, newPhaseNumber) => {
  if (!current_phase_id_pk || !newPhaseNumber) {
    return { data: null, error: { message: 'ID da fase e novo número da fase são obrigatórios.'} };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: { message: "Usuário não autenticado." } };
  }

  const { data, error } = await supabase
    .from('patient_current_phase')
    .update({ 
      current_phase_number: newPhaseNumber,
      phase_start_date: new Date().toISOString() 
    })
    .eq('id', current_phase_id_pk)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating patient phase:', error);
    return { data: null, error };
  }
  return { data, error: null };
};

export const deletePatientById = async (patientId) => {
  if (!patientId) {
    const errorMsg = 'ID do paciente é obrigatório para exclusão.';
    console.error(errorMsg);
    return { error: { message: errorMsg } };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for deleting patient.');
    return { error: { message: "Usuário não autenticado. Faça login novamente." } };
  }

  try {
    const { data: patient, error: patientFetchError } = await supabase
      .from('patients')
      .select('id')
      .eq('id', patientId)
      .eq('therapist_user_id', user.id)
      .single();

    if (patientFetchError || !patient) {
      console.error('Error fetching patient or patient not found/not owned by user:', patientFetchError);
      let message = 'Paciente não encontrado ou você não tem permissão para excluí-lo.';
      if (patientFetchError && patientFetchError.code === 'PGRST116') {
        message = 'Paciente não encontrado para este usuário.';
      }
      throw new Error(message);
    }

    const { error: analysesError } = await supabase
      .from('quantum_analyses')
      .delete()
      .eq('patient_id', patientId)
      .eq('therapist_user_id', user.id); 

    if (analysesError) {
      console.error('Supabase error deleting patient analyses:', analysesError);
      throw new Error(`Falha ao excluir análises: ${analysesError.message} (Code: ${analysesError.code})`);
    }

    const { error: phaseError } = await supabase
      .from('patient_current_phase')
      .delete()
      .eq('patient_id', patientId);

    if (phaseError) {
      console.error('Supabase error deleting patient current phase:', phaseError);
      throw new Error(`Falha ao excluir fase atual: ${phaseError.message} (Code: ${phaseError.code})`);
    }
    
    const { error: patientError } = await supabase
      .from('patients')
      .delete()
      .eq('id', patientId)
      .eq('therapist_user_id', user.id); 

    if (patientError) {
      console.error('Supabase error deleting patient record:', patientError);
      throw new Error(`Falha ao excluir paciente: ${patientError.message} (Code: ${patientError.code})`);
    }

    return { error: null };
  } catch (error) {
    console.error('Failed to delete patient and related data:', error);
    return { error: { message: error.message || 'Erro desconhecido ao excluir paciente e dados relacionados.', details: error.details || error } };
  }
};