import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="h-16 w-16 text-primary quantum-pulse" />
      </motion.div>
      <h2 className="mt-6 text-2xl font-semibold text-foreground">Carregando Dados...</h2>
      <p className="text-muted-foreground">Por favor, aguarde um momento.</p>
    </div>
  );
};

export default LoadingSpinner;