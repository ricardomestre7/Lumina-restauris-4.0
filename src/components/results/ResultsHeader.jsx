import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultsHeader = ({ patientName, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-8"
    >
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onBack}
        className="rounded-full shadow-sm hover:bg-accent print-hide"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resultados da Análise Quântica</h1>
        <p className="text-lg text-muted-foreground">
          Paciente: <span className="font-semibold text-primary">{patientName}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default ResultsHeader;