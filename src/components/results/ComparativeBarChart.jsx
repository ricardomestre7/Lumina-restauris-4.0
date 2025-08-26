import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { BarChartHorizontal, Info, AlertTriangle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const categoryLabels = {
  energetico: "Energético",
  emocional: "Emocional",
  mental: "Mental",
  fisico: "Físico",
  espiritual: "Espiritual",
};

const ComparativeBarChart = ({ currentAnalysis, previousAnalysis }) => {
  if (!currentAnalysis?.results?.categories) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-amber-500/50 dark:border-amber-400/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 flex items-center justify-center print-title">
              <Info className="mr-2 h-6 w-6" />
              Comparativo de Análises
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Dados da análise atual insuficientes para comparação.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const currentCategories = currentAnalysis.results.categories;
  const previousCategories = previousAnalysis?.results?.categories;

  const labels = Object.keys(currentCategories).map(key => categoryLabels[key] || key.charAt(0).toUpperCase() + key.slice(1));
  
  const currentData = Object.values(currentCategories);
  const previousData = previousCategories 
    ? Object.keys(currentCategories).map(key => previousCategories[key] || 0) 
    : [];

  const datasets = [
    {
      label: `Análise Atual (${new Date(currentAnalysis.created_at).toLocaleDateString('pt-BR')})`,
      data: currentData,
      backgroundColor: 'rgba(124, 58, 237, 0.7)', 
      borderColor: 'rgba(124, 58, 237, 1)',
      borderWidth: 1,
      borderRadius: 4,
    }
  ];

  if (previousCategories && previousData.length > 0) {
    datasets.unshift({ 
      label: `Análise Anterior (${new Date(previousAnalysis.created_at).toLocaleDateString('pt-BR')})`,
      data: previousData,
      backgroundColor: 'rgba(100, 116, 139, 0.5)', 
      borderColor: 'rgba(100, 116, 139, 1)',
      borderWidth: 1,
      borderRadius: 4,
    });
  } else if (!previousAnalysis) {
     return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-sky-500/50 dark:border-sky-400/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500 dark:from-sky-400 dark:to-cyan-400 flex items-center justify-center print-title">
              <Info className="mr-2 h-6 w-6" />
              Comparativo de Análises
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Esta é a primeira análise registrada. Não há dados anteriores para comparação.</p>
            <p className="text-sm text-muted-foreground/80 mt-1">Realize uma nova análise para visualizar a evolução comparativa.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  } else if (previousAnalysis && (!previousCategories || previousData.length === 0)) {
     return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-red-500/50 dark:border-red-400/50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 flex items-center justify-center print-title">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Comparativo Indisponível
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Os dados da análise anterior estão incompletos ou ausentes.</p>
            <p className="text-sm text-muted-foreground/80 mt-1">Não é possível gerar o gráfico comparativo.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }


  const chartDataConfig = {
    labels: labels,
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', 
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'hsl(var(--border) / 0.5)',
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: { size: 10 },
          callback: function(value) {
            return value + "%"
          }
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: { size: 11 }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'hsl(var(--foreground))',
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      },
      tooltip: {
        backgroundColor: 'hsla(var(--background), 0.85)',
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 11 },
        padding: 10,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    elements: {
      bar: {
        barThickness: 'flex',
        maxBarThickness: 20, 
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 overflow-hidden border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 flex items-center justify-center print-title">
            <BarChartHorizontal className="mr-2 h-6 w-6" />
            Comparativo de Análises
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Níveis energéticos da análise atual vs. anterior.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] md:h-[400px] p-4 relative">
          <Bar data={chartDataConfig} options={chartOptions} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ComparativeBarChart;