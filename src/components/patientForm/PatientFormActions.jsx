import React from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { UserPlus, Edit3, Loader2 } from 'lucide-react';

const PatientFormActions = ({ mode, isSubmitting, isLoadingData }) => {
  const buttonText = mode === 'edit' ? 'Salvar Alterações' : 'Salvar Paciente';
  const Icon = mode === 'edit' ? Edit3 : UserPlus;

  return (
    <CardFooter className="flex justify-end p-0 pt-6">
      <Button 
        type="submit" 
        className="quantum-glow bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105" 
        disabled={isSubmitting || isLoadingData}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Icon className="mr-2 h-5 w-5" />
            {buttonText}
          </>
        )}
      </Button>
    </CardFooter>
  );
};

export default PatientFormActions;