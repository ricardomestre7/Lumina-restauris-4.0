import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignUpButton = ({ email, password, isSubmittingLogin, isSubmittingSignUp, setIsSubmittingSignUp, setShowConfirmationMessage, setEmailForConfirmation }) => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o e-mail e a senha acima para se cadastrar.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmittingSignUp(true);
    setShowConfirmationMessage(false);
    const defaultName = email.split('@')[0]; 
    try {
      const signUpResponse = await signUp(email, password, { full_name: defaultName });
      
      if (signUpResponse && signUpResponse.error) {
        let description = signUpResponse.error.message || "Não foi possível realizar o cadastro. Tente novamente.";
        if (signUpResponse.error.message && signUpResponse.error.message.toLowerCase().includes('rate limit')) {
            description = "Muitas tentativas de cadastro. Por favor, aguarde um momento e tente novamente.";
        } else if (signUpResponse.error.message.toLowerCase().includes('user already registered')) {
            description = "Este e-mail já está cadastrado. Tente fazer login ou use a opção 'Esqueci minha senha'.";
        }
         toast({
          title: "Erro no Cadastro",
          description: description,
          variant: "destructive",
        });
      } else if (signUpResponse && signUpResponse.user && !signUpResponse.session && signUpResponse.user.identities && signUpResponse.user.identities.length > 0) {
        
        setEmailForConfirmation(email);
        setShowConfirmationMessage(true);
        toast({
          title: "Cadastro quase completo!",
          description: "Verifique seu e-mail para o link de confirmação.",
          className: "bg-yellow-500 border-yellow-500 text-white",
          duration: 15000, 
        });
      } else if (signUpResponse && signUpResponse.user && signUpResponse.session) {
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Você já está logado.",
          className: "bg-green-600 border-green-600 text-white",
        });
        navigate('/'); 
      } else {
         toast({
          title: "Aviso de Cadastro",
          description: "Seu cadastro foi processado. Se a confirmação de e-mail for necessária, verifique sua caixa de entrada. Se o problema persistir, contate o suporte.",
          variant: "default",
          duration: 10000,
        });
        console.log("Unexpected signUpResponse structure from AuthContext:", signUpResponse);
      }
    } catch (error) {
      let description = error.message || "Ocorreu um problema. Tente novamente mais tarde.";
      if (error.message && error.message.toLowerCase().includes('rate limit')) {
        description = "Muitas tentativas de cadastro. Por favor, aguarde um momento e tente novamente.";
      } else if (error.message.toLowerCase().includes('user already registered')) {
        description = "Este e-mail já está cadastrado. Tente fazer login ou use a opção 'Esqueci minha senha'.";
      }
      toast({
        title: "Erro Inesperado no Cadastro",
        description: description,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingSignUp(false);
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleSignUp} 
      disabled={isSubmittingLogin || isSubmittingSignUp || !email || !password}
      className="font-semibold text-green-300 hover:text-green-200 hover:underline flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-2"
    >
      {isSubmittingSignUp ? (
         <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="mr-1 inline-block"
        >
          <Zap className="h-4 w-4" />
        </motion.div>
      ) : (
        <UserPlus className="mr-1 h-4 w-4" />
      )}
      {isSubmittingSignUp ? 'Cadastrando...' : 'Cadastre-se com os dados acima'}
    </button>
  );
};

export default SignUpButton;