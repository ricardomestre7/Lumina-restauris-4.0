import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import QuantumQuestionnaire from '@/components/quantumAnalysis/QuantumQuestionnaire';
import { quantumQuestions } from '@/lib/dataManager'; 

const QuantumAnalysisTabs = ({
  currentTab, 
  onTabChange, 
  answers,
  onAnswerChange, 
  onSubmit, 
  isSubmitting,
  isFormComplete 
}) => {

  const tabKeys = Object.keys(quantumQuestions);

  const isTabCompleteCheck = (tabName) => {
    if (!quantumQuestions[tabName]) return false;
    const tabQuestions = quantumQuestions[tabName];
    return tabQuestions.every(q => answers[q.id] !== undefined && answers[q.id] !== "");
  };

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
        {tabKeys.map((category) => (
          <TabsTrigger 
            key={category} 
            value={category}
            className={`capitalize ${isTabCompleteCheck(category) ? "text-primary font-semibold border-primary" : "text-muted-foreground"}`}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabKeys.map((category) => (
        <TabsContent key={category} value={category} className="mt-4">
          <QuantumQuestionnaire
            category={category}
            questions={quantumQuestions[category] || []}
            answers={answers}
            onAnswerChange={onAnswerChange} 
            onNextTab={() => {
              const currentIndex = tabKeys.indexOf(category);
              if (currentIndex < tabKeys.length - 1) {
                onTabChange(tabKeys[currentIndex + 1]);
              }
            }}
            onPrevTab={() => {
              const currentIndex = tabKeys.indexOf(category);
              if (currentIndex > 0) {
                onTabChange(tabKeys[currentIndex - 1]);
              }
            }}
            isFirstTab={tabKeys.indexOf(category) === 0}
            isLastTab={tabKeys.indexOf(category) === tabKeys.length - 1}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isFormComplete={isFormComplete}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default QuantumAnalysisTabs;