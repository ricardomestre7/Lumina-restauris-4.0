import React from 'react';
import { Sparkles, Brain, Leaf, Music, BookOpen, Zap, ShieldCheck, Sun, Wind, HeartPulse, Eye, GitBranch } from 'lucide-react';
import { cn } from "@/lib/utils";

const PhaseDetail = ({ icon: Icon, title, description, narration, colorClass = "text-indigo-600 dark:text-indigo-400", borderClass = "border-indigo-200 dark:border-indigo-700/50", bgClass = "bg-indigo-50/30 dark:bg-indigo-900/20" }) => (
  <div className={`mb-3 p-3 rounded-lg border ${borderClass} ${bgClass}`}>
    <div className="flex items-center mb-1">
      <Icon className={`h-5 w-5 mr-2 ${colorClass}`} />
      <h5 className={`text-md font-semibold ${colorClass}`}>{title}</h5>
    </div>
    <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">{description}</p>
    {narration && <p className={`text-2xs italic ${colorClass}/80`}>"{narration}"</p>}
  </div>
);

const MeditationPhase2 = ({ content }) => {
  const renderParsedContent = () => {
    if (!content) {
      return <p className="text-slate-500 dark:text-slate-400">Conteúdo da meditação não disponível.</p>;
    }
    
    const paragraphs = content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') {
        return <br key={`br-${index}`} />;
      }
      return <p key={`p-${index}`} className="leading-relaxed mb-2 text-sm">{paragraph}</p>;
    });

    return <div className="space-y-3">{paragraphs}</div>;
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-slate-800 dark:via-blue-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-6 text-center">
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight mb-1",
          "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-600",
          "dark:from-blue-400 dark:via-teal-400 dark:to-cyan-400"
        )}>
          MEDITAÇÃO GUIADA - FASE 2
        </h1>
        <p className="text-md font-medium text-teal-500 dark:text-teal-300">Dissolução e Transformação</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Protocolo Lumina Restauris - Desenvolvido por Mestre Ricardo</p>
      </header>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center">
          <Music size={24} className="mr-2 text-blue-500" /> Sobre esta Meditação
        </h2>
        <div className="space-y-1 text-sm">
          <p className="leading-relaxed">
            Esta meditação guiada de 10 minutos é para a Fase 2: Dissolução e Transformação. O foco é trabalhar profundamente com camadas emocionais e energéticas, utilizando a respiração e visualização da chama violeta para transmutar padrões antigos.
          </p>
          <h3 className="text-base font-medium text-blue-600 dark:text-blue-400 pt-2">Recomendações:</h3>
          <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
            <li>Encontre um espaço sereno onde não será interrompido.</li>
            <li>Fones de ouvido são recomendados para imersão total.</li>
            <li>Pratique diariamente, idealmente antes da fórmula correspondente à Fase 2.</li>
          </ul>
        </div>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-sky-200 dark:border-sky-700">
        <h2 className="text-xl font-semibold mb-3 text-sky-700 dark:text-sky-300 flex items-center">
          <GitBranch size={24} className="mr-2 text-sky-500" /> A Jornada da Fase 2
        </h2>
        <PhaseDetail 
            icon={Wind}
            title="Renovação da Energia"
            description="Liberação de antigos padrões e o despertar de novas forças internas, revitalizando todo o ser."
            narration="Velhos campos se dissolvem. Novas forças se erguem dentro de você."
            colorClass="text-sky-600 dark:text-sky-400"
            borderClass="border-sky-200 dark:border-sky-700/50"
            bgClass="bg-sky-50/30 dark:bg-sky-900/20"
          />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          A Fase 2 concentra-se na transmutação de energias densas e na liberação de bloqueios emocionais e mentais.
        </p>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-teal-200 dark:border-teal-700">
        <h2 className="text-xl font-semibold mb-3 text-teal-700 dark:text-teal-300 flex items-center">
          <Zap size={24} className="mr-2 text-teal-500" /> Roteiro da Meditação
        </h2>
        <p className="italic text-xs mb-3 text-slate-500 dark:text-slate-400">[Música suave de transmutação - Frequência da Chama Violeta]</p>
        {renderParsedContent()}
      </section>

      <section className="mt-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-cyan-200 dark:border-cyan-700">
        <h2 className="text-xl font-semibold mb-3 text-cyan-700 dark:text-cyan-300 flex items-center">
          <BookOpen size={24} className="mr-2 text-cyan-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
          <li>Permita-se sentir e liberar emoções que surgirem.</li>
          <li>Confie no processo de transmutação e na sabedoria do seu corpo.</li>
          <li>Anote suas percepções e transformações no Diário de Bordo.</li>
        </ul>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Protocolo Lumina Restauris - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default MeditationPhase2;