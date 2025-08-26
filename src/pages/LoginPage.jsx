import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import LoginCardHeader from '@/components/login/LoginCardHeader';
import EmailConfirmationPanel from '@/components/login/EmailConfirmationPanel';
import LoginForm from '@/components/login/LoginForm';
import SignUpButton from '@/components/login/SignUpButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [emailForConfirmation, setEmailForConfirmation] = useState('');


  return (
    <div className="min-h-screen flex items-center justify-center p-4 login-bg-light">
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 120, damping: 12 }}
        className="w-full max-w-md"
      >
        <Card className="login-card">
          <LoginCardHeader />
          <CardContent className="px-6 sm:px-8 pt-6 pb-8">
            {showConfirmationMessage && <EmailConfirmationPanel email={emailForConfirmation} />}
            <LoginForm 
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isSubmittingLogin={isSubmittingLogin}
              setIsSubmittingLogin={setIsSubmittingLogin}
              isSubmittingSignUp={isSubmittingSignUp}
              setShowConfirmationMessage={setShowConfirmationMessage}
              setEmailForConfirmation={setEmailForConfirmation}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4 pt-4 pb-8">
            <Link to="/forgot-password" className="text-sm text-slate-400 hover:text-green-300 hover:underline transition-colors duration-300">
              Esqueceu sua senha?
            </Link>
            <div className="text-sm text-slate-400 flex items-center">
              <span>Não tem uma conta?</span>
              <SignUpButton 
                email={email}
                password={password}
                isSubmittingLogin={isSubmittingLogin}
                isSubmittingSignUp={isSubmittingSignUp}
                setIsSubmittingSignUp={setIsSubmittingSignUp}
                setShowConfirmationMessage={setShowConfirmationMessage}
                setEmailForConfirmation={setEmailForConfirmation}
              />
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;