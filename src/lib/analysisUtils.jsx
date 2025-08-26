import React from 'react';

const answerOptionsGeneric = [
  { value: "1", label: "Muito Baixo / Discordo Totalmente" },
  { value: "2", label: "Baixo / Discordo Parcialmente" },
  { value: "3", label: "Moderado / Neutro" },
  { value: "4", label: "Bom / Concordo Parcialmente" },
  { value: "5", label: "Excelente / Concordo Totalmente" }
];

const answerOptionsFrequency = [
  { value: "1", label: "Nunca / Raramente" },
  { value: "2", label: "Às Vezes" },
  { value: "3", label: "Moderadamente" },
  { value: "4", label: "Frequentemente" },
  { value: "5", label: "Sempre / Quase Sempre" }
];

const answerOptionsQuality = [
  { value: "1", label: "Muito Ruim" },
  { value: "2", label: "Ruim" },
  { value: "3", label: "Regular" },
  { value: "4", label: "Boa" },
  { value: "5", label: "Excelente" }
];

const answerOptionsYesNoFrequency = [
  { value: "1", label: "Não, raramente" },
  { value: "2", label: "Não, às vezes" },
  { value: "3", label: "Sim, moderadamente" },
  { value: "4", label: "Sim, frequentemente" },
  { value: "5", label: "Sim, consistentemente" }
];

export const quantumQuestions = {
  energetico: [
    { id: "energetico_1", question: "Como você avalia seu nível de energia geral ao longo do dia?", answerOptions: answerOptionsQuality },
    { id: "energetico_2", question: "Com que frequência você se sente exausto(a) sem um motivo aparente?", answerOptions: answerOptionsFrequency },
    { id: "energetico_3", question: "Como você avalia sua capacidade de recuperação após atividades físicas ou mentais intensas?", answerOptions: answerOptionsQuality },
    { id: "energetico_4", question: "Você sente que sua energia vital flui livremente e de forma equilibrada pelo seu corpo?", answerOptions: answerOptionsGeneric },
    { id: "energetico_5", question: "Como você classifica sua vitalidade e disposição em comparação com períodos anteriores da sua vida ou com pessoas da sua idade?", answerOptions: answerOptionsQuality }
  ],
  emocional: [
    { id: "emocional_1", question: "Como você avalia sua capacidade de lidar com situações de estresse e pressão?", answerOptions: answerOptionsQuality },
    { id: "emocional_2", question: "Com que frequência você experimenta mudanças bruscas de humor ou se sente emocionalmente sobrecarregado(a)?", answerOptions: answerOptionsFrequency },
    { id: "emocional_3", question: "Você consegue identificar, expressar e processar suas emoções de forma saudável e construtiva?", answerOptions: answerOptionsYesNoFrequency },
    { id: "emocional_4", question: "Como você avalia sua estabilidade emocional e sua capacidade de manter a calma em desafios?", answerOptions: answerOptionsQuality },
    { id: "emocional_5", question: "Você se sente genuinamente conectado(a) emocionalmente com as pessoas importantes em sua vida?", answerOptions: answerOptionsYesNoFrequency }
  ],
  mental: [
    { id: "mental_1", question: "Como você avalia sua clareza mental e capacidade de concentração em tarefas cotidianas ou complexas?", answerOptions: answerOptionsQuality },
    { id: "mental_2", question: "Com que frequência você tem dificuldade para tomar decisões ou sente sua mente confusa?", answerOptions: answerOptionsFrequency },
    { id: "mental_3", question: "Você consegue manter o foco em uma tarefa por períodos adequados sem se distrair facilmente?", answerOptions: answerOptionsYesNoFrequency },
    { id: "mental_4", question: "Como você avalia sua memória de curto e longo prazo e sua capacidade de aprendizado?", answerOptions: answerOptionsQuality },
    { id: "mental_5", question: "Você se sente mentalmente estimulado(a) e engajado(a) pelas suas atividades diárias e projetos?", answerOptions: answerOptionsYesNoFrequency }
  ],
  fisico: [
    { id: "fisico_1", question: "Como você avalia sua saúde física geral e bem-estar corporal?", answerOptions: answerOptionsQuality },
    { id: "fisico_2", question: "Com que frequência você sente dores, desconfortos físicos ou sintomas de mal-estar?", answerOptions: answerOptionsFrequency },
    { id: "fisico_3", question: "Como está a qualidade do seu sono (facilidade para dormir, sono contínuo, despertar descansado)?", answerOptions: answerOptionsQuality },
    { id: "fisico_4", question: "Você pratica atividades físicas regularmente e de forma prazerosa?", answerOptions: answerOptionsYesNoFrequency },
    { id: "fisico_5", question: "Como você avalia seus hábitos alimentares em termos de nutrição e equilíbrio?", answerOptions: answerOptionsQuality }
  ],
  espiritual: [
    { id: "espiritual_1", question: "Você se sente conectado(a) com um propósito maior em sua vida ou com algo transcendente?", answerOptions: answerOptionsYesNoFrequency },
    { id: "espiritual_2", question: "Com que frequência você dedica tempo para práticas que nutrem sua espiritualidade (meditação, oração, contato com a natureza, etc.)?", answerOptions: answerOptionsFrequency },
    { id: "espiritual_3", question: "Você encontra significado, contentamento e propósito nas suas experiências e em sua jornada de vida?", answerOptions: answerOptionsYesNoFrequency },
    { id: "espiritual_4", question: "Como você avalia seu nível de paz interior, serenidade e aceitação?", answerOptions: answerOptionsQuality },
    { id: "espiritual_5", question: "Você se sente em harmonia com o universo, com os ciclos da natureza e com as pessoas ao seu redor?", answerOptions: answerOptionsYesNoFrequency }
  ]
};

