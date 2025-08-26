import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const { sendPasswordResetEmail } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(email);
      setMessageSent(true);
      toast({
        title: "E-mail de recuperação enviado!",
        description: "Verifique sua caixa de entrada (e spam) para o link de redefinição de senha.",
        className: "bg-green-500 text-white dark:bg-green-700",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: "Não foi possível enviar o e-mail de recuperação. Verifique o endereço e tente novamente.",
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
            <CardTitle className="text-2xl text-divinity-gold text-center">Recuperar Senha</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              {messageSent
                ? "As instruções foram enviadas para seu e-mail."
                : "Insira seu e-mail para receber um link de recuperação."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {messageSent ? (
              <div className="text-center p-4 rounded-lg bg-green-900/50 border border-green-500/50">
                <Mail className="mx-auto h-12 w-12 text-green-400 mb-4" />
                <p className="text-slate-200">
                  Um link para redefinir sua senha foi enviado para <span className="font-bold text-divinity-gold">{email}</span>.
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Se não o encontrar, por favor, verifique sua pasta de spam.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-slate-200 font-medium">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seuemail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-slate-700/60 border-slate-600 placeholder-slate-400 text-slate-100 focus:border-divinity-gold focus:ring-divinity-gold"
                  />
                </div>
                <Button type="submit" className="w-full quantum-button-green-gold" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar Link de Recuperação'}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="link" asChild className="text-divinity-gold-light hover:text-divinity-gold w-full">
              <Link to="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;