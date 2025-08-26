import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BarChart3 } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import useDashboardLogic from '@/hooks/useDashboardLogic';
import DashboardStats from '@/components/dashboard/DashboardStats';

const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    patients, 
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    handlePatientAction,
    handleDeletePatient,
    fetchPatients,
    handleExportPatients,
    isExporting,
    originalPatientCount 
  } = useDashboardLogic();

  const handleAddNewPatient = () => {
    navigate('/patient-form');
  };

  // Safe stats calculation
  const stats = React.useMemo(() => ({
    total: originalPatientCount,
    withAnalysis: patients.filter(p => p.has_analysis).length,
    recentlyAdded: 0, // Placeholder for now
  }), [originalPatientCount, patients]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      <DashboardHeader 
        onAddNewPatient={handleAddNewPatient} 
        onExportPatients={handleExportPatients}
        patientCount={originalPatientCount} 
        isExporting={isExporting}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <Tabs defaultValue="patients" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid md:grid-cols-2 mx-auto bg-muted/50 backdrop-blur-sm rounded-lg">
          <TabsTrigger value="patients" className="text-base py-2.5">
            <Users className="mr-2 h-5 w-5" /> Pacientes
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-base py-2.5">
            <BarChart3 className="mr-2 h-5 w-5" /> Estatísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="mt-6">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100 mb-4">
              Visão Geral dos Pacientes ({patients.length})
            </h2>
            <DashboardContent
              patients={patients}
              isLoading={isLoading}
              error={error}
              onRetry={fetchPatients}
              handlePatientAction={handlePatientAction}
              handleDeletePatient={handleDeletePatient}
              searchTerm={searchTerm}
              handleNewPatient={handleAddNewPatient}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl rounded-xl p-6"
          >
            <DashboardStats stats={stats} />
            <div className="text-center py-10 mt-6 border-t border-dashed">
              <p className="text-muted-foreground">Mais gráficos e insights detalhados estarão disponíveis aqui em breve!</p>
            </div>
           </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default DashboardPage;