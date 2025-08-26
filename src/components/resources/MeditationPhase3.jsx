import React from 'react';
import { Sparkles, Brain, Leaf, Music, BookOpen, Zap, ShieldCheck, Sun, Gem, Wind, HeartPulse, Eye, GitBranch } from 'lucide-react';
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

const MeditationPhase3 = ({ content }) => {
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
    <div className="p-4 md:p-6 bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 dark:from-slate-800 dark:via-green-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-6 text-center">
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight mb-1",
          "text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-emerald-600",
          "dark:from-green-400 dark:via-lime-400 dark:to-emerald-400"
        )}>
          MEDITAÇÃO GUIADA - FASE 3
        </h1>
        <p className="text-md font-medium text-lime-500 dark:text-lime-300">Reconstrução e Ativação</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Protocolo Lumina Restauris - Desenvolvido por Mestre Ricardo</p>
      </header>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-green-200 dark:border-green-700">
        <h2 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center">
          <Music size={24} className="mr-2 text-green-500" /> Sobre esta Meditação
        </h2>
        <div className="space-y-1 text-sm">
          <p className="leading-relaxed">
            Bem-vindo à Fase 3: Reconstrução e Ativação. Esta meditação de 10 minutos visa construir novas fundações energéticas, integrar mente-coração-corpo e ativar seus centros superiores de consciência.
          </p>
          <h3 className="text-base font-medium text-green-600 dark:text-green-400 pt-2">Recomendações:</h3>
          <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
            <li>Escolha um momento de quietude para se conectar profundamente.</li>
            <li>A utilização de fones de ouvido pode intensificar a experiência.</li>
            <li>Pratique diariamente, alinhado com a fórmula da Fase 3.</li>
          </ul>
        </div>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-emerald-200 dark:border-emerald-700">
        <h2 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300 flex items-center">
          <GitBranch size={24} className="mr-2 text-emerald-500" /> A Jornada da Fase 3
        </h2>
         <PhaseDetail 
            icon={HeartPulse}
            title="Auto Regeneração"
            description="O corpo físico e a alma se realinham e se reorganizam, promovendo uma cura profunda e integrada."
            narration="O corpo responde. A alma se reorganiza."
            colorClass="text-emerald-600 dark:text-emerald-400"
            borderClass="border-emerald-200 dark:border-emerald-700/50"
            bgClass="bg-emerald-50/30 dark:bg-emerald-900/20"
          />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
         A Fase 3 é sobre consolidar as mudanças, fortalecer seu campo energético e ativar potenciais adormecidos.
        </p>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-lime-200 dark:border-lime-700">
        <h2 className="text-xl font-semibold mb-3 text-lime-700 dark:text-lime-300 flex items-center">
          <Gem size={24} className="mr-2 text-lime-500" /> Roteiro da Meditação
        </h2>
        <p className="italic text-xs mb-3 text-slate-500 dark:text-slate-400">[Música cristalina e harmônica - Frequências de ativação]</p>
        {renderParsedContent()}
      </section>

      <section className="mt-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-emerald-200 dark:border-emerald-700">
        <h2 className="text-xl font-semibold mb-3 text-emerald-700 dark:text-emerald-300 flex items-center">
          <BookOpen size={24} className="mr-2 text-emerald-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
          <li>Sinta a solidez das suas novas fundações energéticas.</li>
          <li>Observe os insights e novas capacidades que podem surgir.</li>
          <li>Registre suas experiências no Diário de Bordo para acompanhar sua evolução.</li>
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

export default MeditationPhase3;