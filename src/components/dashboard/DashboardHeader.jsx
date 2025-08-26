import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Download, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';

const DashboardHeader = ({ onAddNewPatient, onExportPatients, patientCount, isExporting, searchTerm, setSearchTerm }) => {
  const { user } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="p-6 rounded-xl shadow-xl bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-800 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300">
              Painel Lumina Restauris
            </h1>
            <p className="text-slate-300 mt-1">
              Bem-vindo(a), {user?.user_metadata?.name || user?.email || 'Terapeuta'}! Aqui você gerencia seus pacientes e suas jornadas de transformação.
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button 
              onClick={onExportPatients} 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-slate-900 transition-colors duration-300"
              disabled={patientCount === 0 || isExporting}
            >
              <Download className="mr-2 h-4 w-4" /> 
              {isExporting ? 'Exportando...' : 'Exportar'}
            </Button>
            <Button 
              onClick={onAddNewPatient} 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Novo Paciente
            </Button>
          </div>
        </div>
      </div>

       <div className="relative mt-6 w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome ou e-mail do paciente..."
            className="pl-12 pr-4 py-3 text-base rounded-full shadow-sm border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

    </motion.div>
  );
};

export default DashboardHeader;