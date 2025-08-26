import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSessionAndSetListener = async () => {
      setIsLoading(true);
      const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("AuthContext: Error getting initial session:", sessionError?.message);
      }
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsAuthenticated(!!currentSession?.user);
      setIsLoading(false);

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, newSession) => {
          setIsLoading(true);
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setIsAuthenticated(!!newSession?.user);
          setIsLoading(false);
        }
      );
      return listener;
    };

    const authListenerPromise = getSessionAndSetListener();

    return () => {
      authListenerPromise.then(listener => listener?.subscription?.unsubscribe());
    };
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    if (error) {
      console.error('AuthContext: Error logging in:', error?.message);
      throw error;
    }
    return data;
  };

  const signUp = async (email, password, additionalData = {}) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: additionalData, 
      }
    });
    setIsLoading(false);

    console.log("AuthContext: signUp result data:", data);
    console.error("AuthContext: signUp result error:", error);

    if (error) {
      console.error('AuthContext: Error signing up:', error?.message);
      throw error;
    }
    
    return data; 
  };
  
  const sendPasswordResetEmail = async (email) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    setIsLoading(false);
    if (error) {
      console.error('AuthContext: Error sending password reset email:', error?.message);
      throw error;
    }
    return data;
  };

  const updatePassword = async (newPassword) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    setIsLoading(false);
    if (error) {
        console.error('AuthContext: Error updating password:', error?.message);
        throw error;
    }
    return data;
  };

  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setIsLoading(false);
    if (error) {
      console.error('AuthContext: Error logging out:', error?.message);
      throw error;
    }
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, session, login, logout, signUp, isLoading, sendPasswordResetEmail, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};