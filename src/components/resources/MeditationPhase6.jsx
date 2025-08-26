import React from 'react';
import { Zap, BookOpen, GitBranch, HeartPulse, Sparkles, Lightbulb, User } from 'lucide-react';
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

const MeditationPhase6 = ({ content }) => {
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
    <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 dark:from-slate-800 dark:via-blue-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-6 text-center">
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight mb-1",
          "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-600",
          "dark:from-blue-400 dark:via-teal-400 dark:to-green-400"
        )}>
          JORNADA CONSCIENTE - FASE 6
        </h1>
        <p className="text-md font-medium text-teal-500 dark:text-teal-300">Encerramento e Continuidade</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Protocolo Lumina Restauris - Desenvolvido por Mestre Ricardo</p>
      </header>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center">
          <Zap size={24} className="mr-2 text-blue-500" /> Sobre Esta Fase
        </h2>
        <div className="space-y-1 text-sm">
          <p className="leading-relaxed">
            Esta fase final marca o encerramento consciente da jornada principal do Protocolo Lumina Restauris. É um convite para reconhecer e consolidar todas as transformações, compreendendo que o fim de um ciclo é o início de uma nova autonomia vibracional.
          </p>
          <h3 className="text-base font-medium text-blue-600 dark:text-blue-400 pt-2">Recomendações:</h3>
          <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
            <li>Honre seu caminho e celebre cada descoberta.</li>
            <li>Incorpore a autonomia vibracional em seu dia a dia.</li>
            <li>Esteja aberto para novas expansões e jornadas futuras.</li>
          </ul>
        </div>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-teal-200 dark:border-teal-700">
        <h2 className="text-xl font-semibold mb-3 text-teal-700 dark:text-teal-300 flex items-center">
          <GitBranch size={24} className="mr-2 text-teal-500" /> A Jornada da Fase 6
        </h2>
         <PhaseDetail 
            icon={HeartPulse}
            title="Encerramento Consciente"
            description="A jornada chega ao fim como um portal que se abre, não como um fim definitivo. Tudo que foi ativado permanece vivo, pulsando e podendo ser acessado sempre que necessário. Esta fase final é um convite à continuidade, agora com autonomia vibracional."
            narration="O que despertei, vive em mim. A jornada continua dentro do meu campo."
            colorClass="text-teal-600 dark:text-teal-400"
            borderClass="border-teal-200 dark:border-teal-700/50"
            bgClass="bg-teal-50/30 dark:bg-teal-900/20"
          />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          A Fase 6 é sobre consolidar as novas vibrações e reconhecer-se como o mestre de seu próprio campo vibracional. É o ponto de partida para uma vida de autonomia e expansão contínua.
        </p>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-green-200 dark:border-green-700">
        <h2 className="text-xl font-semibold mb-3 text-green-700 dark:text-green-300 flex items-center">
          <Lightbulb size={24} className="mr-2 text-green-500" /> Roteiro de Encerramento
        </h2>
        <p className="italic text-xs mb-3 text-slate-500 dark:text-slate-400">[Música de paz e plenitude para o encerramento da jornada]</p>
        {renderParsedContent()}
      </section>

      <section className="mt-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center">
          <BookOpen size={24} className="mr-2 text-blue-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
          <li>Mantenha um diário para registrar suas percepções contínuas.</li>
          <li>Revisite as fases anteriores sempre que sentir necessidade.</li>
          <li>Continue explorando recursos que ressoem com sua nova frequência.</li>
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

export default MeditationPhase6;