import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner';
import { useResultsPageLogic } from '@/hooks/useResultsPageLogic'; 
import ResultsView from '@/components/results/ResultsView';
import NoAnalysisView from '@/components/results/NoAnalysisView';
import ErrorView from '@/components/results/ErrorView';


const ResultsPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    patient,
    currentAnalysis,
    previousAnalysis, 
    allAnalyses,
    isLoading,
    error,
    currentPhaseNumber,
    phaseStartDate,
    currentPhaseIdPk,
    handlePhaseUpdate,
    handlePrint,
    handleShare,
  } = useResultsPageLogic(patientId, toast, navigate);

  if (isLoading) return <LoadingSpinner message="Carregando resultados quânticos..." />;

  if (error) {
    return <ErrorView message={error} onBack={() => navigate('/')} />;
  }

  if (!patient) {
    // This case should ideally be handled by the error state, but as a fallback:
    return <ErrorView message="Paciente não encontrado. Verifique o ID ou retorne ao início." onBack={() => navigate('/')} />;
  }
  
  if (allAnalyses.length === 0) {
    return (
      <NoAnalysisView
        patient={patient}
        currentPhaseNumber={currentPhaseNumber}
        phaseStartDate={phaseStartDate}
        currentPhaseIdPk={currentPhaseIdPk}
        onPhaseUpdate={handlePhaseUpdate}
        onBack={() => navigate('/')}
        onStartNewAnalysis={() => navigate(`/quantum-analysis/${patientId}`)}
      />
    );
  }
  
  if (!currentAnalysis) {
    return <ErrorView 
              message="A análise mais recente parece estar incompleta ou corrompida. Por favor, tente realizar uma nova análise ou contate o suporte." 
              onBack={() => navigate(`/quantum-analysis/${patientId}`)} 
              backButtonText="Nova Análise" 
            />;
  }

  return (
    <ResultsView
      patient={patient}
      currentAnalysis={currentAnalysis} 
      previousAnalysis={previousAnalysis}
      allAnalyses={allAnalyses}
      currentPhaseNumber={currentPhaseNumber}
      phaseStartDate={phaseStartDate}
      currentPhaseIdPk={currentPhaseIdPk}
      onPhaseUpdate={handlePhaseUpdate}
      onPrint={handlePrint}
      onShare={handleShare}
      onBack={() => navigate('/')}
    />
  );
};

export default ResultsPage;