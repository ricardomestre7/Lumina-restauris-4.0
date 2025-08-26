import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { savePatient, getTherapists, getPatientById, updatePatient } from '@/lib/dataManager';

const initialFormDataState = {
  name: '',
  email: '',
  phone: '',
  birth_date: '',
  address: '',
  gender: '',
  profession: '',
  marital_status: '',
  therapist_id: '',
  patient_code: ''
};

export const usePatientFormLogic = (mode = 'create') => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState(initialFormDataState);
  const [therapists, setTherapists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoadingData(true);
      try {
        const therapistsResponse = await getTherapists();
        if (therapistsResponse.error) {
          console.error("Error fetching therapists for form:", therapistsResponse.error);
          toast({
            title: "Erro ao Carregar Terapeutas",
            description: therapistsResponse.error.message || "Não foi possível buscar a lista de terapeutas.",
            variant: "destructive",
          });
          setTherapists([]);
        } else {
          setTherapists(Array.isArray(therapistsResponse.data) ? therapistsResponse.data : []);
        }

        if (mode === 'edit' && patientId) {
          const patientResponse = await getPatientById(patientId);
          if (patientResponse.data) {
            const patientData = patientResponse.data;
            setFormData({
              name: patientData.name || '',
              email: patientData.email || '',
              phone: patientData.phone || '',
              birth_date: patientData.birth_date ? patientData.birth_date.split('T')[0] : '',
              address: patientData.address || '',
              gender: patientData.gender || '',
              profession: patientData.profession || '',
              marital_status: patientData.marital_status || '',
              therapist_id: patientData.therapist_id || '',
              patient_code: patientData.patient_code || ''
            });
          } else {
            toast({
              title: "Erro ao Carregar Paciente",
              description: "Paciente não encontrado para edição.",
              variant: "destructive",
            });
            navigate('/'); 
          }
        } else {
          setFormData(initialFormDataState);
        }
      } catch (error) {
        console.error("Catch block error fetching initial data for patient form:", error);
        toast({
          title: "Erro ao Carregar Dados",
          description: "Não foi possível buscar os dados necessários.",
          variant: "destructive",
        });
        setTherapists([]); 
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchInitialData();
  }, [toast, mode, patientId, navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { patient_code, ...patientToSubmit } = formData;
      
      const finalPatientData = {
        ...patientToSubmit,
        therapist_id: patientToSubmit.therapist_id || null,
        birth_date: patientToSubmit.birth_date || null,
      };

      let result;
      if (mode === 'edit' && patientId) {
        result = await updatePatient(patientId, finalPatientData);
      } else {
        result = await savePatient(finalPatientData);
      }

      if (result && result.id) {
        toast({
          title: mode === 'edit' ? "Paciente Atualizado!" : "Paciente Cadastrado!",
          description: `${result.name} foi ${mode === 'edit' ? 'atualizado(a)' : 'adicionado(a)'} com sucesso.`,
          className: "bg-green-500 text-white dark:bg-green-600",
        });
        navigate('/');
      } else {
        const errorMessage = result?.error?.message || result?.message || (mode === 'edit' ? "Falha ao atualizar paciente." : "Falha ao salvar paciente.");
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'saving'} patient:`, error);
      toast({
        title: mode === 'edit' ? "Erro ao Atualizar" : "Erro ao Cadastrar",
        description: error.message || `Não foi possível ${mode === 'edit' ? 'atualizar' : 'salvar'} o paciente. Verifique os dados e tente novamente.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast, navigate, mode, patientId]);

  return {
    formData,
    setFormData,
    therapists,
    isSubmitting,
    isLoadingData,
    handleChange,
    handleSelectChange,
    handleSubmit,
    mode,
    patientId
  };
};