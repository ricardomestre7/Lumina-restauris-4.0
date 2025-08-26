import { supabase } from '@/lib/supabaseClient';

export const saveQuantumAnalysis = async (patientId, answers, results, recommendations) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for saving quantum analysis.');
    return { error: { message: "Usuário não autenticado. Faça login novamente." } };
  }

  const { data: patientOwnerCheck, error: ownerError } = await supabase
    .from('patients')
    .select('therapist_user_id')
    .eq('id', patientId)
    .eq('therapist_user_id', user.id) 
    .single();

  if (ownerError || !patientOwnerCheck) {
    console.error('Error fetching patient or patient not found for this user:', ownerError);
    let message = "Paciente não encontrado ou você não tem permissão para este paciente.";
    if (ownerError && ownerError.code === 'PGRST116') {
        message = "Paciente não encontrado ou não pertence a você.";
    }
    return { error: { message } };
  }

  const analysisToInsert = {
    patient_id: patientId,
    answers: answers || {}, 
    results: results || {}, 
    recommendations: Array.isArray(recommendations) ? recommendations : [], 
    therapist_user_id: user.id,
  };


  const { data: newAnalysis, error } = await supabase
    .from('quantum_analyses')
    .insert([analysisToInsert])
    .select()
    .single();

  if (error) {
    console.error('Error saving quantum analysis:', error);
    return { error };
  }
  return newAnalysis;
};


export const getQuantumAnalysis = async (analysisId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for fetching quantum analysis.');
    return null;
  }

  const { data: analysis, error } = await supabase
    .from('quantum_analyses')
    .select('*')
    .eq('id', analysisId)
    .eq('therapist_user_id', user.id) 
    .single();

  if (error) {
    console.error('Error fetching quantum analysis:', error);
    if (error.code === 'PGRST116') {
        console.warn(`Analysis with ID ${analysisId} not found for user ${user.id} or RLS prevented access.`);
        return null;
    }
    return null;
  }
  return analysis;
};

export const getAllAnalysesForPatient = async (patientId) => {
  if (!patientId) {
    return { data: [], error: { message: "ID do paciente não fornecido." } };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('User not authenticated for fetching all analyses for patient.');
    return { data: [], error: { message: "Usuário não autenticado." } };
  }

  const { data: patientOwnerCheck, error: ownerError } = await supabase
    .from('patients')
    .select('id')
    .eq('id', patientId)
    .eq('therapist_user_id', user.id)
    .single();

  if (ownerError || !patientOwnerCheck) {
    console.error('User is not the owner of the patient, cannot fetch analyses:', ownerError);
    return { data: [], error: { message: "Permissão negada ou paciente não encontrado." } };
  }

  const { data: analyses, error } = await supabase
    .from('quantum_analyses')
    .select('*')
    .eq('patient_id', patientId)
    .eq('therapist_user_id', user.id) 
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all analyses for patient:', error);
    return { data: [], error };
  }
  return { data: analyses, error: null };
};

export const processAnalyses = (analyses) => {
  if (!analyses || analyses.length === 0) {
    return {
      all: [],
      current: null,
      previous: null,
    };
  }

  const sortedAnalyses = [...analyses].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const current = sortedAnalyses[0] || null;
  const previous = sortedAnalyses[1] || null;

  return {
    all: sortedAnalyses,
    current,
    previous,
  };
};

export const createShareLink = async (patientId, analysisId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: { message: "Usuário não autenticado." } };
    }

    const { data, error } = await supabase
        .from('shared_reports')
        .insert({
            patient_id: patientId,
            analysis_id: analysisId,
            therapist_user_id: user.id
        })
        .select()
        .single();
    
    if (error) {
        console.error("Error creating share link:", error);
        return { error: { message: "Falha ao criar o link de compartilhamento." } };
    }

    return { data, error: null };
};