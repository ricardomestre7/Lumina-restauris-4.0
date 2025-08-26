import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChartBig } from 'lucide-react';
import { motion } from 'framer-motion';

const DetailItem = ({ label, value, highlight = false }) => (
  <div>
    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</dt>
    <dd className={`text-sm ${highlight ? 'font-semibold text-primary' : 'text-foreground'}`}>{value || "N/A"}</dd>
  </div>
);

const AnalysisInfoCard = ({ analysisResults, analysisDate, analysisId }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(new Date(dateString));
  };

  const categories = analysisResults && analysisResults.categories ? analysisResults.categories : {};
  const categoryEntries = Object.entries(categories);
  
  const averageScore = categoryEntries.length > 0 
    ? Math.round(categoryEntries.reduce((sum, [, score]) => sum + (Number(score) || 0), 0) / categoryEntries.length)
    : 0;

  const sortedCategories = [...categoryEntries].sort(([, a], [, b]) => (Number(b) || 0) - (Number(a) || 0));
  
  const strongestDimension = sortedCategories.length > 0 
    ? `${sortedCategories[0][0].charAt(0).toUpperCase() + sortedCategories[0][0].slice(1)} (${Number(sortedCategories[0][1]) || 0}%)` 
    : "N/A";
  
  const weakestDimension = sortedCategories.length > 0 
    ? `${sortedCategories[sortedCategories.length - 1][0].charAt(0).toUpperCase() + sortedCategories[sortedCategories.length - 1][0].slice(1)} (${Number(sortedCategories[sortedCategories.length - 1][1]) || 0}%)` 
    : "N/A";

  return (
    <motion.div whileHover={{ y: -5 }} className="transition-transform h-full">
      <Card className="quantum-card shadow-lg h-full bg-slate-50/50 dark:bg-slate-800/50 border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChartBig className="h-5 w-5 text-green-500" />
            Sumário da Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <DetailItem label="Data da Análise" value={formatDate(analysisDate)} />
            <DetailItem label="ID da Análise" value={<span className="text-xs font-mono">{analysisId || "N/A"}</span>} />
            <DetailItem label="Média Quântica Global" value={`${averageScore}%`} highlight />
            <DetailItem label="Dimensão Mais Forte" value={strongestDimension} />
            <DetailItem label="Dimensão a Desenvolver" value={weakestDimension} />
          </dl>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalysisInfoCard;