import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import JournalEntryCard from './JournalEntryCard.jsx';
import { FileText } from 'lucide-react';

const JournalEntriesList = ({ entries, onEditEntry, onDeleteEntry, deletingEntryId }) => {
  if (!entries || entries.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y:10 }}
        animate={{ opacity: 1, y:0 }}
        className="text-center py-10 px-6 bg-slate-50 dark:bg-slate-800/30 rounded-lg shadow-sm border border-dashed border-slate-300 dark:border-slate-700"
      >
        <FileText className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Nenhuma Entrada no Diário</h3>
        <p className="text-slate-500 dark:text-slate-400">
          Ainda não há registros no diário para este paciente. Adicione uma nova entrada para começar.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {entries.map((entry) => (
          <JournalEntryCard 
            key={entry.id} 
            entry={entry} 
            onEdit={onEditEntry}
            onDelete={onDeleteEntry}
            isDeleting={deletingEntryId}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default JournalEntriesList;