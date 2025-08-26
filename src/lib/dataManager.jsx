import { 
  quantumQuestions as questions, 
  generateRecommendations as genRecs 
} from '@/lib/analysisUtils';

import { 
  getTherapists as getTherapistsSupabase,
  saveTherapist as saveTherapistSupabase,
  updateTherapist as updateTherapistSupabase,
  deleteTherapist as deleteTherapistSupabase
} from '@/lib/therapistUtils';

import {
  savePatient as savePatientSupabase,
  updatePatient as updatePatientSupabase,
  getAllPatients as getAllPatientsSupabase,
  getPatientById as getPatientByIdSupabase,
  updatePatientHasAnalysis as updatePatientHasAnalysisSupabase,
  getPatientCurrentPhase as getPatientCurrentPhaseSupabase,
  updatePatientCurrentPhase as updatePatientCurrentPhaseSupabase,
  deletePatientById as deletePatientByIdSupabase
} from '@/lib/patientDataUtils';

import {
  saveQuantumAnalysis as saveQuantumAnalysisSupabase,
  getQuantumAnalysis as getQuantumAnalysisSupabase,
  getAllAnalysesForPatient as getAllAnalysesForPatientSupabase,
  createShareLink as createShareLinkSupabase
} from '@/lib/analysisDataUtils';

import {
  saveJournalEntry as saveJournalEntrySupabase,
  getJournalEntriesForPatient as getJournalEntriesForPatientSupabase,
  getJournalEntryById as getJournalEntryByIdSupabase,
  updateJournalEntry as updateJournalEntrySupabase,
  deleteJournalEntry as deleteJournalEntrySupabase
} from '@/lib/journalUtils';

export const quantumQuestions = questions;

export const getTherapists = getTherapistsSupabase;
export const saveTherapist = saveTherapistSupabase;
export const updateTherapist = updateTherapistSupabase;
export const deleteTherapist = deleteTherapistSupabase;

export const savePatient = savePatientSupabase;
export const updatePatient = updatePatientSupabase;
export const getAllPatients = getAllPatientsSupabase;
export const getPatientById = getPatientByIdSupabase;
export const updatePatientHasAnalysis = updatePatientHasAnalysisSupabase;
export const getPatientCurrentPhase = getPatientCurrentPhaseSupabase;
export const updatePatientCurrentPhase = updatePatientCurrentPhaseSupabase;
export const updatePatientPhase = updatePatientCurrentPhaseSupabase; // Alias for backward compatibility if needed
export const deletePatientById = deletePatientByIdSupabase;

export const saveQuantumAnalysis = saveQuantumAnalysisSupabase;
export const getQuantumAnalysis = getQuantumAnalysisSupabase;
export const getAllAnalysesForPatient = getAllAnalysesForPatientSupabase;
export const getAnalysesByPatientId = getAllAnalysesForPatientSupabase;
export const createShareLink = createShareLinkSupabase;

export const saveJournalEntry = saveJournalEntrySupabase;
export const getJournalEntriesForPatient = getJournalEntriesForPatientSupabase;
export const getJournalEntryById = getJournalEntryByIdSupabase;
export const updateJournalEntry = updateJournalEntrySupabase;
export const deleteJournalEntry = deleteJournalEntrySupabase;

export const calculateQuantumResults = (answers) => {
  const categories = {
    energetico: 0,
    emocional: 0,
    mental: 0,
    fisico: 0,
    espiritual: 0
  };
  
  let questionCountPerCategory = {};
  Object.keys(questions).forEach(cat => {
    questionCountPerCategory[cat] = questions[cat].length;
  });

  Object.entries(answers).forEach(([questionId, value]) => {
    const category = questionId.split('_')[0];
    if (categories.hasOwnProperty(category) && value) {
      categories[category] += parseInt(value, 10);
    }
  });
  
  const normalizedResults = {};
  Object.entries(categories).forEach(([category, value]) => {
    const maxScoreForCategory = questionCountPerCategory[category] * 5; 
    normalizedResults[category] = maxScoreForCategory > 0 ? Math.round((value / maxScoreForCategory) * 100) : 0;
  });
  
  const recommendations = genRecs(normalizedResults, answers);
  
  return {
    categories: normalizedResults,
    recommendations,
    timestamp: new Date().toISOString()
  };
};