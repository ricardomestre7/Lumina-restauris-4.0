import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import PatientFormFields from '@/components/patientForm/PatientFormFields';
import PatientFormHeader from '@/components/patientForm/PatientFormHeader';
import PatientFormActions from '@/components/patientForm/PatientFormActions';
import PatientFormSkeleton from '@/components/patientForm/PatientFormSkeleton';
import { usePatientFormLogic } from '@/hooks/usePatientFormLogic';

const PatientForm = ({ mode: propMode }) => {
  const navigate = useNavigate();
  const {
    formData,
    therapists,
    isSubmitting,
    isLoadingData,
    handleChange,
    handleSelectChange,
    handleSubmit,
    mode: hookMode, 
  } = usePatientFormLogic(propMode); 

  const currentMode = propMode || hookMode || 'create';

  if (isLoadingData && currentMode === 'edit') {
    return <PatientFormSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto p-4 md:p-8 max-w-2xl"
    >
      <Card className="quantum-card shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
        <PatientFormHeader onBack={() => navigate(-1)} mode={currentMode} />
        <CardContent className="p-6 md:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <PatientFormFields 
              formData={formData} 
              handleChange={handleChange} 
              handleSelectChange={handleSelectChange}
              therapists={therapists}
              isLoadingTherapists={isLoadingData && currentMode === 'create'}
              mode={currentMode}
            />
            <PatientFormActions 
              mode={currentMode} 
              isSubmitting={isSubmitting} 
              isLoadingData={isLoadingData && currentMode === 'create'} 
            />
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PatientForm;