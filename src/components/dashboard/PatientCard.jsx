import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { Thermometer, Activity, Zap, Brain, Sparkles, Trash2, Edit3, Loader2, ChevronRight, BookOpen } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast"; 
import { useNavigate } from 'react-router-dom';

const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

const PatientCard = ({ patient, onAction, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    if (!onDelete) {
      console.error("Função onDelete não fornecida ao PatientCard");
      toast({ 
        title: "Erro de Configuração",
        description: "A funcionalidade de exclusão não está configurada adequadamente.",
        variant: "destructive",
      });
      return;
    }
    setIsDeleting(true);
    try {
      await onDelete(patient.id); 
    } catch (error) {
      console.error("Erro durante a confirmação de exclusão no card:", error);
      toast({
        title: "Falha ao Excluir",
        description: error.message || "Não foi possível concluir a exclusão do paciente.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleEdit = (e) => {
    e.stopPropagation(); 
    onAction(patient, 'edit');
  };

  const handleOpenJournal = (e) => {
    e.stopPropagation();
    navigate(`/journal/${patient.id}`);
  };
  
  const handleCardClick = () => {
     onAction(patient, patient.has_analysis ? 'view_results' : 'start_analysis');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const phaseColors = {
    1: "bg-sky-100 dark:bg-sky-800 border-sky-500",
    2: "bg-lime-100 dark:bg-lime-800 border-lime-500",
    3: "bg-amber-100 dark:bg-amber-800 border-amber-500",
    4: "bg-violet-100 dark:bg-violet-800 border-violet-500",
    5: "bg-pink-100 dark:bg-pink-800 border-pink-500",
    6: "bg-teal-100 dark:bg-teal-800 border-teal-500",
  };
  const phaseTextColors = {
    1: "text-sky-700 dark:text-sky-300",
    2: "text-lime-700 dark:text-lime-300",
    3: "text-amber-700 dark:text-amber-300",
    4: "text-violet-700 dark:text-violet-300",
    5: "text-pink-700 dark:text-pink-300",
    6: "text-teal-700 dark:text-teal-300",
  };

  const currentPhaseColor = phaseColors[patient.current_phase_number] || "bg-gray-100 dark:bg-gray-800 border-gray-500";
  const currentPhaseTextColor = phaseTextColors[patient.current_phase_number] || "text-gray-700 dark:text-gray-300";


  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" layout>
      <Card 
        className={cn(
          "quantum-card-hover overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col h-full",
          patient.has_analysis ? "border-l-4 border-health-green" : "border-l-4 border-health-orange"
        )}
      >
        <CardHeader className="pb-3 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-purple-400 dark:border-purple-600">
                <AvatarImage src={patient.avatarUrl || `https://avatar.vercel.sh/${patient.name || 'default'}.png?size=64`} alt={patient.name || 'Avatar do Paciente'} />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white dark:from-purple-600 dark:to-indigo-700">
                  {getInitial(patient.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{patient.name || "Paciente Sem Nome"}</CardTitle>
                <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
                  {patient.email || 'E-mail não informado'} - {patient.age ? `${patient.age} anos` : 'Idade não informada'}
                </CardDescription>
              </div>
            </div>
             <div className={cn("text-xs font-semibold px-2 py-1 rounded-full border", currentPhaseColor, currentPhaseTextColor)}>
              Fase {patient.current_phase_number || 1}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="py-4 px-6 flex-grow space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <p><span className="font-medium">Terapeuta Responsável:</span> {patient.therapistName || 'Não atribuído'}</p>
          <p><span className="font-medium">Próxima Ação Sugerida:</span> {patient.has_analysis ? 'Visualizar Resultados da Análise' : 'Iniciar Nova Análise Quântica'}</p>
        </CardContent>

        <CardFooter className="p-3 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
          <div className="flex space-x-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100 dark:hover:bg-red-700/30" disabled={isDeleting} aria-label="Excluir Paciente">
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Exclusão do Paciente</AlertDialogTitle>
                  <AlertDialogDescription>
                    Você tem certeza que deseja excluir permanentemente o paciente {patient.name || "este paciente"}? Todos os dados associados, incluindo análises e diários, serão perdidos. Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting} className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Confirmar Exclusão
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-700/30" onClick={handleEdit} aria-label="Editar Dados do Paciente">
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-700/30" onClick={handleOpenJournal} aria-label="Acessar Diário do Paciente">
              <BookOpen className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className={cn(
              "group text-xs",
              patient.has_analysis 
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white" 
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white"
            )}
            onClick={handleCardClick}
          >
            {patient.has_analysis ? 'Ver Resultados' : 'Iniciar Análise'}
            <ChevronRight className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PatientCard;