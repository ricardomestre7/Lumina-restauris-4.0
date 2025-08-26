import React from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import DashboardPage from '@/pages/DashboardPage.jsx'; 
import PatientForm from '@/pages/PatientForm';
import QuantumAnalysisPage from '@/pages/QuantumAnalysisPage.jsx';
import ResultsPage from '@/pages/ResultsPage.jsx'; 
import Layout from '@/components/Layout';
import ResourcesPage from '@/pages/ResourcesPage';
import AnimatedPage from '@/components/AnimatedPage';
import LoginPage from '@/pages/LoginPage';
import PatientJournalPage from '@/pages/PatientJournalPage.jsx';
import ManageTherapistsPage from '@/pages/ManageTherapistsPage.jsx';
import UserGuidePage from '@/pages/UserGuidePage.jsx';
import MediaManagerPage from '@/pages/MediaManagerPage.jsx'; 
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import ReportsPage from '@/pages/ReportsPage.jsx';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.jsx';
import UpdatePasswordPage from '@/pages/UpdatePasswordPage.jsx';
import PublicReportPage from '@/pages/PublicReportPage.jsx';

const GlobalLoadingIndicator = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 quantum-pattern-light dark:quantum-pattern-dark">
    <div className="p-8 rounded-lg shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-purple-200 dark:border-slate-700">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="mx-auto mb-4"
        style={{ width: '50px', height: '50px' }}
      >
        <svg className="h-full w-full text-indigo-500 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </motion.div>
      <p className="text-center text-lg font-medium text-slate-700 dark:text-slate-200">Carregando Aplicação...</p>
      <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-1">Por favor, aguarde um momento.</p>
    </div>
  </div>
);

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); 

  if (isLoading) {
    return <GlobalLoadingIndicator />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth(); 

  if (isLoading && location.pathname !== '/login' && !isAuthenticated) {
    return <GlobalLoadingIndicator />;
  }
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/login" 
          element={
            isLoading ? (
              <GlobalLoadingIndicator />
            ) : isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AnimatedPage><LoginPage /></AnimatedPage>
            )
          } 
        />
        <Route path="/forgot-password" element={<AnimatedPage><ForgotPasswordPage /></AnimatedPage>} />
        <Route path="/update-password" element={<AnimatedPage><UpdatePasswordPage /></AnimatedPage>} />
        <Route path="/share/report/:shareToken" element={<AnimatedPage><PublicReportPage /></AnimatedPage>} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AnimatedPage><DashboardPage /></AnimatedPage>} />
          <Route path="/patient-form" element={<AnimatedPage><PatientForm /></AnimatedPage>} />
          <Route path="/patient-form/:patientId" element={<AnimatedPage><PatientForm mode="edit" /></AnimatedPage>} />
          <Route path="/quantum-analysis/:patientId" element={<AnimatedPage><QuantumAnalysisPage /></AnimatedPage>} />
          <Route path="/results/:patientId" element={<AnimatedPage><ResultsPage /></AnimatedPage>} />
          <Route path="/journal/:patientId" element={<AnimatedPage><PatientJournalPage /></AnimatedPage>} />
          <Route path="/resources" element={<AnimatedPage><ResourcesPage /></AnimatedPage>} />
          <Route path="/media-manager" element={<AnimatedPage><MediaManagerPage /></AnimatedPage>} />
          <Route path="/manage-therapists" element={<AnimatedPage><ManageTherapistsPage /></AnimatedPage>} />
          <Route path="/user-guide" element={<AnimatedPage><UserGuidePage /></AnimatedPage>} />
          <Route path="/reports" element={<AnimatedPage><ReportsPage /></AnimatedPage>} />
        </Route>
        
        <Route 
          path="*" 
          element={
            isLoading ? (
              <GlobalLoadingIndicator />
            ) : isAuthenticated ? (
              <Navigate to="/" replace /> 
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;