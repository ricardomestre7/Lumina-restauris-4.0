import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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

const QuantumCharts = ({ analysisData }) => {
  const categoriesData = analysisData?.results?.categories;

  if (!analysisData || !categoriesData || Object.keys(categoriesData).length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="quantum-card bg-white dark:bg-slate-800 shadow-xl border-red-500/50 dark:border-red-400/50 border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 flex items-center justify-center print-title">
              <AlertTriangle className="mr-2 h-7 w-7" />
              Visualização Indisponível
            </CardTitle>
            <CardDescription className="text-center text-slate-600 dark:text-slate-400">
              Não foi possível carregar os dados para o gráfico de radar.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">
              Verifique se há uma análise válida com todas as categorias de resultados preenchidas ou se a análise mais recente foi concluída corretamente.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const labels = Object.keys(categoriesData).map(key => categoryLabels[key] || key.charAt(0).toUpperCase() + key.slice(1));
  const dataValues = Object.values(categoriesData);

  const chartDataConfig = {
    labels: labels,
    datasets: [
      {
        label: 'Nível Energético (%)',
        data: dataValues,
        backgroundColor: 'rgba(167, 139, 250, 0.3)', 
        borderColor: 'rgba(124, 58, 237, 1)', 
        borderWidth: 2,
        pointBackgroundColor: 'rgba(124, 58, 237, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(124, 58, 237, 1)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(100, 116, 139, 0.3)', 
        },
        grid: {
          color: 'rgba(100, 116, 139, 0.2)', 
        },
        pointLabels: {
          font: {
            size: 12,
            weight: '600',
          },
          color: 'hsl(var(--foreground) / 0.8)', 
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'hsla(var(--background) / 0.75)', 
          color: 'hsl(var(--muted-foreground))', 
          stepSize: 20,
          font: {
            size: 10,
          }
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'hsl(var(--foreground))', 
          font: {
            size: 14,
            weight: '500',
          }
        }
      },
      tooltip: {
        backgroundColor: 'hsla(var(--background), 0.8)',
        titleColor: 'hsl(var(--foreground))',
        bodyColor: 'hsl(var(--foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 10,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl overflow-hidden border border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 print-title">
            Visualização Quântica
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Representação gráfica dos níveis energéticos da análise mais recente.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] md:h-[450px] p-4 relative">
          <Radar data={chartDataConfig} options={chartOptions} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuantumCharts;