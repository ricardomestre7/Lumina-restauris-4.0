import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronLeft, Sparkles } from 'lucide-react';
import ResultsHeader from '@/components/results/ResultsHeader';
import PatientDetailsCard from '@/components/results/PatientDetailsCard';
import PatientPhaseManager from '@/components/results/PatientPhaseManager';
import { motion } from 'framer-motion';

const NoAnalysisView = ({
  patient,
  currentPhaseNumber,
  phaseStartDate,
  currentPhaseIdPk,
  onPhaseUpdate,
  onBack,
  onStartNewAnalysis
}) => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <ResultsHeader patientName={patient.name} onBack={onBack} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8 w-full">
        <div className="lg:col-span-2">
          <PatientDetailsCard patient={patient} currentPhaseNumber={currentPhaseNumber} phaseStartDate={phaseStartDate} />
        </div>
        <PatientPhaseManager 
            patientId={patient.id} 
            currentPhaseIdPk={currentPhaseIdPk}
            currentPhaseNumber={currentPhaseNumber}
            onPhaseUpdate={onPhaseUpdate}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center p-8 mt-8 rounded-2xl shadow-2xl bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-slate-800 dark:via-amber-900/30 dark:to-slate-800 border border-amber-200 dark:border-amber-800"
      >
        <AlertTriangle className="w-16 h-16 text-amber-500 mb-6 mx-auto" />
        <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-300 mb-3">Nenhuma Análise Encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Este paciente ainda não possui uma análise quântica registrada. Inicie a primeira medição para revelar os insights do campo energético.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onBack} variant="outline" className="w-full sm:w-auto">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Button>
          <Button onClick={onStartNewAnalysis} className="w-full sm:w-auto quantum-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
            <Sparkles className="mr-2 h-4 w-4" />
            Iniciar Nova Análise
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NoAnalysisView;