import React from 'react';
import { motion } from 'framer-motion';
import { MailCheck, AlertTriangle } from 'lucide-react';

const EmailConfirmationPanel = ({ email }) => {
  if (!email) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-6 p-4 bg-yellow-400/10 border-l-4 border-yellow-400 rounded-r-lg text-center"
    >
      <div className="flex items-center justify-center">
        <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
        <div className="ml-3 text-left">
          <p className="text-lg font-semibold text-yellow-300">Confirmação Necessária!</p>
          <p className="text-sm text-slate-300">
            Enviamos um link para <strong className="text-slate-100">{email}</strong>. 
            Clique nele para ativar sua conta. Verifique também sua caixa de spam.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailConfirmationPanel;