import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const TitleSection = ({ title, description }) => (
  <div>
    <h1 
      className={cn(
        "text-3xl font-bold tracking-tight",
        "bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500",
        "dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400"
      )}
    >
      {title}
    </h1>
    {description && <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm md:text-base">{description}</p>}
  </div>
);

const BackButton = ({ onBack }) => (
  <Button 
    variant="outline" 
    size="icon" 
    onClick={onBack}
    className={cn(
      "rounded-full shadow-sm transition-all duration-200 ease-in-out",
      "border-slate-300 dark:border-slate-600",
      "text-purple-600 dark:text-purple-400",
      "hover:bg-purple-100 dark:hover:bg-slate-700 hover:shadow-md hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    )}
    aria-label="Voltar"
  >
    <ArrowLeft className="h-5 w-5" />
  </Button>
);

const ActionsSection = ({ actions }) => (
  <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
    {actions}
  </div>
);

const PageHeader = ({ title, description, onBack, actions, icon: Icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
      className={cn(
        "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8", 
        "p-5 md:p-6 rounded-xl shadow-lg",
        "bg-gradient-to-br from-white via-purple-50 to-indigo-50",
        "dark:from-slate-800/70 dark:via-purple-900/60 dark:to-slate-800/70 backdrop-blur-sm",
        "border border-purple-100 dark:border-slate-700/50"
      )}
    >
      <div className="flex items-center gap-3 md:gap-4">
        {onBack && <BackButton onBack={onBack} />}
        {Icon && React.cloneElement(Icon, { className: cn("h-8 w-8 md:h-10 md:w-10 text-purple-500 dark:text-purple-400", Icon.props.className) })}
        <TitleSection title={title} description={description} />
      </div>
      {actions && <ActionsSection actions={actions} />}
    </motion.div>
  );
};

export default PageHeader;