import React, { useState, useEffect, useCallback } from 'react';
import { getPatientById, saveQuantumAnalysis, quantumQuestions, calculateQuantumResults } from '@/lib/dataManager';

export const useQuantumAnalysisLogic = (patientId, toast, navigate) => {
  const [patient, setPatient] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentTab, setCurrentTab] = useState(Object.keys(quantumQuestions)[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPatientData = useCallback(async () => {
    setIsLoading(true);
    try {
      const patientData = await getPatientById(patientId);
      if (patientData) {
        setPatient(patientData);
      } else {
        toast({ title: "Erro", description: "Paciente não encontrado.", variant: "destructive" });
        navigate('/');
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      toast({ title: "Erro", description: "Não foi possível carregar os dados do paciente.", variant: "destructive" });
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [patientId, toast, navigate]);

  useEffect(() => {
    fetchPatientData();
  }, [fetchPatientData]);

  const handleAnswerChange = useCallback((questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const totalQuestions = Object.values(quantumQuestions).flat().length;
  const isFormComplete = Object.keys(answers).length === totalQuestions && 
                         Object.values(answers).every(answer => answer !== undefined && answer !== "");

  const handleSubmit = async () => {
    if (!isFormComplete) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, responda todas as perguntas antes de submeter.",
        variant: "warning",
        className: "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const resultsData = calculateQuantumResults(answers);
      
      if (!resultsData || !resultsData.categories || typeof resultsData.categories !== 'object' || Object.keys(resultsData.categories).length === 0) {
        console.error("Critical Error: resultsData.categories is invalid or empty after calculation.", resultsData);
        toast({
          title: "Erro Crítico no Cálculo",
          description: "Os resultados calculados para as categorias estão inválidos ou vazios. A análise não pode ser salva. Por favor, contate o suporte.",
          variant: "destructive",
          duration: 7000
        });
        setIsSubmitting(false);
        return;
      }

      const analysisPayload = {
        answers,
        results: { 
          categories: resultsData.categories 
        },
        recommendations: resultsData.recommendations || [], 
      };
      
      const savedAnalysis = await saveQuantumAnalysis(
        patientId, 
        analysisPayload.answers, 
        analysisPayload.results, 
        analysisPayload.recommendations
      );
      
      if (savedAnalysis && !savedAnalysis.error && savedAnalysis.id) {
        toast({
          title: "Análise Quântica Salva!",
          description: `A análise para ${patient.name} foi concluída com sucesso.`,
          className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
        });
        navigate(`/results/${patientId}`);
      } else {
        throw new Error(savedAnalysis?.error?.message || "Falha ao salvar análise.");
      }
    } catch (error) {
      console.error("Error submitting analysis:", error);
      toast({
        title: "Erro ao Submeter",
        description: error.message || "Não foi possível salvar a análise quântica. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    patient,
    answers,
    currentTab,
    setCurrentTab,
    isLoading,
    isSubmitting,
    handleAnswerChange,
    handleSubmit,
    isFormComplete,
    totalQuestions,
    answeredQuestions: Object.keys(answers).length
  };
};