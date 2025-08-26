import React from 'react';
import TherapistManagement from '@/components/dashboard/TherapistManagement';
import PageHeader from '@/components/PageHeader';
import { Users } from 'lucide-react';

const ManageTherapistsPage = () => {
  
  const handleTherapistUpdate = () => {
    
  };

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Gerenciamento de Terapeutas"
        description="Adicione, visualize, edite e remova terapeutas do sistema Lumina Restauris."
        icon={<Users size={32} className="text-indigo-600 dark:text-indigo-400" />}
      />
      <TherapistManagement onTherapistUpdate={handleTherapistUpdate} />
    </div>
  );
};

export default ManageTherapistsPage;