import React from 'react';
import PatientFormField from '@/components/PatientFormField'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';

const commonInputClass = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 ease-in-out shadow-sm hover:shadow-md";
const commonLabelClass = "block text-sm font-medium text-gray-700 mb-1";

const PatientFormFields = ({ formData, handleChange, handleSelectChange, therapists, isLoadingTherapists, mode }) => {
  const fields = [
    { name: "name", label: "Nome Completo", type: "text", placeholder: "Ex: Maria da Silva", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "Ex: maria.silva@example.com" },
    { name: "phone", label: "Telefone", type: "tel", placeholder: "Ex: (11) 99999-9999" },
    { name: "birth_date", label: "Data de Nascimento", type: "date" },
    { name: "address", label: "Endereço", type: "text", placeholder: "Ex: Rua das Palmeiras, 123" },
    { name: "profession", label: "Profissão", type: "text", placeholder: "Ex: Engenheira de Software" },
  ];

  const genderOptions = [
    { value: "feminino", label: "Feminino" },
    { value: "masculino", label: "Masculino" },
    { value: "outro", label: "Outro" },
    { value: "nao_informar", label: "Prefiro não informar" },
  ];

  const maritalStatusOptions = [
    { value: "solteiro", label: "Solteiro(a)" },
    { value: "casado", label: "Casado(a)" },
    { value: "divorciado", label: "Divorciado(a)" },
    { value: "viuvo", label: "Viúvo(a)" },
    { value: "uniao_estavel", label: "União Estável" },
  ];

  const safeTherapists = Array.isArray(therapists) ? therapists : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {mode === 'edit' && formData.patient_code && (
        <div className="md:col-span-2">
          <Label htmlFor="patient_code" className={commonLabelClass}>Código do Paciente</Label>
          <Input
            id="patient_code"
            name="patient_code"
            type="text"
            value={formData.patient_code}
            readOnly
            className={`${commonInputClass} bg-gray-100 dark:bg-gray-700 cursor-not-allowed`}
          />
        </div>
      )}
      {fields.map(field => (
        <PatientFormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
          className={field.type === 'date' ? `${commonInputClass} text-gray-500` : commonInputClass}
          labelClassName={commonLabelClass}
        />
      ))}
      
      <div>
        <Label htmlFor="gender" className={commonLabelClass}>Gênero</Label>
        <Select name="gender" onValueChange={(value) => handleSelectChange("gender", value)} value={formData.gender}>
          <SelectTrigger className={commonInputClass} id="gender">
            <SelectValue placeholder="Selecione o gênero" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="marital_status" className={commonLabelClass}>Estado Civil</Label>
        <Select name="marital_status" onValueChange={(value) => handleSelectChange("marital_status", value)} value={formData.marital_status}>
          <SelectTrigger className={commonInputClass} id="marital_status">
            <SelectValue placeholder="Selecione o estado civil" />
          </SelectTrigger>
          <SelectContent>
            {maritalStatusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="md:col-span-2">
        <Label htmlFor="therapist_id" className={commonLabelClass}>Terapeuta Responsável</Label>
        <Select name="therapist_id" onValueChange={(value) => handleSelectChange("therapist_id", value)} value={formData.therapist_id} disabled={isLoadingTherapists}>
          <SelectTrigger className={commonInputClass} id="therapist_id">
            <SelectValue placeholder={isLoadingTherapists ? "Carregando terapeutas..." : "Selecione um terapeuta (opcional)"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Nenhum</SelectItem>
            {safeTherapists.map(therapist => (
              <SelectItem key={therapist.id} value={therapist.id}>{therapist.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatientFormFields;