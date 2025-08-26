import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { ChevronLeft, Send, AlertTriangle } from 'lucide-react';
import QuantumAnalysisTabs from '@/components/quantumAnalysis/QuantumAnalysisTabs';
import QuantumAnalysisHeader from '@/components/quantumAnalysis/QuantumAnalysisHeader';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner';
import { quantumQuestions } from '@/lib/dataManager';
import { useQuantumAnalysisLogic } from '@/hooks/useQuantumAnalysisLogic';


const QuantumAnalysis = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    patient,
    answers,
    currentTab,
    setCurrentTab,
    isLoading,
    isSubmitting,
    handleAnswerChange,
    handleSubmit,
    isFormComplete, 
  } = useQuantumAnalysisLogic(patientId, toast, navigate);

  if (isLoading) return <LoadingSpinner message="Carregando análise quântica..." />;
  if (!patient) return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 dark:from-slate-800 dark:via-red-900 dark:to-slate-700 rounded-lg shadow-xl m-4"
    >
      <AlertTriangle className="w-20 h-20 text-red-500 dark:text-red-400 mb-6" />
      <h2 className="text-3xl font-bold mb-3 text-slate-800 dark:text-slate-100">Paciente Não Encontrado</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg max-w-md">
        Não foi possível carregar os dados do paciente. Verifique se o ID está correto ou tente novamente.
      </p>
      <Button 
        onClick={() => navigate('/')} 
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        Voltar ao Dashboard
      </Button>
    </motion.div>
  );

  const totalQuestions = Object.values(quantumQuestions).flat().length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="container mx-auto p-4 md:p-6 lg:p-8 bg-white dark:bg-slate-800 shadow-2xl rounded-xl border border-slate-200 dark:border-slate-700"
    >
      <QuantumAnalysisHeader patientName={patient.name} progress={progress} onBack={() => navigate('/')} />
      
      <QuantumAnalysisTabs
        questions={quantumQuestions}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isFormComplete={isFormComplete}
      />

      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-end items-center gap-4">
         <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting || !isFormComplete}
          className={`quantum-glow text-white text-lg px-10 py-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-offset-2 focus:ring-emerald-400
            ${!isFormComplete ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600'}`}
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" text="Submetendo..." />
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Submeter Análise
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default QuantumAnalysis;