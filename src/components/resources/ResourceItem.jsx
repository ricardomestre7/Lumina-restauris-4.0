import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getIcon } from '@/lib/iconUtils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ResourceItem = ({ resource }) => {
  const { title, description, content, icon_name, media_url, type } = resource;
  const Icon = getIcon(icon_name || 'default');

  const renderContent = () => {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground pt-2">
        {content && <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />}
      </div>
    );
  };
  
  const handleAccess = () => {
    if (media_url) {
      window.open(media_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AccordionItem value={title} className="bg-background/50 dark:bg-slate-800/50 border border-border/50 rounded-2xl shadow-sm mb-4 overflow-hidden backdrop-blur-sm">
        <AccordionTrigger className="p-6 text-left hover:no-underline hover:bg-accent/50 transition-colors">
          <div className="flex items-start md:items-center gap-4 w-full">
            <div className="p-3 bg-gradient-to-br from-primary/10 to-transparent rounded-full">
               <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-lg text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-6 pt-0">
          {renderContent()}
          {media_url ? (
            <div className="mt-4">
              <Button onClick={handleAccess} className="quantum-glow">
                {type === 'video' ? 'Assistir Vídeo' : 'Acessar Material'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
             <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">Este conteúdo estará disponível em breve. Continue acompanhando!</p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default ResourceItem;