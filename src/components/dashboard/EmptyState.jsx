import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const EmptyState = ({ searchTerm, onNewPatient }) => {
  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
      <Card className="quantum-card">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-16 w-16 text-muted-foreground mb-6" />
          <h3 className="text-xl font-semibold mb-2">
            {searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente cadastrado'}
          </h3>
          <p className="mb-6 text-muted-foreground max-w-sm">
            {searchTerm 
              ? 'Tente refinar sua busca ou adicione novos pacientes para começar.' 
              : 'Adicione seu primeiro paciente para iniciar as medições quânticas.'}
          </p>
          <Button onClick={onNewPatient} size="lg" className="quantum-glow shadow-lg">
            <UserPlus className="mr-2 h-5 w-5" />
            Adicionar Paciente
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmptyState;