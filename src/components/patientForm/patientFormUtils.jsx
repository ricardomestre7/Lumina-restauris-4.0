import React from 'react';

export const getPatientFormFields = (therapistOptions = []) => [
  { name: 'name', label: 'Nome Completo*', type: 'text', placeholder: 'Ex: Maria Silva', required: true },
  { name: 'email', label: 'Email*', type: 'email', placeholder: 'Ex: maria.silva@email.com', required: true },
  { name: 'age', label: 'Idade*', type: 'number', placeholder: 'Ex: 35', required: true },
  { 
    name: 'gender', 
    label: 'Gênero*', 
    type: 'select', 
    required: true,
    options: [
      { value: '', label: 'Selecione o gênero' },
      { value: 'Feminino', label: 'Feminino' },
      { value: 'Masculino', label: 'Masculino' },
      { value: 'Outro', label: 'Outro' },
      { value: 'Prefiro não informar', label: 'Prefiro não informar' }
    ] 
  },
  { name: 'phone', label: 'Telefone', type: 'tel', placeholder: 'Ex: (11) 98765-4321' },
  { name: 'address', label: 'Endereço', type: 'text', placeholder: 'Ex: Rua das Flores, 123, São Paulo, SP' },
  { name: 'occupation', label: 'Profissão', type: 'text', placeholder: 'Ex: Engenheira de Software' },
  { 
    name: 'maritalStatus', 
    label: 'Estado Civil', 
    type: 'select', 
    options: [
      { value: '', label: 'Selecione o estado civil' },
      { value: 'Solteiro(a)', label: 'Solteiro(a)' },
      { value: 'Casado(a)', label: 'Casado(a)' },
      { value: 'Divorciado(a)', label: 'Divorciado(a)' },
      { value: 'Viúvo(a)', label: 'Viúvo(a)' },
      { value: 'União Estável', label: 'União Estável' }
    ] 
  },
  {
    name: 'therapistId',
    label: 'Terapeuta Responsável',
    type: 'select',
    options: [
      { value: '', label: 'Selecione um terapeuta (opcional)' },
      ...therapistOptions
    ]
  }
];