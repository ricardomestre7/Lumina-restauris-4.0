import React from 'react';
import { Sparkles, Brain, Leaf, Music, BookOpen, Zap, ShieldCheck, Sun, Gem, Star, Wind, HeartPulse, Eye, GitBranch } from 'lucide-react';
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


const MeditationPhase4 = ({ content }) => {
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
    <div className="p-4 md:p-6 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-slate-800 dark:via-yellow-900 dark:to-slate-900 text-slate-700 dark:text-slate-300 rounded-lg shadow-inner">
      <header className="mb-6 text-center">
        <h1 className={cn(
          "text-2xl md:text-3xl font-bold tracking-tight mb-1",
          "text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-600",
          "dark:from-yellow-400 dark:via-amber-400 dark:to-orange-400"
        )}>
          MEDITAÇÃO GUIADA - FASE 4
        </h1>
        <p className="text-md font-medium text-amber-500 dark:text-amber-300">Integração e Expansão</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Protocolo Lumina Restauris - Desenvolvido por Mestre Ricardo</p>
      </header>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-yellow-200 dark:border-yellow-700">
        <h2 className="text-xl font-semibold mb-3 text-yellow-700 dark:text-yellow-300 flex items-center">
          <Music size={24} className="mr-2 text-yellow-500" /> Sobre esta Meditação
        </h2>
        <div className="space-y-1 text-sm">
          <p className="leading-relaxed">
            Chegamos à Fase 4: Integração e Expansão. Esta meditação de 10 minutos celebra sua transformação, harmoniza seu ser de luz e expande sua influência positiva no mundo.
          </p>
          <h3 className="text-base font-medium text-yellow-600 dark:text-yellow-400 pt-2">Recomendações:</h3>
          <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
            <li>Realize esta prática em um estado de gratidão e reconhecimento.</li>
            <li>Fones de ouvido ajudarão a sentir a expansão universal.</li>
            <li>Pratique diariamente, em conjunto com a fórmula da Fase 4.</li>
          </ul>
        </div>
      </section>

       <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-orange-200 dark:border-orange-700">
        <h2 className="text-xl font-semibold mb-3 text-orange-700 dark:text-orange-300 flex items-center">
          <GitBranch size={24} className="mr-2 text-orange-500" /> A Jornada da Fase 4
        </h2>
         <PhaseDetail 
            icon={Eye}
            title="A Chave: Presença Vibracional"
            description="A eficácia da jornada reside na capacidade de estar presente, de sentir. Quanto mais profunda a conexão com o sentir, mais o campo energético se expande e se abre para a transformação."
            narration="A chave é a presença. Quanto mais você sente, mais o campo se abre."
            colorClass="text-orange-600 dark:text-orange-400"
            borderClass="border-orange-200 dark:border-orange-700/50"
            bgClass="bg-orange-50/30 dark:bg-orange-900/20"
          />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          A Fase 4 convida à integração de todas as transformações e à expansão da sua luz e consciência no mundo. É a celebração da sua jornada e o florescer do seu novo ser.
        </p>
      </section>

      <section className="mb-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-amber-200 dark:border-amber-700">
        <h2 className="text-xl font-semibold mb-3 text-amber-700 dark:text-amber-300 flex items-center">
          <Star size={24} className="mr-2 text-amber-500" /> Roteiro da Meditação
        </h2>
        <p className="italic text-xs mb-3 text-slate-500 dark:text-slate-400">[Música cósmica e expansiva - Frequências de unidade]</p>
        {renderParsedContent()}
      </section>

      <section className="mt-6 p-4 bg-white/70 dark:bg-slate-700/50 rounded-xl shadow-lg border border-orange-200 dark:border-orange-700">
        <h2 className="text-xl font-semibold mb-3 text-orange-700 dark:text-orange-300 flex items-center">
          <BookOpen size={24} className="mr-2 text-orange-500" /> Recomendações Adicionais
        </h2>
        <ul className="list-disc list-inside space-y-1 pl-3 text-xs">
          <li>Sinta a plenitude da sua nova versão e seu compromisso de viver a partir dela.</li>
          <li>Visualize seu futuro radiante e o impacto positivo que você terá.</li>
          <li>Continue sua jornada de evolução com alegria e propósito, utilizando o Diário de Bordo.</li>
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

export default MeditationPhase4;