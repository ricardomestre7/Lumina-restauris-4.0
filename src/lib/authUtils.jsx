import { supabase } from './supabaseClient';

export const getCurrentUser = async () => {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error('Error getting session:', sessionError);
    return null;
  }

  if (session && session.user) {
    return session.user;
  }
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error getting user:', userError);
    return null;
  }
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
  return { success: true };
};

export const signInWithPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error('Error signing in:', error);
  }
  return { data, error };
};

export const signUpNewUser = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: metadata, 
    }
  });
  if (error) {
    console.error('Error signing up:', error);
  }
  return { data, error };
};

export const resetPasswordForEmail = async (email, redirectTo) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  });
  if (error) {
    console.error('Error sending password reset email:', error);
  }
  return { data, error };
};

export const updateUserPassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    console.error('Error updating user password:', error);
  }
  return { data, error };
};

export const onAuthStateChange = (callback) => {
  const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return authListener;
};