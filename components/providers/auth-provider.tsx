'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    newsletter: boolean;
    notifications: boolean;
    language: string;
  };
  createdAt: any;
  updatedAt: any;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // Fetch user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            // Create initial user profile
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email!,
              displayName: user.displayName || '',
              photoURL: user.photoURL || undefined,
              preferences: {
                newsletter: true,
                notifications: true,
                language: 'es',
              },
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            
            await setDoc(doc(db, 'users', user.uid), newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const authError = error as AuthError;
      let message = "Error al iniciar sesión";
      
      switch (authError.code) {
        case 'auth/user-not-found':
          message = "No existe una cuenta con este email";
          break;
        case 'auth/wrong-password':
          message = "Contraseña incorrecta";
          break;
        case 'auth/invalid-email':
          message = "Email inválido";
          break;
        case 'auth/too-many-requests':
          message = "Demasiados intentos. Intenta más tarde";
          break;
        case 'auth/invalid-credential':
          message = "Credenciales inválidas";
          break;
      }
      
      throw new Error(message);
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile
      await updateProfile(user, { displayName });
      
      // Create user document in Firestore
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        displayName,
        preferences: {
          newsletter: true,
          notifications: true,
          language: 'es',
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
    } catch (error) {
      const authError = error as AuthError;
      let message = "Error al crear la cuenta";
      
      switch (authError.code) {
        case 'auth/email-already-in-use':
          message = "Ya existe una cuenta con este email";
          break;
        case 'auth/weak-password':
          message = "La contraseña debe tener al menos 6 caracteres";
          break;
        case 'auth/invalid-email':
          message = "Email inválido";
          break;
      }
      
      throw new Error(message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const { user } = await signInWithPopup(auth, provider);
      
      // Check if user profile exists, if not create one
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const userProfile: UserProfile = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || '',
          photoURL: user.photoURL || undefined,
          preferences: {
            newsletter: true,
            notifications: true,
            language: 'es',
          },
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        
        await setDoc(doc(db, 'users', user.uid), userProfile);
      }
    } catch (error) {
      const authError = error as AuthError;
      if (authError.code === 'auth/popup-closed-by-user') {
        throw new Error("Inicio de sesión cancelado");
      }
      throw new Error("Error al iniciar sesión con Google");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Error al cerrar sesión");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const authError = error as AuthError;
      let message = "Error al enviar email de recuperación";
      
      switch (authError.code) {
        case 'auth/user-not-found':
          message = "No existe una cuenta con este email";
          break;
        case 'auth/invalid-email':
          message = "Email inválido";
          break;
      }
      
      throw new Error(message);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !userProfile) return;
    
    try {
      const updatedProfile = {
        ...userProfile,
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(doc(db, 'users', user.uid), updatedProfile);
      setUserProfile(updatedProfile);
    } catch (error) {
      throw new Error("Error al actualizar el perfil");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        resetPassword,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}