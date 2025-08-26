import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPatients, deletePatientById } from '@/lib/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { exportToCSV, getPhaseName, getPhaseDescription, calculateAge, formatDate } from '@/lib/utils.js';

const useDashboardLogic = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllPatients();
      if (response.error) {
        console.error("Erro ao buscar pacientes no hook:", response.error);
        setError(response.error.message || "Falha ao carregar os dados dos pacientes.");
        toast({
          title: "Erro ao Carregar Pacientes",
          description: response.error.message || "Não foi possível obter a lista de pacientes. Por favor, tente novamente.",
          variant: "destructive",
        });
        setAllPatients([]);
      } else {
        const patientsWithAge = (response.data || []).map(p => ({
          ...p,
          age: p.birth_date ? calculateAge(p.birth_date) : null
        }));
        setAllPatients(patientsWithAge);
      }
    } catch (err) {
      console.error("Erro crítico ao buscar pacientes:", err);
      setError("Ocorreu um erro inesperado ao processar sua solicitação.");
      toast({
        title: "Erro Crítico no Sistema",
        description: "Um erro inesperado ocorreu ao tentar carregar os pacientes. Contacte o suporte se persistir.",
        variant: "destructive",
      });
      setAllPatients([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handlePatientAction = (patient, actionType) => {
    if (actionType === 'edit') {
      navigate(`/patient-form/${patient.id}`);
    } else if (actionType === 'start_analysis') {
      navigate(`/quantum-analysis/${patient.id}`);
    } else if (actionType === 'view_results') {
      navigate(`/results/${patient.id}`);
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      const result = await deletePatientById(patientId);
      if (result.error) {
        throw new Error(result.error.message || "Falha ao excluir o paciente do banco de dados.");
      }
      toast({
        title: "Paciente Excluído com Sucesso",
        description: "O paciente e todos os seus dados associados foram removidos permanentemente.",
        className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      });
      setAllPatients(prevPatients => prevPatients.filter(p => p.id !== patientId));
    } catch (error) {
      console.error("Erro ao excluir paciente no hook:", error);
      toast({
        title: "Falha ao Excluir Paciente",
        description: error.message || "Não foi possível excluir o paciente. Verifique se há dados vinculados ou tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleExportPatients = () => {
    if (allPatients.length === 0) {
      toast({ title: "Nenhum Paciente para Exportar", description: "Não há dados de pacientes disponíveis para exportação no momento.", variant: "default" });
      return;
    }
    setIsExporting(true);
    try {
      const dataToExport = allPatients.map(p => ({
        ID_Paciente: p.id,
        Nome_Completo: p.name,
        Email: p.email,
        Telefone: p.phone,
        Data_Nascimento: p.birth_date ? formatDate(p.birth_date) : 'Não informado',
        Idade_Atual: p.age || 'Não informada',
        Endereco_Completo: p.address,
        Genero: p.gender || 'Não informado',
        Profissao: p.profession,
        Estado_Civil: p.marital_status,
        ID_Terapeuta_Vinculado: p.therapist_id_fk, 
        Nome_Terapeuta_Vinculado: p.therapists?.name || p.therapistName || 'Não atribuído',
        ID_Usuario_Terapeuta_Prop: p.therapist_user_id,
        Possui_Analise_Quantica: p.has_analysis ? 'Sim' : 'Não',
        Numero_Fase_Atual: p.patient_current_phase?.current_phase_number || p.current_phase_number || 1,
        Nome_Fase_Atual: getPhaseName(p.patient_current_phase?.current_phase_number || p.current_phase_number || 1),
        Descricao_Fase_Atual: getPhaseDescription(p.patient_current_phase?.current_phase_number || p.current_phase_number || 1),
        Data_Inicio_Fase_Atual: (p.patient_current_phase?.phase_start_date || p.phase_start_date) ? formatDate(p.patient_current_phase?.phase_start_date || p.phase_start_date, true) : 'Não registrada',
        Data_Cadastro_Paciente_Sistema: formatDate(p.created_at)
      }));
      exportToCSV(dataToExport, 'pacientes_lumina_restauris.csv');
      toast({ title: "Exportação Realizada!", description: "A lista de pacientes foi exportada com sucesso para um arquivo CSV.", className: "bg-blue-500 text-white dark:bg-blue-700" });
    } catch (expError) {
      console.error("Erro ao exportar pacientes:", expError);
      toast({ title: "Erro na Exportação", description: "Não foi possível gerar o arquivo CSV. Tente novamente.", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const filteredPatients = allPatients.filter(patient => {
    const nameMatch = patient.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const emailMatch = patient.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || emailMatch;
  });

  return {
    patients: filteredPatients,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    handlePatientAction,
    handleDeletePatient,
    fetchPatients,
    handleExportPatients,
    isExporting,
    originalPatientCount: allPatients.length
  };
};

export default useDashboardLogic;