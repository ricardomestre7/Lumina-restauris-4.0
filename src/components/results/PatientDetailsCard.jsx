import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, Mail, Phone, Briefcase, Users, MapPin, TrendingUp, Clock, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start text-sm">
    {React.cloneElement(icon, { className: "h-4 w-4 text-indigo-500 mr-3 mt-1 shrink-0" })}
    <div>
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}: </span>
      <span className="text-gray-600 dark:text-gray-400">{value || 'N/A'}</span>
    </div>
  </div>
);

const PatientDetailsCard = ({ patient, currentPhaseNumber, phaseStartDate }) => {
  if (!patient) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Adjust for timezone offset to display correct date
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('pt-BR');
  };
  
  const phaseLabels = [
    "Fase 1: Liberação", "Fase 2: Regeneração", "Fase 3: Equilíbrio",
    "Fase 4: Vitalidade", "Fase 5: Integração", "Fase 6: Autonomia"
  ];
  const currentPhaseLabel = phaseLabels[currentPhaseNumber -1] || "Fase Desconhecida";


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="quantum-card shadow-lg h-full">
        <CardHeader className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-purple-900/30 p-5">
          <CardTitle className="flex items-center text-xl font-bold text-indigo-700 dark:text-indigo-300">
            <User className="h-6 w-6 mr-2" />
            Informações do Paciente
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Detalhes cadastrais e de acompanhamento.</CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <DetailItem icon={<User />} label="Nome" value={patient.name} />
          <DetailItem icon={<Mail />} label="Email" value={patient.email} />
          <DetailItem icon={<Phone />} label="Telefone" value={patient.phone} />
          <DetailItem icon={<Calendar />} label="Nascimento" value={formatDate(patient.birth_date)} />
          <DetailItem icon={<MapPin />} label="Endereço" value={patient.address} />
          <DetailItem icon={<Users />} label="Gênero" value={patient.gender} />
          <DetailItem icon={<Briefcase />} label="Profissão" value={patient.profession} />
          <DetailItem icon={<TrendingUp />} label="Fase Atual" value={`${currentPhaseLabel}`} />
          {phaseStartDate && <DetailItem icon={<Clock />} label="Início da Fase" value={formatDate(phaseStartDate)} />}
          {patient.therapistName && <DetailItem icon={<UserCircle />} label="Terapeuta" value={patient.therapistName} />}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientDetailsCard;