import React from 'react';
import { motion } from 'framer-motion';
import PatientCard from '@/components/dashboard/PatientCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
};

const PatientList = ({ patients, onPatientAction, onPatientDelete }) => { // Receive onPatientDelete
  return (
    <motion.div 
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {patients.map((patient) => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onAction={onPatientAction} 
          onDelete={onPatientDelete} // Pass onDelete to PatientCard
        />
      ))}
    </motion.div>
  );
};

export default PatientList;