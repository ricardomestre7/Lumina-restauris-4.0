import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, AlertCircle, Loader2 } from 'lucide-react';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner';
import ErrorView from '@/components/results/ErrorView';
import ResultsView from '@/components/results/ResultsView';
import { getAllPatients } from '@/lib/dataManager';
import { useResultsPageLogic } from '@/hooks/useResultsPageLogic';
import NoAnalysisView from '@/components/results/NoAnalysisView';

const ReportsPage = () => {
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [isListLoading, setIsListLoading] = useState(true);
  const [listError, setListError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const patientIdFromUrl = searchParams.get('patientId');
    if (patientIdFromUrl) {
      setSelectedPatientId(patientIdFromUrl);
    }
  }, [location.search]);

  const fetchPatientsList = useCallback(async () => {
    setIsListLoading(true);
    setListError(null);
    try {
      const response = await getAllPatients();
      if (response.error) throw new Error(response.error.message);
      setPatientsList(response.data || []);
    } catch (error) {
      console.error("Error fetching patients list:", error);
      setListError("Não foi possível carregar a lista de pacientes.");
      toast({ title: "Erro", description: "Falha ao buscar pacientes para os relatórios.", variant: "destructive" });
    } finally {
      setIsListLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPatientsList();
  }, [fetchPatientsList]);

  const handlePatientSelect = (patientId) => {
    setSelectedPatientId(patientId);
    navigate(`/reports?patientId=${patientId}`, { replace: true });
  };
  
  const {
    patient,
    currentAnalysis,
    previousAnalysis,
    allAnalyses,
    isLoading: isResultsLoading,
    error: resultsError,
    currentPhaseNumber,
    phaseStartDate,
    currentPhaseIdPk,
    handlePhaseUpdate,
    handlePrint,
    handleShare,
  } = useResultsPageLogic(selectedPatientId, toast, navigate); 

  const handleBackToSelection = () => {
      setSelectedPatientId(null);
      navigate('/reports', { replace: true });
  }

  const renderContent = () => {
    if (!selectedPatientId) {
      return (
        <div className="text-center py-20 border-2 border-dashed rounded-lg mt-8 print-hide">
          <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <p className="mt-4 text-lg text-muted-foreground">Selecione um paciente acima para começar.</p>
        </div>
      );
    }
    
    if (isResultsLoading) {
      return <LoadingSpinner message="Gerando relatório do paciente..." />;
    }

    if (resultsError) {
      return <ErrorView message={resultsError} onBack={handleBackToSelection} backButtonText="Escolher Outro Paciente" />;
    }

    if (!patient) {
      return <ErrorView message="Não foi possível carregar os dados do paciente." onBack={handleBackToSelection} backButtonText="Escolher Outro Paciente" />;
    }
    
    if (allAnalyses.length === 0) {
      return (
        <NoAnalysisView
          patient={patient}
          currentPhaseNumber={currentPhaseNumber}
          phaseStartDate={phaseStartDate}
          currentPhaseIdPk={currentPhaseIdPk}
          onPhaseUpdate={handlePhaseUpdate}
          onBack={handleBackToSelection}
          onStartNewAnalysis={() => navigate(`/quantum-analysis/${selectedPatientId}`)}
        />
      );
    }
    
    if (!currentAnalysis) {
      return (
        <div className="text-center p-8 mt-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 print-no-break">
          <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-200">Análise Incompleta</h3>
          <p className="text-muted-foreground mt-2">
            A análise mais recente deste paciente parece estar corrompida ou incompleta.
          </p>
          <Button className="mt-4 print-hide" onClick={() => navigate(`/quantum-analysis/${selectedPatientId}`)}>
            Iniciar Nova Análise
          </Button>
        </div>
      );
    }

    return (
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
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
          onBack={handleBackToSelection}
        />
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8"
    >
      <header className="mb-8 print-hide">
        <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 print-title">
          Central de Relatórios
        </h1>
        <p className="text-lg text-muted-foreground mt-1">
          Selecione um paciente para gerar e visualizar relatórios detalhados.
        </p>
      </header>
      
      <Card className="quantum-card shadow-lg mb-8 print-hide">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Selecionar Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isListLoading ? (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Carregando lista de pacientes...</span>
            </div>
          ) : listError ? (
            <p className="text-red-500">{listError}</p>
          ) : (
            <Select onValueChange={handlePatientSelect} value={selectedPatientId || ""}>
              <SelectTrigger className="w-full md:w-[400px] text-base py-3">
                <SelectValue placeholder="Escolha um paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patientsList.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.name} ({p.email || 'Sem e-mail'})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>
      
      <div className="print-container">
        {renderContent()}
      </div>

    </motion.div>
  );
};

export default ReportsPage;