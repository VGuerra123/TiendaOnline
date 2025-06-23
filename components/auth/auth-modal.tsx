'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: '',
  });

  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      switch (mode) {
        case 'login':
          await signIn(formData.email, formData.password);
          break;
        case 'register':
          if (formData.password !== formData.confirmPassword) {
            throw new Error('Las contraseñas no coinciden');
          }
          await signUp(formData.email, formData.password, formData.displayName);
          break;
        case 'forgot':
          await resetPassword(formData.email);
          setMode('login');
          break;
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      displayName: '',
      confirmPassword: '',
    });
  };

  const switchMode = (newMode: 'login' | 'register' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white rounded-3xl p-10 w-full max-w-lg relative overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl gradient-primary flex items-center justify-center shadow-2xl">
                  <span className="text-white font-black text-3xl">M</span>
                </div>
                <h2 className="text-3xl font-black text-gradient mb-3">
                  {mode === 'login' && 'Bienvenido a Mercart'}
                  {mode === 'register' && 'Únete a Mercart'}
                  {mode === 'forgot' && 'Recuperar Contraseña'}
                </h2>
                <p className="text-gray-600 text-lg">
                  {mode === 'login' && 'Accede a ofertas exclusivas y experiencias premium'}
                  {mode === 'register' && 'Crea tu cuenta y descubre el futuro de la tecnología'}
                  {mode === 'forgot' && 'Te enviaremos un enlace para restablecer tu contraseña'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {mode === 'register' && (
                  <div className="space-y-3">
                    <Label htmlFor="displayName" className="text-lg font-bold">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="pl-14 h-14 rounded-2xl border-3 focus:border-primary text-lg"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg font-bold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-14 h-14 rounded-2xl border-3 focus:border-primary text-lg"
                      required
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-lg font-bold">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Tu contraseña"
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-14 pr-14 h-14 rounded-2xl border-3 focus:border-primary text-lg"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'register' && (
                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-lg font-bold">Confirmar contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirma tu contraseña"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-14 h-14 rounded-2xl border-3 focus:border-primary text-lg"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-2xl btn-primary text-xl font-black"
                >
                  {loading ? (
                    <div className="loading-ring">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    <>
                      {mode === 'login' && (
                        <>
                          <Zap className="w-6 h-6 mr-3" />
                          Iniciar Sesión
                        </>
                      )}
                      {mode === 'register' && (
                        <>
                          <Sparkles className="w-6 h-6 mr-3" />
                          Crear Cuenta
                        </>
                      )}
                      {mode === 'forgot' && (
                        <>
                          <Shield className="w-6 h-6 mr-3" />
                          Enviar Enlace
                        </>
                      )}
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              {mode !== 'forgot' && (
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-6 text-gray-500 font-semibold">o continúa con</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>
              )}

              {/* Google Sign In */}
              {mode !== 'forgot' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full h-14 rounded-2xl border-3 hover:bg-gray-50 transition-colors text-lg font-bold"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar con Google
                </Button>
              )}

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-4">
                {mode === 'login' && (
                  <>
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-primary hover:underline font-semibold"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                    <div className="text-gray-600">
                      ¿No tienes cuenta?{' '}
                      <button
                        type="button"
                        onClick={() => switchMode('register')}
                        className="text-primary hover:underline font-bold"
                      >
                        Regístrate aquí
                      </button>
                    </div>
                  </>
                )}

                {mode === 'register' && (
                  <div className="text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <button
                      type="button"
                      onClick={() => switchMode('login')}
                      className="text-primary hover:underline font-bold"
                    >
                      Inicia sesión
                    </button>
                  </div>
                )}

                {mode === 'forgot' && (
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="text-primary hover:underline font-semibold"
                  >
                    Volver al inicio de sesión
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}