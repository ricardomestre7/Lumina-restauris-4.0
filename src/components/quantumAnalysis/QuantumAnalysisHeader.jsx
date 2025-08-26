import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const QuantumAnalysisHeader = ({ patientName, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-6"
    >
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onBack}
        className="rounded-full shadow-sm hover:bg-accent"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Análise Quântica</h1>
        <p className="text-lg text-muted-foreground">
          Paciente: <span className="font-semibold text-primary">{patientName}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default QuantumAnalysisHeader;