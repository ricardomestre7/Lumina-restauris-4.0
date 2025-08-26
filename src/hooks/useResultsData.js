import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatientById, getAllAnalysesForPatient } from '@/lib/data';
import { useToast } from '@/components/ui/use-toast';

export const useResultsData = (patientId) => {
  const [patient, setPatient] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [historicalAnalyses, setHistoricalAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const patientData = getPatientById(patientId);

    if (!patientData) {
      toast({
        title: "Paciente não encontrado",
        description: "O paciente solicitado não foi encontrado.",
        variant: "destructive"
      });
      navigate('/');
      setLoading(false);
      return;
    }
    setPatient(patientData);

    const allAnalyses = getAllAnalysesForPatient(patientId);
    setHistoricalAnalyses(allAnalyses);

    if (allAnalyses.length > 0) {
      const latestAnalysis = allAnalyses[allAnalyses.length - 1];
      if (latestAnalysis && latestAnalysis.results) {
        setCurrentAnalysis(latestAnalysis);
      } else {
        // This case might indicate an issue or an analysis was saved without results.
        // For now, we'll assume an analysis always has results if it exists.
        // If it's possible for an analysis to be saved without results, this logic needs adjustment.
        toast({
          title: "Análise mais recente inválida",
          description: "A análise mais recente não pôde ser carregada. Redirecionando para nova análise.",
          variant: "destructive"
        });
        navigate(`/quantum-analysis/${patientId}`);
        setLoading(false);
        return;
      }
    } else {
      toast({
        title: "Nenhuma análise encontrada",
        description: "Este paciente ainda não possui uma análise quântica. Redirecionando para nova análise.",
        variant: "destructive"
      });
      navigate(`/quantum-analysis/${patientId}`);
      setLoading(false);
      return;
    }
    
    setLoading(false);
  }, [patientId, navigate, toast]);

  return { patient, currentAnalysis, historicalAnalyses, loading };
};