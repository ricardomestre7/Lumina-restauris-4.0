import React from 'react';
import { Sparkles, Brain, Leaf, Music, BookOpen, Zap, ShieldCheck, Sun, Gem, Star, Wind, HeartPulse, Eye, GitBranch, Lightbulb } from 'lucide-react';
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

const MeditationPhase5 = ({ content }) => {
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
    <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-800 dark:via-purple-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-6 text-center">
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight mb-1",
          "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-600",
          "dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400"
        )}>
          MEDITAÇÃO GUIADA - FASE 5
        </h1>
        <p className="text-md font-medium text-blue-500 dark:text-blue-300">Integração e Maestria</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Protocolo Lumina Restauris - Desenvolvido por Mestre Ricardo</p>
      </header>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300 flex items-center">
          <Music size={24} className="mr-2 text-purple-500" /> Sobre esta Meditação
        </h2>
        <div className="space-y-1 text-sm">
          <p className="leading-relaxed">
            Esta meditação de 10 minutos é o ápice da sua jornada no Protocolo Lumina Restauris. Ela visa integrar todas as transformações, estabilizar suas novas frequências e consolidar sua maestria sobre seu próprio campo vibracional.
          </p>
          <h3 className="text-base font-medium text-purple-600 dark:text-purple-400 pt-2">Recomendações:</h3>
          <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
            <li>Pratique em um estado de gratidão e reconhecimento por sua jornada.</li>
            <li>Permita-se sentir a plenitude e a expansão do seu ser.</li>
            <li>Esta meditação pode ser usada como uma prática contínua para manter sua integração.</li>
          </ul>
        </div>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-cyan-200 dark:border-cyan-700">
        <h2 className="text-xl font-semibold mb-3 text-cyan-700 dark:text-cyan-300 flex items-center">
          <GitBranch size={24} className="mr-2 text-cyan-500" /> A Jornada da Fase 5
        </h2>
         <PhaseDetail 
            icon={Sparkles}
            title="Integração Vibracional"
            description="Depois da restauração, renovação e regeneração, chega o momento de integrar todas as vibrações ativadas. Aqui, o campo se estabiliza, a consciência se amplia e o ser se torna agente ativo da sua própria expansão."
            narration="Integro tudo o que sou. Sou campo, sou presença, sou luz restaurada."
            colorClass="text-cyan-600 dark:text-cyan-400"
            borderClass="border-cyan-200 dark:border-cyan-700/50"
            bgClass="bg-cyan-50/30 dark:bg-cyan-900/20"
          />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          A Fase 5 é a culminação da sua jornada, onde você integra todas as mudanças e se torna um agente consciente da sua própria expansão e bem-estar.
        </p>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-blue-200 dark:border-blue-700">
        <h2 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300 flex items-center">
          <Lightbulb size={24} className="mr-2 text-blue-500" /> Roteiro da Meditação
        </h2>
        <p className="italic text-xs mb-3 text-slate-500 dark:text-slate-400">[Música de integração e plenitude]</p>
        {renderParsedContent()}
      </section>

      <section className="mt-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
        <h2 className="text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300 flex items-center">
          <BookOpen size={24} className="mr-2 text-purple-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
          <li>Celebre suas conquistas e a pessoa que você se tornou.</li>
          <li>Continue a aplicar os princípios do Lumina Restauris em sua vida diária.</li>
          <li>Se desejar, explore os recursos adicionais e aprofunde ainda mais sua jornada.</li>
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

export default MeditationPhase5;