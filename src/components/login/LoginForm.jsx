import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';

const LoginForm = ({ email, setEmail, password, setPassword, isSubmittingLogin, setIsSubmittingLogin, isSubmittingSignUp, setShowConfirmationMessage, setEmailForConfirmation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmittingLogin(true);
    setShowConfirmationMessage(false); 
    try {
      await login(email, password);
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo(a) de volta!",
        className: "bg-green-600 border-green-600 text-white",
      });
      navigate('/');
    } catch (error) {
      let description = error.message || "Verifique suas credenciais e tente novamente.";
      if (error.message && error.message.toLowerCase().includes('email not confirmed')) {
        description = "Seu e-mail ainda não foi confirmado. Por favor, verifique sua caixa de entrada (e spam) para o link de confirmação.";
        setEmailForConfirmation(email);
        setShowConfirmationMessage(true);
      }
      toast({
        title: "Erro no Login",
        description: description,
        variant: "destructive",
        duration: error.message && error.message.toLowerCase().includes('email not confirmed') ? 10000 : 5000,
      });
    } finally {
      setIsSubmittingLogin(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email-login" className="text-slate-300 font-medium">E-mail</Label>
        <Input
          id="email-login"
          type="email"
          placeholder="seuemail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-slate-700/60 border-slate-600 placeholder-slate-400 text-slate-100 focus:border-green-500 focus:ring-green-500 transition-colors"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-login" className="text-slate-300 font-medium">Senha</Label>
        <div className="relative">
          <Input
            id="password-login"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha segura"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-700/60 border-slate-600 placeholder-slate-400 text-slate-100 focus:border-green-500 focus:ring-green-500 pr-10 transition-colors"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-0 h-full text-slate-400 hover:text-green-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full login-button"
        disabled={isSubmittingLogin || isSubmittingSignUp}
      >
        {isSubmittingLogin ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mr-2 inline-block"
          >
            <Zap className="h-5 w-5" />
          </motion.div>
        ) : (
          <ArrowRight className="mr-2 h-5 w-5 inline-block" />
        )}
        {isSubmittingLogin ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
};

export default LoginForm;