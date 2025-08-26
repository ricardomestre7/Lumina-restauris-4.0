import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import { HelpCircle, UserPlus, Users, BookOpen, Settings, CheckSquare, FileText, Sparkles, Brain, Leaf, Zap, HeartPulse, Eye, GitBranch, Wind, Sun } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GuideSection = ({ title, description, children, icon: Icon, titleClassName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-8"
  >
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <CardHeader className="bg-slate-50 dark:bg-slate-800/50 p-4 md:p-6">
        <div className="flex items-center">
          {Icon && <Icon className="h-8 w-8 mr-3 text-indigo-500 dark:text-indigo-400" />}
          <div>
            <CardTitle className={`text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 ${titleClassName}`}>
              {title}
            </CardTitle>
            {description && <CardDescription className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-1">{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 text-slate-700 dark:text-slate-300 space-y-3">
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const Step = ({ number, text, subtext }) => (
  <div className="flex items-start space-x-3 mb-2">
    <div className="flex-shrink-0 h-6 w-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
      {number}
    </div>
    <div>
      <p className="text-sm md:text-base">{text}</p>
      {subtext && <p className="text-xs italic text-slate-500 dark:text-slate-400 mt-0.5">{subtext}</p>}
    </div>
  </div>
);

const LuminaStep = ({ icon: Icon, title, description, narration }) => (
  <div className="mb-4 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700/50 bg-indigo-50/30 dark:bg-indigo-900/20">
    <div className="flex items-center mb-2">
      <Icon className="h-6 w-6 mr-3 text-indigo-600 dark:text-indigo-400" />
      <h4 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{title}</h4>
    </div>
    <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{description}</p>
    <p className="text-xs italic text-indigo-500 dark:text-indigo-400/80">"{narration}"</p>
  </div>
);

const UserGuidePage = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 quantum-pattern-bg">
      <PageHeader
        title="Guia de Uso - Plataforma Quântica Integrativa"
        description="Seu manual completo para utilizar todas as funcionalidades da plataforma."
        icon={<HelpCircle size={32} className="text-indigo-600 dark:text-indigo-400" />}
      />

      <div className="mt-8 max-w-4xl mx-auto">
        <GuideSection title="Bem-vindo(a) ao Coração da Transformação!" icon={Sparkles}>
          <p className="text-base md:text-lg mb-3">
            Esta plataforma nasce inspirada na fórmula <strong className="font-semibold text-indigo-600 dark:text-indigo-400">Lumina Restauris</strong>, criada e patenteada pelo Mestre Ricardo, com o nobre propósito de
            trazer de volta a iluminação interior à humanidade.
          </p>
          <p className="text-base md:text-lg mb-3">
            A Lumina Restauris é o ponto de partida em nossa jornada. No futuro, esta plataforma se expandirá para abraçar novas fórmulas e protocolos, incluindo abordagens para <strong className="font-semibold text-green-600 dark:text-green-400">nutrição avançada</strong> <Leaf className="inline h-5 w-5 text-green-500" /> e o manejo de <strong className="font-semibold text-sky-600 dark:text-sky-400">condições degenerativas</strong> <Brain className="inline h-5 w-5 text-sky-500" />, sempre guiados pela visão de bem-estar integral do Mestre Ricardo.
          </p>
          <p className="text-base md:text-lg">
            Aqui, você encontrará ferramentas para auxiliar terapeutas no acompanhamento quântico de seus pacientes,
            facilitando o registro, a análise, a visualização do progresso e a gestão de recursos terapêuticos.
            Explore as seções abaixo para entender cada funcionalidade e como elas se alinham com esta poderosa visão de cura e evolução.
          </p>
        </GuideSection>

        <GuideSection 
          title="A Jornada Lumina Restauris (RPQ36)" 
          description="Entendendo a essência da fórmula para a restauração da luz interior." 
          icon={GitBranch}
          titleClassName="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-400 dark:to-orange-300"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            "Nasce um novo tempo. O tempo da restauração. Da luz que retorna ao seu lugar original."
          </p>
          <LuminaStep 
            icon={Sun}
            title="Etapa 1: Restauração da Luz Interior"
            description="Um chamado sutil para o despertar da centelha divina que reside em cada um."
            narration="Um chamado sutil... A centelha desperta."
          />
          <LuminaStep 
            icon={Wind}
            title="Etapa 2: Renovação da Energia"
            description="Liberação de antigos padrões e o despertar de novas forças internas, revitalizando todo o ser."
            narration="Velhos campos se dissolvem. Novas forças se erguem dentro de você."
          />
          <LuminaStep 
            icon={HeartPulse}
            title="Etapa 3: Auto Regeneração"
            description="O corpo físico e a alma se realinham e se reorganizam, promovendo uma cura profunda e integrada."
            narration="O corpo responde. A alma se reorganiza."
          />
          <div className="mt-6 p-4 rounded-lg border border-teal-200 dark:border-teal-700/50 bg-teal-50/30 dark:bg-teal-900/20">
            <div className="flex items-center mb-2">
              <Eye className="h-6 w-6 mr-3 text-teal-600 dark:text-teal-400" />
              <h4 className="text-lg font-semibold text-teal-700 dark:text-teal-300">A Chave: Presença Vibracional</h4>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">
              A eficácia da jornada reside na capacidade de estar presente, de sentir. Quanto mais profunda a conexão com o sentir, mais o campo energético se expande e se abre para a transformação.
            </p>
            <p className="text-xs italic text-teal-500 dark:text-teal-400/80">"A chave é a presença. Quanto mais você sente, mais o campo se abre."</p>
          </div>
          <p className="mt-6 text-sm text-center text-slate-700 dark:text-slate-300 font-medium">
            Lumina Restauris – RPQ36. A fórmula está viva. Você está pronto para ser restaurado.
          </p>
        </GuideSection>

        <GuideSection title="Gerenciando Perfis de Terapeutas" description="Como administrar os terapeutas que utilizam o sistema." icon={Users}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Adicionar Novo Terapeuta</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="No menu lateral, clique em 'Terapeutas'." />
                <Step number="2" text="Na tela 'Gerenciar Terapeutas', clique no botão 'Adicionar Novo'." />
                <Step number="3" text="Preencha os dados do terapeuta: Nome Completo (obrigatório), Email, Telefone e Especialidade." />
                <Step number="4" text="Clique em 'Adicionar Terapeuta' para salvar. O terapeuta será listado e estará disponível para ser associado a pacientes." />
                <p className="text-xs italic pl-9 mt-1 text-slate-500 dark:text-slate-400">Lembre-se: O 'Terapeuta' aqui é um perfil. O login (usuário autenticado) que cria este perfil é o 'dono' dele e poderá associá-lo aos seus pacientes.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Editar ou Remover Terapeuta</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="Acesse 'Terapeutas' no menu lateral." />
                <Step number="2" text="Na lista, encontre o terapeuta desejado. Use os ícones de lápis (editar) ou lixeira (remover)." />
                <Step number="3" text="Para editar, modifique os campos no formulário que aparece e clique em 'Salvar Alterações'." />
                <Step number="4" text="Para remover, confirme a exclusão na caixa de diálogo." />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideSection>

        <GuideSection title="Gerenciando Pacientes" description="Como cadastrar e acompanhar seus pacientes." icon={UserPlus}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Cadastrar Novo Paciente</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="No menu lateral, clique em 'Novo Paciente' ou, no Dashboard, clique no botão 'Adicionar Paciente'." />
                <Step number="2" text="Preencha o formulário com os dados do paciente. Campos como Nome são obrigatórios." />
                <Step number="3" text="No campo 'Terapeuta Responsável', você pode selecionar um dos perfis de terapeutas que você cadastrou." />
                <Step number="4" text="Clique em 'Salvar Paciente'. Ele aparecerá no Dashboard." />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Editar Paciente</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="No Dashboard, encontre o card do paciente que deseja editar." />
                <Step number="2" text="Clique no ícone de lápis (Editar) no card do paciente." />
                <Step number="3" text="Modifique os dados no formulário e clique em 'Salvar Alterações'." />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideSection>

        <GuideSection title="Análise Quântica (Protocolo Lumina Restauris)" description="Realizando e interpretando a avaliação energética inicial." icon={CheckSquare}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Iniciar uma Análise</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="No Dashboard, localize o paciente. Se ele ainda não tem análise, o botão no card indicará 'Iniciar Análise'. Clique nele." />
                <Step number="2" text="Você será direcionado para o Questionário Quântico, dividido em abas (Energético, Emocional, etc.)." />
                <Step number="3" text="Responda a todas as perguntas em cada aba. O progresso é mostrado no cabeçalho." />
                <Step number="4" text="Ao final, na última aba, se todas as perguntas estiverem respondidas, clique em 'Submeter Análise' ou 'Finalizar Análise'." />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Visualizar Resultados</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="Após submeter uma análise, você será levado à tela de Resultados. Você também pode acessá-la clicando em 'Ver Resultados' no card do paciente no Dashboard (se ele já tiver uma análise)." />
                <Step number="2" text="Na tela de Resultados, você verá: Detalhes do Paciente, Sumário da Análise (com a média global e dimensões), o Gráfico de Radar (com os níveis de cada campo quântico), Recomendações Personalizadas e o Gráfico de Evolução (se houver mais de uma análise)." />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideSection>
        
        <GuideSection title="Diário do Paciente" description="Registrando o progresso qualitativo." icon={FileText}>
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base font-medium hover:no-underline">Acessar e Usar o Diário</AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <Step number="1" text="No Dashboard, no card do paciente, clique no ícone de livro (Diário)." />
                <Step number="2" text="Na página do Diário, clique em 'Nova Entrada'." />
                <Step number="3" text="Preencha o formulário com a data, classificações de humor, energia, sono, e descrições de sintomas e insights." />
                <Step number="4" text="Clique em 'Salvar Entrada'. As entradas são listadas em ordem cronológica." />
                <Step number="5" text="Você pode editar ou excluir entradas existentes usando os botões em cada card de entrada." />
                <p className="text-xs italic pl-9 mt-1 text-slate-500 dark:text-slate-400">O diário é uma ferramenta poderosa para acompanhar aspectos subjetivos do bem-estar do paciente entre as análises quânticas.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </GuideSection>

        <GuideSection title="Fases Terapêuticas (Protocolo Lumina Restauris)" description="Entendendo e gerenciando as fases do protocolo atual." icon={Settings}>
          <p>O protocolo Lumina Restauris é dividido em 6 fases. Na tela de Resultados de um paciente, você encontrará um card para "Gerenciar Fase Terapêutica".</p>
          <Step number="1" text="Selecione a nova fase do paciente na lista." />
          <Step number="2" text="Clique em 'Confirmar Nova Fase'. A data de início da nova fase será registrada automaticamente." />
          <p className="text-sm mt-2">Isso ajuda a contextualizar as análises e o progresso do paciente dentro do protocolo.</p>
        </GuideSection>

        <GuideSection title="Recursos Adicionais" description="Materiais de apoio para cada fase." icon={BookOpen}>
          <p>A seção 'Recursos' no menu lateral oferece materiais como meditações guiadas e exercícios, organizados por fase terapêutica do protocolo Lumina Restauris.</p>
          <Step number="1" text="Clique em 'Recursos' no menu." />
          <Step number="2" text="Navegue pelas abas para encontrar recursos específicos para cada uma das 6 fases." />
          <Step number="3" text="Utilize esses materiais como complemento ao acompanhamento terapêutico." />
        </GuideSection>

        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">Esperamos que este guia facilite sua jornada com a plataforma!</p>
          <p className="text-slate-500 dark:text-slate-500 text-sm">Que a luz interior se expanda em cada interação e em cada nova descoberta!</p>
        </div>
      </div>
    </div>
  );
};

export default UserGuidePage;