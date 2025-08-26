import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CalendarDays, Smile, Zap, BedDouble, Brain, Sparkles, Save, Loader2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { saveJournalEntry, updateJournalEntry } from '@/lib/journalUtils';

const RatingInput = ({ label, value, onChange, icon: Icon }) => (
  <div className="space-y-2">
    <Label htmlFor={label.toLowerCase()} className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
      <Icon className="h-5 w-5 mr-2 text-purple-500" />
      {label}
    </Label>
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.2, rotate: star % 2 === 0 ? 5 : -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(star)}
          className={`p-1.5 rounded-full transition-colors duration-200 ease-in-out
            ${value >= star ? 'bg-yellow-400 text-white dark:bg-yellow-500' : 'bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-400 hover:bg-yellow-200 dark:hover:bg-yellow-700'}
          `}
          aria-label={`Avaliar ${star} de 5`}
        >
          <Sparkles className="h-5 w-5" />
        </motion.button>
      ))}
    </div>
  </div>
);

const JournalEntryForm = ({ patientId, onSaveSuccess, existingEntry, onCancelEdit }) => {
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [moodRating, setMoodRating] = useState(null);
  const [energyLevel, setEnergyLevel] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [symptoms, setSymptoms] = useState('');
  const [insights, setInsights] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (existingEntry) {
      setEntryDate(new Date(existingEntry.entry_date).toISOString().split('T')[0]);
      setMoodRating(existingEntry.mood_rating);
      setEnergyLevel(existingEntry.energy_level);
      setSleepQuality(existingEntry.sleep_quality);
      setSymptoms(existingEntry.symptoms || '');
      setInsights(existingEntry.insights || '');
    } else {
      setEntryDate(new Date().toISOString().split('T')[0]);
      setMoodRating(null);
      setEnergyLevel(null);
      setSleepQuality(null);
      setSymptoms('');
      setInsights('');
    }
  }, [existingEntry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!patientId && !existingEntry?.patient_id) {
      toast({ title: "Erro", description: "ID do paciente não fornecido.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    if (!entryDate) {
      toast({ title: "Campo Obrigatório", description: "Por favor, selecione a data da entrada.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const entryData = {
      patient_id: existingEntry ? existingEntry.patient_id : patientId,
      entry_date: entryDate,
      mood_rating: moodRating,
      energy_level: energyLevel,
      sleep_quality: sleepQuality,
      symptoms: symptoms,
      insights: insights,
    };

    try {
      let response;
      if (existingEntry && existingEntry.id) {
        response = await updateJournalEntry(existingEntry.id, entryData);
      } else {
        response = await saveJournalEntry(entryData);
      }

      if (response && !response.error) {
        toast({
          title: `Entrada ${existingEntry ? 'Atualizada' : 'Salva'}!`,
          description: `O registro do diário foi ${existingEntry ? 'atualizado' : 'salvo'} com sucesso.`,
          className: "bg-health-green text-white dark:bg-health-green-dark",
        });
        if (onSaveSuccess) {
          onSaveSuccess(response); 
        }
        if (!existingEntry) { 
          setMoodRating(null);
          setEnergyLevel(null);
          setSleepQuality(null);
          setSymptoms('');
          setInsights('');
          setEntryDate(new Date().toISOString().split('T')[0]);
        }
      } else {
        throw new Error(response?.error?.message || `Falha ao ${existingEntry ? 'atualizar' : 'salvar'} entrada.`);
      }
    } catch (error) {
      console.error("Error saving/updating journal entry:", error);
      toast({
        title: `Erro ao ${existingEntry ? 'Atualizar' : 'Salvar'}`,
        description: error.message || `Não foi possível ${existingEntry ? 'atualizar' : 'salvar'} a entrada do diário. Tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const cardTitle = existingEntry ? "Editar Entrada no Diário" : "Nova Entrada no Diário";
  const cardDescription = existingEntry ? "Modifique os detalhes desta entrada." : "Registre as percepções e o progresso do paciente.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto shadow-2xl quantum-card-glow border border-divinity-gold/30">
        <CardHeader className="bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-800 dark:via-purple-900/40 dark:to-slate-800 p-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                {cardTitle}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-1">
                {cardDescription}
              </CardDescription>
            </div>
            {existingEntry && onCancelEdit && (
                 <Button variant="ghost" size="icon" onClick={onCancelEdit} aria-label="Cancelar edição">
                    <X className="h-5 w-5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" />
                </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="entryDate" className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <CalendarDays className="h-5 w-5 mr-2 text-purple-500" />
                Data da Entrada
              </Label>
              <Input
                id="entryDate"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RatingInput label="Humor" value={moodRating} onChange={setMoodRating} icon={Smile} />
              <RatingInput label="Nível de Energia" value={energyLevel} onChange={setEnergyLevel} icon={Zap} />
              <RatingInput label="Qualidade do Sono" value={sleepQuality} onChange={setSleepQuality} icon={BedDouble} />
            </div>

            <div>
              <Label htmlFor="symptoms" className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                Sintomas ou Observações Físicas
              </Label>
              <Textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Ex: Dor de cabeça leve, mais disposição pela manhã..."
                className="min-h-[80px] bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div>
              <Label htmlFor="insights" className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                Insights, Sonhos ou Percepções
              </Label>
              <Textarea
                id="insights"
                value={insights}
                onChange={(e) => setInsights(e.target.value)}
                placeholder="Ex: Sonhei com água limpa, senti uma clareza mental após a meditação..."
                className="min-h-[80px] bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <CardFooter className="p-0 pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 text-base rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                {isSubmitting ? (existingEntry ? 'Atualizando...' : 'Salvando...') : (existingEntry ? 'Atualizar Entrada' : 'Salvar Entrada')}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JournalEntryForm;