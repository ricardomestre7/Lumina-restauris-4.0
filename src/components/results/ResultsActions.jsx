import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Share2, RefreshCw, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';


const ResultsActions = ({ onPrint, onShare, patientId, showPrintShare = true }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNewAnalysis = () => {
    if (patientId) {
      navigate(`/quantum-analysis/${patientId}`);
    } else {
      toast({
        title: "Erro",
        description: "ID do paciente não encontrado para iniciar nova análise.",
        variant: "destructive",
      });
    }
  };
  
  const handleOpenJournal = () => {
    if (patientId) {
      navigate(`/journal/${patientId}`);
    } else {
      toast({
        title: "Erro",
        description: "ID do paciente não encontrado para abrir o diário.",
        variant: "destructive",
      });
    }
  };

  const commonButtons = [
    { label: "Diário", icon: BookOpen, onClick: handleOpenJournal, variant: "outline", className: "bg-emerald-500 hover:bg-emerald-600 text-white" },
    { label: "Nova Análise", icon: RefreshCw, onClick: handleNewAnalysis, variant: "default", className: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600" },
  ];

  const printShareButtons = showPrintShare ? [
    { label: "Imprimir", icon: Printer, onClick: onPrint, variant: "outline", className: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200" },
    { label: "Compartilhar", icon: Share2, onClick: onShare, variant: "outline", className: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200" },
  ] : [];

  return (
    <motion.div 
      className="flex flex-wrap justify-end gap-3 print-hide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {[...printShareButtons, ...commonButtons].map((btn) => (
        <motion.div
          key={btn.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto"
        >
          <Button onClick={btn.onClick} variant={btn.variant} className={cn("w-full shadow-sm transition-all duration-300 ease-in-out", btn.className)}>
            <btn.icon className="mr-2 h-4 w-4" />
            {btn.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ResultsActions;