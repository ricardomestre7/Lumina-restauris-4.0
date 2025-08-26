import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const QuantumQuestionnaire = ({
  category,
  questions,
  answers,
  onAnswerChange,
  onNextTab,
  onPrevTab,
  isFirstTab,
  isLastTab,
  onSubmit,
  isSubmitting,
  isFormComplete
}) => {
  return (
    <motion.div 
      key={category}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pt-4"
    >
      {questions.map((q, index) => (
        <motion.div 
          key={q.id} 
          className="space-y-3 p-4 border rounded-lg shadow-sm bg-background/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Label className="text-base font-semibold text-foreground">{q.question}</Label>
          <RadioGroup
            value={answers[q.id]}
            onValueChange={(value) => onAnswerChange(q.id, value)}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-3"
          >
            {(q.answerOptions || []).map((option) => (
              <motion.div 
                key={option.value} 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-primary/30"
                whileHover={{ scale: 1.03 }}
              >
                <RadioGroupItem value={option.value} id={`${q.id}-${option.value}`} className="border-primary text-primary focus:ring-primary"/>
                <Label htmlFor={`${q.id}-${option.value}`} className="text-sm font-medium text-foreground cursor-pointer flex-1">
                  {option.label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </motion.div>
      ))}
      
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevTab}
          disabled={isFirstTab || isSubmitting}
          className="shadow-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        
        {isLastTab ? (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!isFormComplete || isSubmitting}
            className="quantum-glow shadow-lg"
          >
            {isSubmitting ? (
              "Processando..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Finalizar Análise
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNextTab}
            disabled={isSubmitting}
            className="shadow-md"
          >
            Próximo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default QuantumQuestionnaire;