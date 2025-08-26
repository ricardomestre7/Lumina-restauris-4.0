import * as DataManager from './dataManager';

export const quantumQuestions = DataManager.quantumQuestions;

export const getTherapists = DataManager.getTherapists;
export const saveTherapist = DataManager.saveTherapist;
export const deleteTherapist = DataManager.deleteTherapist;

export const savePatient = DataManager.savePatient;
export const getAllPatients = DataManager.getAllPatients;
export const getPatientById = DataManager.getPatientById;
export const updatePatientHasAnalysis = DataManager.updatePatientHasAnalysis;

export const saveQuantumAnalysis = DataManager.saveQuantumAnalysis;
export const getQuantumAnalysis = DataManager.getQuantumAnalysis;
export const getAllAnalysesForPatient = DataManager.getAllAnalysesForPatient;

export const calculateQuantumResults = DataManager.calculateQuantumResults;