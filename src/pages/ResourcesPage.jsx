import React, { useState, useEffect } from 'react';
    import { motion } from 'framer-motion';
    import PageHeader from '@/components/PageHeader';
    import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
    import { supabase } from '@/lib/supabaseClient';
    import { Sparkles, BookOpen, Brain, Leaf, FolderHeart as HandHeart, Music, Video, Wind, Apple, ClipboardList, ShieldCheck, Sun, Zap, FileText, Link as LinkIcon, AlertTriangle, Loader2, GitBranch, HeartPulse, Eye, Lightbulb } from 'lucide-react';
    import { cn } from "@/lib/utils";
    import { useToast } from "@/components/ui/use-toast";
    import MeditationPhase1 from '@/components/resources/MeditationPhase1.jsx';
    import MeditationPhase2 from '@/components/resources/MeditationPhase2.jsx';
    import MeditationPhase3 from '@/components/resources/MeditationPhase3.jsx';
    import MeditationPhase4 from '@/components/resources/MeditationPhase4.jsx';
    import MeditationPhase5 from '@/components/resources/MeditationPhase5.jsx';
    import MeditationPhase6 from '@/components/resources/MeditationPhase6.jsx';

    const iconMap = {
      Music: <Music className="h-6 w-6" />,
      BookOpen: <BookOpen className="h-6 w-6" />,
      Brain: <Brain className="h-6 w-6" />,
      Leaf: <Leaf className="h-6 w-6" />,
      Video: <Video className="h-6 w-6" />,
      Wind: <Wind className="h-6 w-6" />,
      Apple: <Apple className="h-6 w-6" />,
      ClipboardList: <ClipboardList className="h-6 w-6" />,
      ShieldCheck: <ShieldCheck className="h-6 w-6" />,
      Sun: <Sun className="h-6 w-6" />,
      Zap: <Zap className="h-6 w-6" />,
      FileText: <FileText className="h-6 w-6" />,
      LinkIcon: <LinkIcon className="h-6 w-6" />,
      Sparkles: <Sparkles className="h-6 w-6" />,
      GitBranch: <GitBranch className="h-6 w-6" />,
      HeartPulse: <HeartPulse className="h-6 w-6" />,
      Eye: <Eye className="h-6 w-6" />,
      Lightbulb: <Lightbulb className="h-6 w-6" />,
      Default: <Sparkles className="h-6 w-6" />
    };

    const getIcon = (iconName, defaultColorClass = "text-purple-500 dark:text-purple-400") => {
      const IconComponent = iconMap[iconName] || iconMap.Default;
      return React.cloneElement(IconComponent, { className: cn(IconComponent.props.className, defaultColorClass) });
    };


    const ResourceContentDisplay = ({ resource }) => {
      if (!resource) {
        return <p className="text-slate-500 dark:text-slate-400">Conteúdo não disponível no momento.</p>;
      }

      if (resource.type === 'meditation_script') {
        if (resource.phase_association === 1) {
          return <MeditationPhase1 content={resource.content} />;
        } else if (resource.phase_association === 2) {
          return <MeditationPhase2 content={resource.content} />;
        } else if (resource.phase_association === 3) {
          return <MeditationPhase3 content={resource.content} />;
        } else if (resource.phase_association === 4) {
          return <MeditationPhase4 content={resource.content} />;
        } else if (resource.phase_association === 5) {
          return <MeditationPhase5 content={resource.content} />;
        } else if (resource.phase_association === 6) {
          return <MeditationPhase6 content={resource.content} />;
        } else {
          const paragraphs = resource.content?.split('\n').map((paragraph, index) => (
            paragraph.trim() === '' ? <br key={`br-${index}`} /> : <p key={`p-${index}`} className="mb-3 last:mb-0 leading-relaxed">{paragraph}</p>
          )) || [];
          return <div className="p-4 md:p-6">{paragraphs.length > 0 ? paragraphs : <p className="text-slate-500 dark:text-slate-400">Conteúdo da meditação em breve.</p>}</div>;
        }
      }
      
      const renderGenericContent = () => {
        if (resource.media_url) {
          if (resource.type === 'video_link') {
            let videoId;
            if (resource.media_url.includes('youtube.com/watch?v=')) {
              videoId = resource.media_url.split('v=')[1].split('&')[0];
              return (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={resource.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-md"
                  ></iframe>
                </div>
              );
            } else if (resource.media_url.includes('vimeo.com/')) {
              videoId = resource.media_url.split('vimeo.com/')[1].split('?')[0];
               return (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={`https://player.vimeo.com/video/${videoId}`} 
                    title={resource.title}
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-md"
                  ></iframe>
                </div>
              );
            } else {
              return <a href={resource.media_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline font-semibold flex items-center"><LinkIcon className="mr-2 h-5 w-5" />Acessar Mídia Externa</a>;
            }
          } else if (resource.type === 'audio_link') {
            return (
              <div>
                <a href={resource.media_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline font-semibold flex items-center mb-2"><Music className="mr-2 h-5 w-5" />Ouvir Áudio</a>
                <audio controls src={resource.media_url} className="w-full rounded-md shadow">
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              </div>
            );
          } else if (resource.type === 'pdf_link') {
             return <a href={resource.media_url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 underline font-semibold flex items-center"><FileText className="mr-2 h-5 w-5" />Baixar/Ver PDF</a>;
          }
        }
        
        if (resource.content) {
          const paragraphs = resource.content.split('\n').map((paragraph, index) => (
            paragraph.trim() === '' ? <br key={`br-${index}`} /> : <p key={`p-${index}`} className="mb-3 last:mb-0 leading-relaxed">{paragraph}</p>
          ));
          return <div>{paragraphs}</div>;
        }

        return <p className="text-slate-500 dark:text-slate-400">Conteúdo em breve.</p>;
      };
      
      return (
        <div className="p-4 md:p-6 text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none">
          {renderGenericContent()}
        </div>
      );
    };


    const ResourcesPage = () => {
      const [resources, setResources] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
      const { toast } = useToast();

      useEffect(() => {
        const fetchResources = async () => {
          setIsLoading(true);
          setError(null);
          try {
            const { data, error: dbError } = await supabase
              .from('resources')
              .select('*')
              .order('category', { ascending: true })
              .order('phase_association', { ascending: true, nullsFirst: false })
              .order('title', { ascending: true });

            if (dbError) throw dbError;

            setResources(data || []);

          } catch (err) {
            console.error("Error fetching resources:", err);
            setError("Não foi possível carregar os recursos. Tente novamente mais tarde.");
            toast({
              title: "Erro ao Carregar Recursos",
              description: err.message || "Ocorreu um problema ao buscar os dados.",
              variant: "destructive",
            });
          } finally {
            setIsLoading(false);
          }
        };

        fetchResources();
      }, [toast]);

      const categories = [...new Set(resources.map(item => item.category || "Outros"))].sort((a, b) => {
        const order = [
          "Fórmulas Lumina Restauris",
          "Meditações e Práticas Energéticas",
          "Conceitos Fundamentais",
          "Guias e E-books",
          "Ferramentas de Acompanhamento",
          "Práticas Complementares",
          "Outros"
        ];
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1; 
        return a.localeCompare(b);
      });
      
      const categoryIcons = {
        "Meditações e Práticas Energéticas": getIcon("Music", "text-purple-500"),
        "Fórmulas Lumina Restauris": getIcon("GitBranch", "text-orange-500"),
        "Ferramentas de Acompanhamento": getIcon("BookOpen", "text-divinity-gold"),
        "Conceitos Fundamentais": getIcon("Sparkles", "text-indigo-500"),
        "Práticas Complementares": getIcon("Brain", "text-pink-500"),
        "Guias e E-books": getIcon("ClipboardList", "text-blue-500"),
        "Outros": getIcon("Sparkles", "text-gray-500")
      };


      if (isLoading) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400 mb-4" />
            <p className="text-lg text-slate-600 dark:text-slate-300">Carregando recursos...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" />
            <p className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Erro ao Carregar</p>
            <p className="text-slate-600 dark:text-slate-300">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        );
      }
      
      if (resources.length === 0 && !isLoading) {
         return (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 text-center">
            <Sparkles className="h-12 w-12 text-purple-500 dark:text-purple-400 mb-4" />
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Nenhum Recurso Encontrado</p>
            <p className="text-slate-500 dark:text-slate-400">Parece que ainda não há recursos disponíveis. Volte em breve!</p>
          </div>
        );
      }


      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 pb-12"
        >
          <PageHeader 
            title="Recursos Lumina Restauris"
            description="Materiais de apoio, guias e informações para auxiliar em sua jornada com o protocolo."
          />

          {categories.map((category, index) => (
            <motion.section 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 flex items-center">
                 {React.cloneElement(categoryIcons[category] || categoryIcons["Outros"], {className: "mr-3 h-7 w-7"})}
                {category}
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {resources
                  .filter(item => (item.category || "Outros") === category)
                  .map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: itemIndex * 0.05 + (index * 0.1) + 0.1, duration: 0.4 }}
                    className="bg-white dark:bg-slate-800/50 shadow-lg rounded-xl overflow-hidden quantum-card border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
                  >
                    <AccordionItem value={item.id.toString()} className="border-b-0">
                      <AccordionTrigger className="p-6 text-left hover:bg-purple-50 dark:hover:bg-slate-700/50 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 rounded-lg">
                        <div className="flex items-start md:items-center text-lg font-medium text-slate-800 dark:text-slate-100 w-full">
                          <span className="mr-4 mt-1 md:mt-0 p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full shrink-0">
                            {getIcon(item.icon_name)}
                          </span>
                          <div className="flex-grow">
                            {item.title}
                            <p className="text-sm font-normal text-slate-500 dark:text-slate-400 mt-1 pr-8">{item.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="bg-slate-50 dark:bg-slate-800/30">
                         <ResourceContentDisplay resource={item} />
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.section>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categories.length * 0.1 + 0.4, duration: 0.5 }}
            className="mt-12 p-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 rounded-xl shadow-xl text-white"
          >
            <div className="flex items-center">
              <HandHeart className="h-10 w-10 mr-4 shrink-0"/>
              <div>
                <h3 className="text-xl font-semibold">Apoio Contínuo</h3>
                <p className="mt-1 text-purple-100 dark:text-purple-200">
                  Lembre-se, esta jornada é sua, mas você não está sozinho. Consulte estes recursos sempre que precisar e confie no processo de transformação do Lumina Restauris.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      );
    };

    export default ResourcesPage;