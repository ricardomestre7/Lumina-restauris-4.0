import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { motion } from 'framer-motion';
import { TrendingUp, Info } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const categoryColors = {
  energetico: 'rgba(255, 99, 132, 0.7)', 
  emocional: 'rgba(54, 162, 235, 0.7)', 
  mental: 'rgba(255, 206, 86, 0.7)', 
  fisico: 'rgba(75, 192, 192, 0.7)', 
  espiritual: 'rgba(153, 102, 255, 0.7)', 
};

const categoryBorderColors = {
  energetico: 'rgb(255, 99, 132)',
  emocional: 'rgb(54, 162, 235)',
  mental: 'rgb(255, 206, 86)',
  fisico: 'rgb(75, 192, 192)',
  espiritual: 'rgb(153, 102, 255)',
};

const categoryLabels = {
  energetico: "Energético",
  emocional: "Emocional",
  mental: "Mental",
  fisico: "Físico",
  espiritual: "Espiritual",
};

const EvolutionChart = ({ historyData }) => {
  if (!historyData || historyData.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 flex items-center justify-center print-title">
              <Info className="mr-2 h-7 w-7" />
              Evolução por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">São necessárias pelo menos duas análises para exibir o gráfico de evolução.</p>
            <p className="text-sm text-muted-foreground/80 mt-2">Realize uma nova análise para acompanhar o progresso.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const validAnalyses = historyData.filter(analysis => analysis?.results?.categories && Object.keys(analysis.results.categories).length > 0).reverse();

  if (validAnalyses.length < 2) {
     return (
       <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-amber-500/50 dark:border-amber-400/50 border-2">
          <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 flex items-center justify-center print-title">
                 <Info className="mr-2 h-7 w-7" />
                  Dados Incompletos para Evolução
              </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-10">
              <p className="text-muted-foreground">O histórico de análises não contém dados de categorias suficientes para gerar o gráfico de evolução.</p>
              <p className="text-sm text-muted-foreground/80 mt-2">Verifique as análises anteriores ou realize uma nova.</p>
          </CardContent>
        </Card>
       </motion.div>
    );
  }

  const labels = validAnalyses.map((analysis, index) => {
    const date = new Date(analysis.created_at);
    return `${date.toLocaleDateString('pt-BR')} (${index + 1})`;
  });
  
  const firstValidAnalysisCategories = validAnalyses[0].results.categories;
  
  const datasets = Object.keys(firstValidAnalysisCategories).map(category => {
    const data = validAnalyses.map(analysis => {
      return analysis.results.categories[category] || 0;
    });
    return {
      label: categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1),
      data: data,
      fill: false,
      borderColor: categoryBorderColors[category] || 'rgba(0,0,0,1)',
      backgroundColor: categoryColors[category] || 'rgba(0,0,0,0.5)',
      tension: 0.2,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBorderWidth: 2,
      pointBackgroundColor: '#fff',
    };
  });

  const chartDataConfig = {
    labels: labels,
    datasets: datasets,
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'hsl(var(--border) / 0.5)', 
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))', 
          stepSize: 20,
          font: { size: 10 }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))', 
          font: { size: 10 }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'hsl(var(--foreground))', 
          font: {
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rectRounded'
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
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 overflow-hidden border border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600 dark:from-blue-400 dark:to-teal-400 flex items-center justify-center print-title">
            <TrendingUp className="mr-2 h-7 w-7" />
            Evolução por Categoria
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Progresso dos níveis energéticos ao longo das análises.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] md:h-[450px] p-4 relative">
          <Line data={chartDataConfig} options={chartOptions} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EvolutionChart;