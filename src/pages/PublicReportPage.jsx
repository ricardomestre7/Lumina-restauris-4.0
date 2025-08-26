import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

import ResultsView from '@/components/results/ResultsView';
import LoadingSpinner from '@/components/quantumAnalysis/LoadingSpinner';
import ErrorView from '@/components/results/ErrorView';

const PublicReportHeader = () => (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
            <img  alt="Lumina Restauris logo" class="h-10 w-10" src="https://images.unsplash.com/photo-1585065799297-ce07d1855c01" />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Lumina Restauris
            </span>
        </div>
        <p className="text-sm text-gray-300">Relatório Quântico Confidencial</p>
    </div>
);

const PublicReportFooter = () => (
    <footer className="text-center p-4 mt-8 text-sm text-gray-500 border-t">
        Gerado por Lumina Restauris. Este é um relatório confidencial.
    </footer>
);

const PublicReportPage = () => {
    const { shareToken } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPublicReportData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: functionError } = await supabase.functions.invoke('get-public-report-data', {
                body: { shareToken },
            });

            if (functionError) throw functionError;
            if (data.error) throw new Error(data.error);
            
            setReportData(data);

        } catch (err) {
            console.error("Error fetching public report data:", err);
            const errorMessage = err.message.includes("Invalid or expired share link")
                ? "Este link de compartilhamento é inválido ou expirou."
                : "Não foi possível carregar o relatório. Verifique o link e tente novamente.";
            
            setError(errorMessage);
            toast({
                title: "Erro ao Carregar Relatório",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [shareToken, toast]);

    useEffect(() => {
        fetchPublicReportData();
    }, [fetchPublicReportData]);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    if (isLoading) {
        return <LoadingSpinner message="Carregando relatório seguro..." />;
    }

    if (error) {
        return <ErrorView message={error} onBack={() => navigate('/')} backButtonText="Voltar à Página Inicial" />;
    }

    if (!reportData || !reportData.patient || !reportData.currentAnalysis) {
        return <ErrorView message="Os dados do relatório estão incompletos." onBack={() => navigate('/')} backButtonText="Voltar à Página Inicial" />;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <PublicReportHeader />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <ResultsView
                    patient={reportData.patient}
                    currentAnalysis={reportData.currentAnalysis}
                    previousAnalysis={reportData.previousAnalysis}
                    allAnalyses={reportData.allAnalyses}
                    currentPhaseNumber={null}
                    phaseStartDate={null}
                    currentPhaseIdPk={null}
                    onPhaseUpdate={() => {}}
                    onPrint={handlePrint}
                    onShare={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast({ title: "Link Copiado!", description: "O link foi copiado para a área de transferência."});
                    }}
                    onBack={() => {}}
                />
            </motion.div>
            <PublicReportFooter />
        </div>
    );
};

export default PublicReportPage;