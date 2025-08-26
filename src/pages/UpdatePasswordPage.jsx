import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { KeyRound, Eye, EyeOff, CheckCircle } from 'lucide-react';

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { updatePassword, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        if (!session) {
          setError("Sessão de recuperação inválida ou expirada. Por favor, solicite um novo link.");
          toast({ title: "Erro de Sessão", description: "Sessão inválida. Tente novamente.", variant: "destructive" });
        }
      }
    });
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
      await updatePassword(password);
      toast({
        title: "Senha atualizada com sucesso!",
        description: "Você já pode fazer login com sua nova senha.",
        className: "bg-green-500 text-white dark:bg-green-700",
      });
      navigate('/login');
    } catch (error) {
      setError("Falha ao atualizar a senha. A sessão pode ter expirado. Por favor, tente novamente.");
      toast({
        title: "Erro ao atualizar senha",
        description: error.message || "Tente solicitar um novo link de recuperação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 quantum-gradient-green-gold quantum-pattern-green-gold-dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl quantum-card-dark-green-gold">
          <CardHeader>
            <CardTitle className="text-2xl text-divinity-gold text-center">Definir Nova Senha</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              Crie uma nova senha segura para sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? <p className="text-center text-slate-300">Verificando sessão...</p> : 
            !isAuthenticated ? <p className="text-center text-red-400">Sessão inválida. Solicite um novo link de recuperação.</p> :
            (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-200 font-medium">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo de 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-700/60 border-slate-600 pr-10"
                  />
                  <Button type="button" variant="ghost" size="icon" className="absolute inset-y-0 right-0 h-full text-slate-400 hover:text-divinity-gold" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-slate-200 font-medium">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Repita a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-slate-700/60 border-slate-600"
                />
              </div>
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}
              <Button type="submit" className="w-full quantum-button-green-gold" disabled={isSubmitting}>
                {isSubmitting ? 'Atualizando...' : 'Salvar Nova Senha'}
                {!isSubmitting && <CheckCircle className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-slate-500 text-center w-full">
              Lembre-se de usar uma senha forte e única para sua segurança.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpdatePasswordPage;