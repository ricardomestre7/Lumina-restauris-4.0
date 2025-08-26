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
import { ActivitySquare, Info } from 'lucide-react';

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

const calculateAverage = (categories) => {
    if (!categories || Object.keys(categories).length === 0) return 0;
    const values = Object.values(categories);
    const sum = values.reduce((acc, val) => acc + (val || 0), 0);
    return Math.round(sum / values.length);
};

const OverallProgressChart = ({ historyData }) => {
  if (!historyData || historyData.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 dark:from-pink-400 dark:to-orange-400 flex items-center justify-center print-title">
              <Info className="mr-2 h-7 w-7" />
              Progresso Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">São necessárias pelo menos duas análises para exibir o gráfico de progresso geral.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const validAnalyses = historyData.filter(analysis => analysis?.results?.categories && Object.keys(analysis.results.categories).length > 0).reverse();

  if (validAnalyses.length < 2) {
     return (
        <Card className="quantum-card bg-card dark:bg-slate-800/80 shadow-xl mt-6 border border-amber-500/50 dark:border-amber-400/50 border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 flex items-center justify-center print-title">
              <Info className="mr-2 h-7 w-7" />
              Dados Incompletos para Progresso
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">Não há análises suficientes com dados válidos para gerar este gráfico.</p>
          </CardContent>
        </Card>
    );
  }

  const labels = validAnalyses.map((analysis, index) => {
    const date = new Date(analysis.created_at);
    return `${date.toLocaleDateString('pt-BR')} (Análise ${index + 1})`;
  });
  
  const averageScores = validAnalyses.map(analysis => calculateAverage(analysis.results.categories));

  const chartDataConfig = {
    labels: labels,
    datasets: [{
      label: 'Pontuação Média Geral',
      data: averageScores,
      fill: true,
      backgroundColor: 'rgba(236, 72, 153, 0.2)',
      borderColor: 'rgba(236, 72, 153, 1)',
      tension: 0.3,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBorderWidth: 2,
      pointBackgroundColor: '#fff',
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'hsl(var(--border) / 0.5)' },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          stepSize: 20,
          font: { size: 10 },
          callback: (value) => `${value}%`
        }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'hsl(var(--muted-foreground))', font: { size: 10 } }
      }
    },
    plugins: {
      legend: {
        display: false,
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
          label: (context) => `Média Geral: ${context.raw}%`
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
          <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 dark:from-pink-400 dark:to-orange-400 flex items-center justify-center print-title">
            <ActivitySquare className="mr-2 h-7 w-7" />
            Progresso Geral do Paciente
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Média geral dos níveis energéticos ao longo do tempo.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] md:h-[450px] p-4 relative">
          <Line data={chartDataConfig} options={chartOptions} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OverallProgressChart;