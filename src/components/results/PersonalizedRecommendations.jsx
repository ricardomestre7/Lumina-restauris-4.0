import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const PersonalizedRecommendations = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="quantum-card shadow-lg mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Recomendações Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Seus campos quânticos estão bem equilibrados. Continue com suas práticas atuais e mantenha seu bem-estar!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="quantum-card shadow-lg mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Recomendações Quânticas Personalizadas
        </CardTitle>
        <CardDescription>
          Orientações para otimizar seu campo energético e bem-estar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 list-none pl-0">
          {recommendations.map((rec, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start p-3 rounded-md bg-accent/50 hover:bg-accent/70 transition-colors"
            >
              <span className="text-primary mr-3 text-xl font-bold">•</span>
              <span className="text-sm text-foreground">{rec}</span>
            </motion.li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-3 mt-4">
        Estas são sugestões baseadas na sua análise. Consulte um profissional para orientação individualizada.
      </CardFooter>
    </Card>
  );
};

export default PersonalizedRecommendations;