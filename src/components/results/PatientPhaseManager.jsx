import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, CheckCircle, ArrowRightCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { updatePatientCurrentPhase } from '@/lib/dataManager';
import { motion } from 'framer-motion';

const phaseOptions = [
  { value: 1, label: "Fase 1: Liberação" },
  { value: 2, label: "Fase 2: Regeneração" },
  { value: 3, label: "Fase 3: Equilíbrio" },
  { value: 4, label: "Fase 4: Vitalidade" },
  { value: 5, label: "Fase 5: Integração" },
  { value: 6, label: "Fase 6: Autonomia" },
];

const PatientPhaseManager = ({ patientId, currentPhaseIdPk, currentPhaseNumber: initialPhaseNumber, onPhaseUpdate }) => {
  const [selectedPhase, setSelectedPhase] = useState(initialPhaseNumber || 1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setSelectedPhase(initialPhaseNumber || 1);
  }, [initialPhaseNumber]);

  const handlePhaseChange = (value) => {
    setSelectedPhase(parseInt(value));
  };

  const handleSubmitPhaseUpdate = async () => {
    if (!currentPhaseIdPk) {
      toast({
        title: "Erro",
        description: "ID da fase do paciente não encontrado. Não é possível atualizar.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPhase === initialPhaseNumber) {
      toast({
        title: "Nenhuma Alteração",
        description: "A fase selecionada é a mesma fase atual do paciente.",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const { data: updatedPhaseData, error } = await updatePatientCurrentPhase(currentPhaseIdPk, selectedPhase);

      if (error) {
        throw error;
      }
      
      if (updatedPhaseData) {
        toast({
          title: "Fase Atualizada!",
          description: `Paciente movido para ${phaseOptions.find(p => p.value === selectedPhase)?.label}.`,
          className: "bg-green-500 text-white dark:bg-green-700",
        });
        if (onPhaseUpdate) {
          onPhaseUpdate(selectedPhase);
        }
      } else {
        throw new Error("Falha ao atualizar a fase do paciente. Resposta vazia do servidor.");
      }
    } catch (error) {
      console.error("Error updating patient phase:", error);
      toast({
        title: "Erro ao Atualizar Fase",
        description: error.message || "Não foi possível atualizar a fase do paciente. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full print-hide"
    >
      <Card className="quantum-card shadow-lg bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 dark:from-slate-800 dark:via-slate-800 dark:to-gray-900 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 print-title">
            <Zap className="h-6 w-6" />
            Gerenciar Fase Terapêutica
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Atualize a fase atual do paciente no protocolo Lumina Restauris.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col justify-between h-full pb-6">
          <div>
            <label htmlFor="phase-select" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Fase do Paciente:
            </label>
            <Select value={selectedPhase.toString()} onValueChange={handlePhaseChange}>
              <SelectTrigger id="phase-select" className="w-full py-3 text-base rounded-lg shadow-sm border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:ring-purple-500 focus:border-purple-500">
                <SelectValue placeholder="Selecione uma fase" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-700">
                {phaseOptions.map(phase => (
                  <SelectItem key={phase.value} value={phase.value.toString()} className="hover:bg-purple-50 dark:hover:bg-slate-600">
                    {phase.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleSubmitPhaseUpdate} 
            disabled={isLoading || selectedPhase === initialPhaseNumber || !currentPhaseIdPk}
            className="w-full mt-4 quantum-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <CheckCircle className="mr-2 h-5 w-5" />}
            {isLoading ? "Atualizando..." : "Confirmar Nova Fase"}
            {selectedPhase !== initialPhaseNumber && <ArrowRightCircle className="ml-auto h-5 w-5" />}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientPhaseManager;