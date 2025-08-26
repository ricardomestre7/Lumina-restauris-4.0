import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorView = ({ message, onBack, backButtonText = "Voltar ao Dashboard" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-red-900/30 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="p-8 rounded-2xl shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-red-200 dark:border-red-700/50"
      >
        <AlertTriangle className="w-16 h-16 text-red-500 mb-6 mx-auto" />
        <h2 className="text-2xl font-bold mb-2 text-red-800 dark:text-red-300">Ocorreu um Erro</h2>
        <p className="text-muted-foreground mb-8 max-w-md">{message}</p>
        <Button onClick={onBack} variant="destructive" className="shadow-lg">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {backButtonText}
        </Button>
      </motion.div>
    </div>
  );
};

export default ErrorView;