import { useState, useEffect, useCallback } from 'react';
import { getPatientById, getAllAnalysesForPatient, getPatientCurrentPhase, createShareLink } from '@/lib/dataManager';
import { processAnalyses } from '@/lib/analysisDataUtils';
import html2pdf from 'html2pdf.js';

export const useResultsPageLogic = (patientId, toast, navigate) => {
  const [patient, setPatient] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [previousAnalysis, setPreviousAnalysis] = useState(null);
  const [allAnalyses, setAllAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPhaseNumber, setCurrentPhaseNumber] = useState(null);
  const [phaseStartDate, setPhaseStartDate] = useState(null);
  const [currentPhaseIdPk, setCurrentPhaseIdPk] = useState(null);


  const fetchData = useCallback(async () => {
    if (!patientId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPatient(null);
    setCurrentAnalysis(null);
    setPreviousAnalysis(null);
    setAllAnalyses([]);
    
    try {
      const patientResponse = await getPatientById(patientId);
      if (patientResponse.error || !patientResponse.data) {
        throw new Error(patientResponse.error?.message || "Paciente não encontrado.");
      }
      setPatient(patientResponse.data);

      const analysesResponse = await getAllAnalysesForPatient(patientId);
      if (analysesResponse.error) {
        throw new Error(analysesResponse.error.message);
      }
      
      const processed = processAnalyses(analysesResponse.data || []);
      setAllAnalyses(processed.all);
      setCurrentAnalysis(processed.current);
      setPreviousAnalysis(processed.previous);
      
      const phaseResponse = await getPatientCurrentPhase(patientId);
      if(phaseResponse.data){
          setCurrentPhaseNumber(phaseResponse.data.current_phase_number);
          setPhaseStartDate(phaseResponse.data.phase_start_date);
          setCurrentPhaseIdPk(phaseResponse.data.id);
      }

    } catch (err) {
      console.error("Error loading results page data:", err);
      setError(err.message || "Ocorreu um erro ao carregar os dados.");
      toast({
        title: "Erro ao Carregar",
        description: err.message || "Não foi possível carregar os detalhes do paciente e suas análises.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [patientId, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePhaseUpdate = (newPhaseData) => {
    setCurrentPhaseNumber(newPhaseData.current_phase_number);
    setPhaseStartDate(newPhaseData.phase_start_date);
    toast({
        title: "Fase Atualizada!",
        description: `Paciente agora está na fase ${newPhaseData.current_phase_number}.`,
        className: "bg-green-100 dark:bg-green-800",
    });
  };

  const handlePrint = useCallback(() => {
    if (!patient) return;

    const element = document.getElementById('pdf-content');
    if (!element) {
        toast({
            title: "Erro de Impressão",
            description: "Não foi possível encontrar o conteúdo para gerar o PDF.",
            variant: "destructive",
        });
        return;
    }

    const opt = {
      margin:       [0.5, 0.5, 0.5, 0.5],
      filename:     `relatorio_lumina_restauris_${patient.name.replace(/\s+/g, '_').toLowerCase()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, logging: false, useCORS: true, letterRendering: true, scrollY: -window.scrollY },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css'], before: '.print-page-break' }
    };

    toast({
      title: "Gerando PDF...",
      description: "O seu relatório está sendo preparado para download.",
    });

    html2pdf().from(element).set(opt).save();

  }, [patient, toast]);

  const handleShare = useCallback(async () => {
    if (!patient || !currentAnalysis) {
      toast({ title: "Erro", description: "Dados insuficientes para compartilhar.", variant: "destructive" });
      return;
    }

    toast({ title: "Gerando Link...", description: "Aguarde enquanto criamos um link seguro para compartilhamento." });

    const result = await createShareLink(patient.id, currentAnalysis.id);

    if (result.error) {
        toast({ title: "Erro ao compartilhar", description: result.error.message, variant: "destructive" });
        return;
    }

    const shareToken = result.data.id;
    const reportUrl = `${window.location.origin}/share/report/${shareToken}`;
    
    try {
      await navigator.clipboard.writeText(reportUrl);
      toast({ 
          title: "Link Copiado!", 
          description: "O link de compartilhamento foi copiado para sua área de transferência.",
          className: "bg-green-500 text-white dark:bg-green-600",
      });
    } catch (error) {
      console.error('Error copying to clipboard', error);
      toast({ title: "Erro ao copiar", description: "Não foi possível copiar o link.", variant: "destructive" });
    }
  }, [patient, currentAnalysis, toast]);


  return {
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
    refetchData: fetchData,
  };
};