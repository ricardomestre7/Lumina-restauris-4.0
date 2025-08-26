import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileText, BarChartHorizontal, TrendingUp, ActivitySquare } from 'lucide-react';

import ResultsHeader from '@/components/results/ResultsHeader';
import PatientDetailsCard from '@/components/results/PatientDetailsCard';
import AnalysisInfoCard from '@/components/results/AnalysisInfoCard';
import QuantumCharts from '@/components/results/QuantumCharts';
import PersonalizedRecommendations from '@/components/results/PersonalizedRecommendations';
import ResultsActions from '@/components/results/ResultsActions';
import EvolutionChart from '@/components/results/EvolutionChart';
import PatientPhaseManager from '@/components/results/PatientPhaseManager';
import ComparativeBarChart from '@/components/results/ComparativeBarChart';
import OverallProgressChart from '@/components/results/OverallProgressChart';

const ResultsView = ({
  patient,
  currentAnalysis,
  previousAnalysis,
  allAnalyses,
  currentPhaseNumber,
  phaseStartDate,
  currentPhaseIdPk,
  onPhaseUpdate,
  onPrint,
  onShare,
  onBack,
}) => {
  const hasValidCurrentAnalysis = currentAnalysis && currentAnalysis.results && currentAnalysis.results.categories && Object.keys(currentAnalysis.results.categories).length > 0;
  const hasHistoryForEvolution = allAnalyses && allAnalyses.length > 1 && allAnalyses.some(a => a?.results?.categories && Object.keys(a.results.categories).length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-4 md:p-8 print:p-0"
    >
      <ResultsHeader patientName={patient.name} onBack={onBack} />

      <div className="flex justify-end mb-6 print-hide">
        <ResultsActions onPrint={onPrint} onShare={onShare} patientId={patient.id} showPrintShare={true} />
      </div>
      
      <div id="pdf-content">
        <div className="print-card mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <PatientDetailsCard patient={patient} currentPhaseNumber={currentPhaseNumber} phaseStartDate={phaseStartDate} />
            </div>
            <div className="flex flex-col gap-6 print-hide">
              <PatientPhaseManager 
                patientId={patient.id} 
                currentPhaseIdPk={currentPhaseIdPk}
                currentPhaseNumber={currentPhaseNumber}
                onPhaseUpdate={onPhaseUpdate}
              />
            </div>
          </div>
        </div>

        {currentAnalysis && (
          <div className="print-page-break">
            <Card className="quantum-card shadow-xl my-8 border border-border/50 print-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 flex items-center print-title">
                  <FileText size={28} className="mr-3 text-indigo-500" />
                  Análise Mais Recente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    <AnalysisInfoCard 
                      analysisResults={currentAnalysis.results} 
                      analysisDate={currentAnalysis.created_at} 
                      analysisId={currentAnalysis.id ? currentAnalysis.id.substring(0, 8) : 'N/A'} 
                    />
                    {currentAnalysis.recommendations && (
                      <PersonalizedRecommendations recommendations={currentAnalysis.recommendations} />
                    )}
                  </div>
                  <div className="lg:col-span-3">
                    {hasValidCurrentAnalysis ? (
                      <QuantumCharts analysisData={currentAnalysis} />
                    ) : (
                      <div className="text-center py-8 my-4 bg-amber-50 dark:bg-amber-900/30 p-6 rounded-lg border border-amber-300 dark:border-amber-700 h-full flex flex-col justify-center">
                        <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 dark:text-amber-400 mb-3" />
                        <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300 mb-2">Gráfico Indisponível</h3>
                        <p className="text-amber-600 dark:text-amber-400">
                          Os dados da análise mais recente estão incompletos para gerar o gráfico de radar. 
                          Pode ser necessário realizar uma nova análise.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {currentAnalysis && (
          <div className="print-page-break">
            <Card className="quantum-card shadow-xl my-8 border border-border/50 print-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 flex items-center print-title">
                  <BarChartHorizontal size={28} className="mr-3 text-green-500" />
                  Comparativo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <ComparativeBarChart currentAnalysis={currentAnalysis} previousAnalysis={previousAnalysis} />
              </CardContent>
            </Card>
          </div>
        )}
        
        {hasHistoryForEvolution && (
          <div className="print-page-break">
            <Card className="quantum-card shadow-xl my-8 border border-border/50 print-card">
              <CardHeader>
                 <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 flex items-center print-title">
                  <TrendingUp size={28} className="mr-3 text-blue-500" />
                  Evolução por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <EvolutionChart historyData={allAnalyses} />
              </CardContent>
            </Card>
          </div>
        )}

        {hasHistoryForEvolution && (
          <div className="print-page-break">
            <Card className="quantum-card shadow-xl my-8 border border-border/50 print-card">
              <CardHeader>
                 <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 dark:from-pink-400 dark:to-orange-400 flex items-center print-title">
                  <ActivitySquare size={28} className="mr-3 text-pink-500" />
                  Progresso Geral do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <OverallProgressChart historyData={allAnalyses} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultsView;