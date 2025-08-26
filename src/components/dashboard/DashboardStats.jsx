import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Users, HeartPulse, Sparkles, Loader2 } from 'lucide-react';

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
      }
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
      }
    };

    const statItemsConfig = [
      { 
        title: "Total de Pacientes", 
        key: "total", 
        icon: <Users className="h-6 w-6 text-purple-500 dark:text-purple-400" />, 
        desc: "Pacientes cadastrados no sistema",
        colorClass: "border-purple-500/50 dark:border-purple-400/50"
      },
      { 
        title: "Saúde & Bem-Estar", 
        key: "withAnalysis", 
        icon: <HeartPulse className="h-6 w-6 text-health-green" />, 
        desc: "Pacientes com análise quântica",
        colorClass: "border-health-green/50"
      },
      { 
        title: "Conexão Divina", 
        key: "recentlyAdded", 
        icon: <Sparkles className="h-6 w-6 text-divinity-gold" />, 
        desc: "Novos pacientes (últimos 7 dias)",
        colorClass: "border-divinity-gold/50"
      }
    ];


    const DashboardStats = ({ stats }) => {
      if (!stats) {
        return (
          <div className="flex items-center justify-center p-10 col-span-full">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <p className="ml-4 text-muted-foreground">Carregando estatísticas...</p>
          </div>
        );
      }

      return (
        <motion.div 
          className="grid gap-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statItemsConfig.map((statItem) => (
            <motion.div key={statItem.key} variants={itemVariants}>
              <Card className={`quantum-card hover:shadow-xl transition-shadow duration-300 quantum-glow border-2 ${statItem.colorClass}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-semibold text-gray-700 dark:text-gray-200">
                    {statItem.title}
                  </CardTitle>
                  {statItem.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">{stats[statItem.key] ?? 0}</div>
                  <p className="text-sm text-muted-foreground">
                    {statItem.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      );
    };

    export default DashboardStats;