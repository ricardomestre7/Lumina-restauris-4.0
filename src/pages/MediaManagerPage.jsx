import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit3, Trash2, Loader2, Search, Filter, FolderOpen, ExternalLink, FileText, Music, Video, Sparkles, GitBranch, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";
import ResourceForm from '@/components/mediaManager/ResourceForm';

const iconMap = {
  Music: <Music className="h-5 w-5" />,
  BookOpen: <FileText className="h-5 w-5" />, // Changed to FileText for general documents
  Brain: <Sparkles className="h-5 w-5" />, // Changed for concepts
  Leaf: <Sparkles className="h-5 w-5" />, // Changed for concepts
  Video: <Video className="h-5 w-5" />,
  Wind: <Sparkles className="h-5 w-5" />, // Changed
  Apple: <Sparkles className="h-5 w-5" />, // Changed
  ClipboardList: <FileText className="h-5 w-5" />,
  ShieldCheck: <Sparkles className="h-5 w-5" />, // Changed
  Sun: <Sparkles className="h-5 w-5" />, // Changed
  Zap: <Sparkles className="h-5 w-5" />, // Changed
  FileText: <FileText className="h-5 w-5" />,
  LinkIcon: <ExternalLink className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  GitBranch: <GitBranch className="h-5 w-5" />,
  Default: <Sparkles className="h-5 w-5" />
};

const getIcon = (iconName, defaultColorClass = "text-purple-500 dark:text-purple-400") => {
  const IconComponent = iconMap[iconName] || iconMap.Default;
  return React.cloneElement(IconComponent, { className: cn(IconComponent.props.className, defaultColorClass) });
};

const resourceTypeLabels = {
  "meditation_audio_script": "Roteiro de Meditação",
  "audio_link": "Áudio (Link)",
  "video_link": "Vídeo (Link)",
  "pdf_link": "PDF (Link)",
  "article_text": "Artigo/Texto",
  "audio_upload": "Áudio (Upload)",
  "pdf_upload": "PDF (Upload)",
  "image_upload": "Imagem (Upload)",
  "external_link": "Link Externo",
};

const MediaManagerPage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: dbError } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      setResources(data || []);
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Não foi possível carregar os recursos.");
      toast({ title: "Erro ao Carregar", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleAddNewResource = () => {
    setEditingResource(null);
    setIsFormOpen(true);
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };

  const handleDeleteResource = async (resourceId, resourceTitle) => {
    try {
      // Check if resource is an uploaded file and delete from storage
      const resourceToDelete = resources.find(r => r.id === resourceId);
      if (resourceToDelete && resourceToDelete.media_url && resourceToDelete.media_url.includes('supabase.co/storage/v1/object/public/resource_uploads/')) {
        const filePath = resourceToDelete.media_url.substring(resourceToDelete.media_url.indexOf('resource_uploads/'));
        const { error: storageError } = await supabase.storage.from('resource_uploads').remove([filePath]);
        if (storageError) {
          // Log error but proceed to delete DB record, or handle more gracefully
          console.warn(`Failed to delete file from storage, but proceeding with DB record deletion: ${storageError.message}`);
          toast({ title: "Aviso", description: `Arquivo no armazenamento não pôde ser removido: ${storageError.message}. O registro do banco de dados será removido.`, variant: "default" });
        }
      }

      const { error: dbError } = await supabase.from('resources').delete().eq('id', resourceId);
      if (dbError) throw dbError;

      toast({ title: "Recurso Excluído", description: `"${resourceTitle}" foi removido.`, className: "bg-green-500 text-white dark:bg-green-700" });
      fetchResources(); // Refresh list
    } catch (err) {
      toast({ title: "Erro ao Excluir", description: err.message, variant: "destructive" });
    }
  };

  const handleSaveSuccess = (savedResource) => {
    fetchResources(); // Refresh list
  };

  const filteredResources = resources.filter(resource => {
    const titleMatch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = categoryFilter ? resource.category === categoryFilter : true;
    const typeMatch = typeFilter ? resource.type === typeFilter : true;
    return (titleMatch || descriptionMatch) && categoryMatch && typeMatch;
  });

  const uniqueCategories = [...new Set(resources.map(r => r.category).filter(Boolean))].sort();
  const uniqueTypes = [...new Set(resources.map(r => r.type).filter(Boolean))].sort();


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Gerenciador de Mídia e Recursos"
        description="Adicione, edite e organize todos os materiais de apoio da plataforma Lumina Restauris."
        Icon={FolderOpen}
      />

      <div className="my-6 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg shadow">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Filtrar Categoria" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as Categorias</SelectItem>
              {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Filtrar Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os Tipos</SelectItem>
              {uniqueTypes.map(type => <SelectItem key={type} value={type}>{resourceTypeLabels[type] || type}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddNewResource} className="w-full sm:w-auto quantum-glow bg-indigo-500 hover:bg-indigo-600">
          <PlusCircle className="mr-2 h-5 w-5" /> Novo Recurso
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
          <p className="ml-3 text-lg text-muted-foreground">Carregando recursos...</p>
        </div>
      )}
      {!isLoading && error && (
        <div className="text-center py-10 text-red-500">
          <AlertTriangle className="mx-auto h-10 w-10 mb-2" />
          <p>{error}</p>
          <Button onClick={fetchResources} variant="outline" className="mt-4">Tentar Novamente</Button>
        </div>
      )}
      {!isLoading && !error && filteredResources.length === 0 && (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/30 rounded-lg shadow-sm border border-dashed">
          <Sparkles className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {resources.length === 0 ? "Nenhum Recurso Cadastrado" : "Nenhum Recurso Encontrado"}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {resources.length === 0 ? "Clique em 'Novo Recurso' para adicionar o primeiro." : "Tente ajustar seus filtros ou adicione novos recursos."}
          </p>
        </div>
      )}

      {!isLoading && !error && filteredResources.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredResources.map(resource => (
            <motion.div key={resource.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Card className="quantum-card-hover flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700">
                <CardHeader className="pb-3 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full">
                        {getIcon(resource.icon_name)}
                      </span>
                      <CardTitle className="text-md font-semibold text-slate-800 dark:text-slate-100 leading-tight">{resource.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-3 px-4 flex-grow space-y-1 text-xs">
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3">{resource.description || "Sem descrição."}</p>
                  <p><span className="font-medium text-slate-500 dark:text-slate-300">Categoria:</span> {resource.category}</p>
                  <p><span className="font-medium text-slate-500 dark:text-slate-300">Tipo:</span> {resourceTypeLabels[resource.type] || resource.type}</p>
                  {resource.phase_association && <p><span className="font-medium text-slate-500 dark:text-slate-300">Fase:</span> {resource.phase_association}</p>}
                  {resource.media_url && (
                    <a href={resource.media_url} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline break-all line-clamp-1">
                      <ExternalLink className="inline h-3 w-3 mr-1" /> {resource.media_url}
                    </a>
                  )}
                </CardContent>
                <CardFooter className="p-2 bg-slate-50 dark:bg-slate-800/50 flex justify-end space-x-1">
                  <Button variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-700/30" onClick={() => handleEditResource(resource)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100 dark:hover:bg-red-700/30">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir o recurso "{resource.title}"? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteResource(resource.id, resource.title)} className="bg-red-600 hover:bg-red-700">
                          Confirmar Exclusão
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <ResourceForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        existingResource={editingResource}
        onSaveSuccess={handleSaveSuccess}
      />
    </motion.div>
  );
};

export default MediaManagerPage;