import React from 'react';
import { Sparkles, Brain, Leaf, Music, BookOpen, Zap, Sun, Wind, HeartPulse, Eye, GitBranch } from 'lucide-react';
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

const MeditationPhase1 = ({ content }) => {
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
    <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-slate-800 dark:via-purple-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-6 text-center">
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight mb-1",
          "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600",
          "dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400"
        )}>
          MEDITAÇÃO GUIADA - FASE 1
        </h1>
        <p className="text-md font-medium text-indigo-500 dark:text-indigo-300">Liberação e Preparação</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Protocolo Lumina Restauris - Desenvolvido por Mestre Ricardo</p>
      </header>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300 flex items-center">
          <Music size={24} className="mr-2 text-purple-500" /> Sobre esta Meditação
        </h2>
        <div className="space-y-1 text-sm">
          <p className="leading-relaxed">
            Esta meditação guiada de 10 minutos foi especialmente desenvolvida para a Fase 1 do Protocolo Lumina Restauris. Seu objetivo é acalmar a mente, encontrar seu centro energético e preparar seu campo para o processo de liberação.
          </p>
          <h3 className="text-base font-medium text-purple-600 dark:text-purple-400 pt-2">Recomendações:</h3>
          <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
            <li>Escolha um local tranquilo e confortável.</li>
            <li>Use fones de ouvido para uma experiência mais imersiva.</li>
            <li>Pratique preferencialmente pela manhã, antes de tomar a fórmula Lumina Libertas.</li>
            <li>Repita diariamente durante toda a Fase 1.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-semibold mb-3 text-amber-700 dark:text-amber-300 flex items-center">
          <GitBranch size={24} className="mr-2 text-amber-500" /> A Jornada da Fase 1
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          "Nasce um novo tempo. O tempo da restauração. Da luz que retorna ao seu lugar original."
        </p>
        <PhaseDetail 
            icon={Sun}
            title="Restauração da Luz Interior"
            description="Um chamado sutil para o despertar da centelha divina que reside em cada um."
            narration="Um chamado sutil... A centelha desperta."
            colorClass="text-amber-600 dark:text-amber-400"
            borderClass="border-amber-200 dark:border-amber-700/50"
            bgClass="bg-amber-50/30 dark:bg-amber-900/20"
          />
         <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          Esta fase inicial foca em reconectar com sua essência e preparar o terreno para transformações mais profundas.
        </p>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-pink-200 dark:border-pink-700">
        <h2 className="text-xl font-semibold mb-3 text-pink-700 dark:text-pink-300 flex items-center">
          <Zap size={24} className="mr-2 text-pink-500" /> Roteiro da Meditação
        </h2>
        <p className="italic text-xs mb-3 text-slate-500 dark:text-slate-400">[Música suave de fundo - 432 Hz]</p>
        {renderParsedContent()}
      </section>

      <section className="mt-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-indigo-200 dark:border-indigo-700">
        <h2 className="text-xl font-semibold mb-3 text-indigo-700 dark:text-indigo-300 flex items-center">
          <BookOpen size={24} className="mr-2 text-indigo-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
          <li>Pratique esta meditação diariamente durante a Fase 1 do protocolo.</li>
          <li>Para resultados ideais, faça esta prática antes de tomar a fórmula Lumina Libertas.</li>
          <li>Mantenha um registro de suas experiências no Diário de Bordo.</li>
          <li>À medida que avança na prática, você pode notar sensações de leveza, calor ou formigamento - todas são indicadores normais do processo de liberação.</li>
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

export default MeditationPhase1;