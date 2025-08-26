import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getPatientById } from '@/lib/patientDataUtils'; 
import { getJournalEntriesForPatient, deleteJournalEntry } from '@/lib/journalUtils';
import JournalEntryForm from '../components/journal/JournalEntryForm.jsx';
import JournalEntriesList from '../components/journal/JournalEntriesList.jsx';
import PageHeader from '@/components/PageHeader';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner';
import { ArrowLeft, BookOpen, PlusCircle } from 'lucide-react';

const PatientJournalPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [patient, setPatient] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [deletingEntryId, setDeletingEntryId] = useState(null);

  const fetchPatientAndEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const patientData = await getPatientById(patientId);
      if (patientData && !patientData.error) {
        setPatient(patientData);
      } else {
        throw new Error(patientData?.error?.message || 'Paciente não encontrado.');
      }

      const entriesResult = await getJournalEntriesForPatient(patientId);
      if (entriesResult.data && !entriesResult.error) {
        setJournalEntries(entriesResult.data);
      } else if (entriesResult.error) {
        throw new Error(entriesResult.error.message || 'Erro ao buscar entradas do diário.');
      }
    } catch (err) {
      console.error("Error fetching data for journal page:", err);
      setError(err.message);
      toast({
        title: 'Erro ao Carregar Dados',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [patientId, toast]);

  useEffect(() => {
    fetchPatientAndEntries();
  }, [fetchPatientAndEntries]);

  const handleSaveSuccess = (newOrUpdatedEntry) => {
    if (editingEntry) {
      setJournalEntries(prevEntries => 
        prevEntries.map(entry => entry.id === newOrUpdatedEntry.id ? newOrUpdatedEntry : entry)
      );
    } else {
      setJournalEntries(prevEntries => [newOrUpdatedEntry, ...prevEntries]);
    }
    setShowForm(false);
    setEditingEntry(null);
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEntry = async (entryId) => {
    setDeletingEntryId(entryId);
    try {
      const result = await deleteJournalEntry(entryId);
      if (result.success) {
        setJournalEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryId));
        toast({
          title: 'Entrada Excluída',
          description: 'A entrada do diário foi removida com sucesso.',
          className: 'bg-health-green text-white dark:bg-health-green-dark',
        });
      } else {
        throw new Error(result.error?.message || 'Falha ao excluir entrada.');
      }
    } catch (err) {
      toast({
        title: 'Erro ao Excluir',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setDeletingEntryId(null);
    }
  };

  const toggleFormVisibility = () => {
    if (showForm && editingEntry) {
      setEditingEntry(null); 
    }
    setShowForm(prev => !prev);
  };
  
  const handleCancelEdit = () => {
    setEditingEntry(null);
    setShowForm(false);
  };

  if (isLoading) {
    return <LoadingSpinner message="Carregando diário do paciente..." />;
  }

  if (error && !patient) {
    return (
      <div className="container mx-auto p-6 text-center">
        <PageHeader title="Erro" Icon={ArrowLeft} onBack={() => navigate('/dashboard')} />
        <p className="text-red-500 mt-4">{error}</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">Voltar ao Dashboard</Button>
      </div>
    );
  }
  
  if (!patient) {
     return (
      <div className="container mx-auto p-6 text-center">
        <PageHeader title="Diário do Paciente" Icon={ArrowLeft} onBack={() => navigate('/dashboard')} />
        <p className="text-slate-600 dark:text-slate-400 mt-4">Paciente não encontrado. Verifique o ID ou retorne ao dashboard.</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-4">Voltar ao Dashboard</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 md:p-8"
    >
      <PageHeader 
        title={`Diário de ${patient.name}`} 
        subtitle="Acompanhe o progresso e insights do paciente"
        Icon={BookOpen}
        onBack={() => navigate(patient.has_analysis ? `/results/${patientId}` : '/dashboard')} 
        backButtonText={patient.has_analysis ? "Voltar aos Resultados" : "Voltar ao Dashboard"}
      />
      
      <div className="my-6 flex justify-end">
        <Button 
          onClick={toggleFormVisibility}
          className="bg-gradient-to-r from-health-green to-emerald-600 hover:from-health-green/90 hover:to-emerald-600/90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          {showForm ? (editingEntry ? 'Fechar Edição' : 'Fechar Formulário') : 'Nova Entrada'}
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <JournalEntryForm 
              patientId={patientId} 
              onSaveSuccess={handleSaveSuccess}
              existingEntry={editingEntry}
              onCancelEdit={handleCancelEdit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-6">Histórico de Entradas</h2>
        {error && !journalEntries.length && <p className="text-red-500">{error}</p>}
        <JournalEntriesList 
            entries={journalEntries} 
            onEditEntry={handleEditEntry} 
            onDeleteEntry={handleDeleteEntry}
            deletingEntryId={deletingEntryId}
        />
      </div>
    </motion.div>
  );
};

export default PatientJournalPage;