export const generateRecommendations = (results, answers) => {
  const recommendations = [];
  const lowThreshold = 40; 
  const midThreshold = 60;

  if (results.energetico < lowThreshold) {
    recommendations.push("Seu nível energético está baixo. Considere práticas como meditação focada em energia, exercícios de respiração (pranayamas) e garantir um sono reparador.");
  } else if (results.energetico < midThreshold) {
    recommendations.push("Para otimizar seu campo energético, explore técnicas de bioenergética ou acupuntura, e observe momentos de descanso durante o dia.");
  }

  if (results.emocional < lowThreshold) {
    recommendations.push("O equilíbrio emocional parece ser um ponto de atenção. Técnicas de mindfulness, terapia ou coaching emocional podem ser muito benéficas.");
  } else if (results.emocional < midThreshold) {
    recommendations.push("Para fortalecer sua resiliência emocional, pratique a escrita terapêutica ou dedique tempo a hobbies que lhe tragam alegria e relaxamento.");
  }

  if (results.mental < lowThreshold) {
    recommendations.push("Sua clareza mental pode ser aprimorada. Experimente exercícios de foco, como quebra-cabeças ou leitura concentrada, e reduza multitarefas.");
  } else if (results.mental < midThreshold) {
    recommendations.push("Para um estado mental mais aguçado, considere aprender algo novo, praticar a meditação de atenção plena ou organizar seu ambiente de trabalho/estudo.");
  }

  if (results.fisico < lowThreshold) {
    recommendations.push("Seu corpo físico pede atenção. Inicie uma rotina de atividades físicas leves e revise seus hábitos alimentares, buscando opções mais nutritivas.");
  } else if (results.fisico < midThreshold) {
    recommendations.push("Para melhorar seu bem-estar físico, aumente a intensidade ou frequência de seus exercícios e explore alimentos integrais e hidratação adequada.");
  }
  
  if (answers['fisico_3'] && parseInt(answers['fisico_3']) <= 2) {
    recommendations.push("A qualidade do seu sono parece ser um desafio. Crie uma rotina relaxante antes de dormir, evite cafeína à noite e garanta um ambiente escuro e silencioso.");
  }
  if (answers['fisico_5'] && parseInt(answers['fisico_5']) <= 2) {
    recommendations.push("Seus hábitos alimentares podem ser melhorados. Considere consultar um nutricionista ou pesquisar sobre dietas balanceadas e ricas em nutrientes.");
  }

  if (results.espiritual < lowThreshold) {
    recommendations.push("Sua conexão espiritual pode ser aprofundada. Dedique tempo a práticas contemplativas, contato com a natureza ou atividades que nutram sua alma.");
  } else if (results.espiritual < midThreshold) {
    recommendations.push("Para expandir sua dimensão espiritual, explore filosofias de vida, participe de grupos com interesses similares ou pratique a gratidão diariamente.");
  }
  
  if (Object.values(results).every(value => value >= midThreshold)) {
    recommendations.push("Parabéns! Seus campos quânticos mostram um bom equilíbrio. Continue nutrindo todas as suas dimensões e explore práticas avançadas de harmonização se desejar ir além.");
  } else if (recommendations.length === 0) {
    recommendations.push("Seus campos quânticos estão em um estado geral positivo. Continue com suas práticas de bem-estar e observe as áreas que podem ser sutilmente aprimoradas.");
  }
  
  return recommendations;
};

export const answerOptions = [
  { value: "1", label: "Muito baixo" },
  { value: "2", label: "Baixo" },
  { value: "3", label: "Moderado" },
  { value: "4", label: "Bom" },
  { value: "5", label: "Excelente" }
];