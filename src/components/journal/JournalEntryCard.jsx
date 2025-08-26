import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Smile, Zap, BedDouble, Brain, Sparkles, Edit2, Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RatingDisplay = ({ value, icon: Icon, label }) => {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
      <Icon className="h-4 w-4 mr-1.5 text-yellow-500" />
      <span>{label}:</span>
      <div className="flex ml-1.5">
        {[...Array(5)].map((_, i) => (
          <Sparkles
            key={i}
            className={`h-4 w-4 ${i < value ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value, isEmpty }) => {
  if (isEmpty && !value) return null;
  return (
    <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">
      <strong className="flex items-center font-semibold text-slate-800 dark:text-slate-200">
        <Icon className="h-4 w-4 mr-2 text-purple-500" />
        {label}:
      </strong>
      <p className="pl-6 mt-0.5 text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words">
        {value || <span className="italic text-slate-400 dark:text-slate-500">Não informado</span>}
      </p>
    </div>
  );
};

const JournalEntryCard = ({ entry, onEdit, onDelete, isDeleting }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('pt-BR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className="shadow-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-purple-700 dark:text-purple-400 flex items-center">
              <CalendarDays className="h-5 w-5 mr-2" />
              Diário de {formatDate(entry.entry_date)}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Criado em: {new Date(entry.created_at).toLocaleDateString('pt-BR')}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <RatingDisplay value={entry.mood_rating} icon={Smile} label="Humor" />
            <RatingDisplay value={entry.energy_level} icon={Zap} label="Energia" />
            <RatingDisplay value={entry.sleep_quality} icon={BedDouble} label="Sono" />
          </div>
          <DetailItem icon={Brain} label="Sintomas/Observações Físicas" value={entry.symptoms} isEmpty={!entry.symptoms} />
          <DetailItem icon={Sparkles} label="Insights/Sonhos/Percepções" value={entry.insights} isEmpty={!entry.insights} />
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-3 flex justify-end space-x-2 border-t border-slate-200 dark:border-slate-700">
          <Button variant="outline" size="sm" onClick={() => onEdit(entry)} className="text-blue-600 border-blue-500 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-slate-700">
            <Edit2 className="h-4 w-4 mr-1.5" />
            Editar
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700">
                {isDeleting === entry.id ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Trash2 className="h-4 w-4 mr-1.5" />}
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta entrada do diário de {formatDate(entry.entry_date)}? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting === entry.id}>Cancelar</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(entry.id)} 
                  disabled={isDeleting === entry.id}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting === entry.id ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JournalEntryCard;