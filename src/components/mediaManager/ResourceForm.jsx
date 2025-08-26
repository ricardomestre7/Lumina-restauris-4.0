import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
    import { Loader2, Save, X, UploadCloud, Link2 } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast";
    import { supabase } from '@/lib/supabaseClient';

    const resourceTypes = [
      { value: "meditation_script", label: "Roteiro de Meditação (Texto)" },
      { value: "audio_link", label: "Link de Áudio (Externo)" },
      { value: "video_link", label: "Link de Vídeo (Externo)" },
      { value: "pdf_link", label: "Link de PDF (Externo)" },
      { value: "article", label: "Artigo/Texto Informativo" },
      { value: "audio_upload", label: "Upload de Áudio (MP3, WAV)" },
      { value: "pdf_upload", label: "Upload de PDF" },
      { value: "image_upload", label: "Upload de Imagem (JPG, PNG)" },
      { value: "external_link", label: "Link Externo (Outros)" },
    ];

    const resourceCategories = [
      "Fórmulas Lumina Restauris",
      "Meditações e Práticas Energéticas",
      "Conceitos Fundamentais",
      "Guias e E-books",
      "Ferramentas de Acompanhamento",
      "Práticas Complementares",
      "Alimentação e Nutrição Quântica",
      "Terapias Vibracionais",
      "Outros"
    ];

    const iconNameOptions = [
      "Music", "BookOpen", "Brain", "Leaf", "Video", "Wind", "Apple",
      "ClipboardList", "ShieldCheck", "Sun", "Zap", "FileText", "LinkIcon", "Sparkles", "GitBranch", "Default"
    ];

    const phaseAssociationOptions = [
      { value: "", label: "Nenhuma Fase Específica" },
      { value: "1", label: "Fase 1" },
      { value: "2", label: "Fase 2" },
      { value: "3", label: "Fase 3" },
      { value: "4", label: "Fase 4" },
      { value: "5", label: "Fase 5" },
      { value: "6", label: "Fase 6" },
    ];


    const initialFormState = {
      title: '',
      description: '',
      content: '',
      category: resourceCategories[0],
      type: resourceTypes[0].value,
      media_url: '',
      icon_name: 'Default',
      phase_association: '',
    };

    const ResourceForm = ({ isOpen, setIsOpen, existingResource, onSaveSuccess }) => {
      const [formData, setFormData] = useState(initialFormState);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [fileToUpload, setFileToUpload] = useState(null);
      const { toast } = useToast();

      useEffect(() => {
        if (existingResource) {
          setFormData({
            title: existingResource.title || '',
            description: existingResource.description || '',
            content: existingResource.content || '',
            category: existingResource.category || resourceCategories[0],
            type: existingResource.type || resourceTypes[0].value,
            media_url: existingResource.media_url || '',
            icon_name: existingResource.icon_name || 'Default',
            phase_association: existingResource.phase_association?.toString() || '',
          });
        } else {
          setFormData(initialFormState);
        }
        setFileToUpload(null);
      }, [existingResource, isOpen]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
      };

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setFileToUpload(file);
          // Automatically set media_url to file name for display, actual path will be from Supabase
          setFormData(prev => ({ ...prev, media_url: file.name }));
        }
      };

      const isUploadType = (type) => ['audio_upload', 'pdf_upload', 'image_upload'].includes(type);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
          toast({ title: "Título Obrigatório", description: "Por favor, informe o título do recurso.", variant: "destructive" });
          return;
        }
        setIsSubmitting(true);

        let mediaPath = formData.media_url;

        if (fileToUpload && isUploadType(formData.type)) {
          const fileExt = fileToUpload.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
          const filePath = `resource_uploads/${fileName}`; // Define a folder in your bucket

          const { error: uploadError } = await supabase.storage
            .from('resource_uploads') // Ensure this bucket exists and has correct policies
            .upload(filePath, fileToUpload);

          if (uploadError) {
            toast({ title: "Erro no Upload", description: `Falha ao enviar arquivo: ${uploadError.message}`, variant: "destructive" });
            setIsSubmitting(false);
            return;
          }

          const { data: publicUrlData } = supabase.storage.from('resource_uploads').getPublicUrl(filePath);
          mediaPath = publicUrlData.publicUrl;
        }

        const resourceData = {
          ...formData,
          media_url: mediaPath,
          phase_association: formData.phase_association ? parseInt(formData.phase_association) : null,
        };

        try {
          let response;
          if (existingResource) {
            response = await supabase.from('resources').update(resourceData).eq('id', existingResource.id).select().single();
          } else {
            response = await supabase.from('resources').insert(resourceData).select().single();
          }

          if (response.error) throw response.error;

          toast({
            title: `Recurso ${existingResource ? 'Atualizado' : 'Adicionado'}!`,
            description: `O recurso "${response.data.title}" foi salvo com sucesso.`,
            className: "bg-green-500 text-white dark:bg-green-700",
          });
          onSaveSuccess(response.data);
          setIsOpen(false);
        } catch (error) {
          console.error("Error saving resource:", error);
          toast({
            title: `Erro ao Salvar Recurso`,
            description: error.message || "Não foi possível salvar o recurso. Tente novamente.",
            variant: "destructive",
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-800 p-0">
            <DialogHeader className="p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
              <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {existingResource ? 'Editar Recurso' : 'Adicionar Novo Recurso'}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                {existingResource ? 'Modifique as informações do recurso.' : 'Preencha os campos para criar um novo recurso.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <Label htmlFor="title">Título do Recurso</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: Meditação da Manhã Fase 1" required />
                </div>
                <div>
                  <Label htmlFor="description">Descrição Curta</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Uma breve descrição sobre o recurso..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select name="category" value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                      <SelectTrigger><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                      <SelectContent>{resourceCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo de Recurso</Label>
                    <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                      <SelectTrigger><SelectValue placeholder="Selecione um tipo" /></SelectTrigger>
                      <SelectContent>{resourceTypes.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>

                {isUploadType(formData.type) ? (
                  <div>
                    <Label htmlFor="fileUpload" className="flex items-center">
                      <UploadCloud className="mr-2 h-5 w-5 text-purple-500" />
                      Arquivo para Upload
                    </Label>
                    <Input id="fileUpload" type="file" onChange={handleFileChange}
                      accept={
                        formData.type === 'audio_upload' ? '.mp3,.wav,.m4a' :
                          formData.type === 'pdf_upload' ? '.pdf' :
                            formData.type === 'image_upload' ? '.jpg,.jpeg,.png,.gif,.webp' :
                              '*/*'
                      }
                    />
                    {fileToUpload && <p className="text-xs text-muted-foreground mt-1">Arquivo selecionado: {fileToUpload.name}</p>}
                    {!fileToUpload && formData.media_url && existingResource && <p className="text-xs text-muted-foreground mt-1">Arquivo atual: {formData.media_url.split('/').pop()}</p>}
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="media_url" className="flex items-center">
                      <Link2 className="mr-2 h-5 w-5 text-purple-500" />
                      URL da Mídia/Link Externo
                    </Label>
                    <Input id="media_url" name="media_url" value={formData.media_url} onChange={handleInputChange} placeholder="https://exemplo.com/recurso ou /caminho/local" />
                  </div>
                )}

                {(formData.type === 'meditation_script' || formData.type === 'article') && (
                  <div>
                    <Label htmlFor="content">Conteúdo Principal (Roteiro/Texto)</Label>
                    <Textarea id="content" name="content" value={formData.content} onChange={handleInputChange} placeholder="Insira o texto completo aqui..." rows={8} />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon_name">Ícone</Label>
                    <Select name="icon_name" value={formData.icon_name} onValueChange={(value) => handleSelectChange('icon_name', value)}>
                      <SelectTrigger><SelectValue placeholder="Selecione um ícone" /></SelectTrigger>
                      <SelectContent>{iconNameOptions.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phase_association">Associação de Fase (Opcional)</Label>
                    <Select name="phase_association" value={formData.phase_association} onValueChange={(value) => handleSelectChange('phase_association', value)}>
                      <SelectTrigger><SelectValue placeholder="Selecione uma fase" /></SelectTrigger>
                      <SelectContent>{phaseAssociationOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter className="p-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSubmitting}>
                    <X className="mr-2 h-4 w-4" /> Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" className="quantum-glow bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitting || !formData.title.trim()}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  {isSubmitting ? 'Salvando...' : (existingResource ? 'Salvar Alterações' : 'Adicionar Recurso')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    };

    export default ResourceForm;