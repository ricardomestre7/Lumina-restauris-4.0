import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash2, UserCheck, AlertTriangle, Loader2, Edit3, X, Save, Download } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { saveTherapist, deleteTherapist, getTherapists, updateTherapist } from '@/lib/dataManager';
import { exportToCSV } from '@/lib/utils.js';
import { motion, AnimatePresence } from 'framer-motion';

const initialTherapistFormState = {
  name: '',
  email: '',
  phone: '',
  specialty: '',
};

const TherapistManagement = ({ onTherapistUpdate }) => {
  const [therapists, setTherapists] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTherapist, setCurrentTherapist] = useState(null); 
  const [formData, setFormData] = useState(initialTherapistFormState);
  const [formMode, setFormMode] = useState('add'); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTherapistsData = async () => {
    setIsFetching(true);
    try {
      const response = await getTherapists();
      if (response.error) {
        console.error("Erro ao buscar terapeutas:", response.error);
        toast({
          title: "Falha ao Carregar Terapeutas",
          description: response.error.message || "Não foi possível carregar a lista de terapeutas cadastrados.",
          variant: "destructive",
        });
        setTherapists([]);
      } else {
        setTherapists(response.data ? response.data.sort((a,b) => a.name.localeCompare(b.name)) : []);
      }
    } catch (error) {
      console.error("Erro crítico ao buscar terapeutas:", error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um problema ao tentar carregar os dados dos terapeutas.",
        variant: "destructive",
      });
      setTherapists([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTherapistsData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenForm = (mode = 'add', therapist = null) => {
    setFormMode(mode);
    if (mode === 'edit' && therapist) {
      setCurrentTherapist(therapist);
      setFormData({
        name: therapist.name || '',
        email: therapist.email || '',
        phone: therapist.phone || '',
        specialty: therapist.specialty || '',
      });
    } else {
      setCurrentTherapist(null);
      setFormData(initialTherapistFormState);
    }
    setIsFormOpen(true);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({ title: "Nome Obrigatório", description: "Por favor, informe o nome completo do terapeuta.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      let result;
      const actionText = formMode === 'edit' ? 'atualizar' : 'adicionar';
      const successMessage = formMode === 'edit' ? 'Terapeuta atualizado com sucesso!' : 'Terapeuta adicionado com sucesso!';
      const failureMessage = `Não foi possível ${actionText} o terapeuta. Verifique os dados e tente novamente.`;

      if (formMode === 'edit' && currentTherapist) {
        result = await updateTherapist(currentTherapist.id, formData);
      } else {
        result = await saveTherapist(formData);
      }

      if (result.success && result.therapist) {
        await fetchTherapistsData(); 
        toast({ title: "Sucesso!", description: result.message || successMessage, className: "bg-green-500 text-white dark:bg-green-700" });
        if (onTherapistUpdate) onTherapistUpdate();
        setIsFormOpen(false);
      } else {
        toast({ title: "Operação Falhou", description: result.message || failureMessage, variant: "destructive" });
      }
    } catch (error) {
       toast({ title: `Erro ao ${formMode === 'edit' ? 'atualizar' : 'salvar'} terapeuta`, description: error.message || "Ocorreu um problema inesperado.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteTherapist = async (therapistId) => {
    setIsSubmitting(true); 
     try {
      const result = await deleteTherapist(therapistId);
      if (result.success) {
        setTherapists(prev => prev.filter(t => t.id !== therapistId));
        toast({ title: "Terapeuta Removido", description: result.message || "O terapeuta foi removido com sucesso." });
        if (onTherapistUpdate) onTherapistUpdate();
      } else {
        toast({ title: "Falha ao Remover", description: result.message || "Não foi possível remover o terapeuta. Verifique se há pacientes vinculados.", variant: "destructive" });
      }
    } catch (error) {
       toast({ title: "Erro ao Remover Terapeuta", description: error.message || "Ocorreu um problema inesperado durante a remoção.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportTherapists = () => {
    if (therapists.length === 0) {
      toast({ title: "Sem Dados para Exportar", description: "Não há terapeutas cadastrados para exportar no momento.", variant: "default" });
      return;
    }
    const dataToExport = therapists.map(({ id, name, email, phone, specialty, created_at, owner_user_id }) => ({
      ID_Terapeuta: id,
      Nome_Completo: name,
      Email: email,
      Telefone: phone,
      Especialidade_Principal: specialty,
      Data_de_Cadastro: new Date(created_at).toLocaleDateString('pt-BR'),
      ID_Usuario_Proprietario_Sistema: owner_user_id
    }));
    exportToCSV(dataToExport, 'lista_terapeutas_lumina.csv');
    toast({ title: "Exportação Concluída!", description: "A lista de terapeutas foi exportada para um arquivo CSV.", className: "bg-blue-500 text-white dark:bg-blue-700" });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <Card className="quantum-card shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-xl flex items-center font-semibold">
            <UserCheck className="mr-2 h-6 w-6 text-indigo-500" />
            Gerenciamento de Terapeutas
          </CardTitle>
          <CardDescription>Adicione, edite ou remova terapeutas vinculados à sua conta.</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleExportTherapists} variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30" disabled={therapists.length === 0 || isFetching}>
            <Download className="mr-2 h-4 w-4" /> Exportar (CSV)
          </Button>
          <Button onClick={() => handleOpenForm('add')} className="quantum-glow bg-indigo-500 hover:bg-indigo-600">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Terapeuta
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isFetching && <div className="flex items-center justify-center py-4"><Loader2 className="h-6 w-6 animate-spin text-indigo-500" /><span className="ml-2 text-sm text-muted-foreground">Carregando lista de terapeutas...</span></div>}
        
        {!isFetching && therapists.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y:10 }} animate={{opacity:1, y:0}}
            className="text-center py-4 text-muted-foreground border border-dashed rounded-md"
          >
            <AlertTriangle className="mx-auto h-8 w-8 mb-2 text-yellow-500" />
            <p>Nenhum terapeuta cadastrado.</p>
            <p className="text-xs">Clique em "Novo Terapeuta" para adicionar o primeiro.</p>
          </motion.div>
        )}

        <div className="max-h-96 overflow-y-auto pr-2 space-y-3 mt-4">
          <AnimatePresence>
            {therapists.map((therapist) => (
              <motion.div
                key={therapist.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-grow">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-md">{therapist.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{therapist.specialty || 'Especialidade não definida'}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{therapist.email || 'E-mail não definido'}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50" onClick={() => handleOpenForm('edit', therapist)} disabled={isSubmitting} aria-label="Editar Terapeuta">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/50" disabled={isSubmitting} aria-label="Remover Terapeuta">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Remoção</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover o terapeuta "{therapist.name}"? Esta ação é permanente e não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteTherapist(therapist.id)} className="bg-red-500 hover:bg-red-600" disabled={isSubmitting}>
                          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Removendo...</> : "Confirmar Remoção"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {formMode === 'edit' ? 'Editar Dados do Terapeuta' : 'Adicionar Novo Terapeuta'}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {formMode === 'edit' ? 'Modifique as informações do terapeuta selecionado.' : 'Preencha os campos abaixo para cadastrar um novo terapeuta.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitForm} className="space-y-4 py-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome Completo</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ex: Maria Clara Rezende" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Endereço de E-mail</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Ex: mariac.rezende@email.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Telefone de Contato</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Ex: (11) 98765-4321" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="specialty" className="text-gray-700 dark:text-gray-300">Especialidade Principal</Label>
              <Input id="specialty" name="specialty" value={formData.specialty} onChange={handleInputChange} placeholder="Ex: Terapeuta Holístico, Radiestesista" className="mt-1" />
            </div>
            <DialogFooter className="pt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  <X className="mr-2 h-4 w-4" /> Fechar
                </Button>
              </DialogClose>
              <Button type="submit" className="quantum-glow bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting || !formData.name.trim()}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {isSubmitting ? (formMode === 'edit' ? 'Salvando Alterações...' : 'Adicionando Terapeuta...') : (formMode === 'edit' ? 'Salvar Alterações' : 'Adicionar Terapeuta')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TherapistManagement;