'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, CreditCard, Package, Settings, Shield, LogOut, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/components/providers/auth-provider';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const FloatingElements = dynamic(
  () => import('@/components/3d/floating-elements').then((mod) => ({ default: mod.FloatingElements })),
  { ssr: false }
);

export function ProfilePage() {
  const { user, userProfile, updateUserProfile, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    phoneNumber: userProfile?.phoneNumber || '',
    address: {
      street: userProfile?.address?.street || '',
      city: userProfile?.address?.city || '',
      state: userProfile?.address?.state || '',
      zipCode: userProfile?.address?.zipCode || '',
      country: userProfile?.address?.country || 'Colombia',
    },
    preferences: {
      newsletter: userProfile?.preferences?.newsletter ?? true,
      notifications: userProfile?.preferences?.notifications ?? true,
      language: userProfile?.preferences?.language ?? 'es',
    },
  });

  if (!user) {
    router.push('/');
    return null;
  }

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // ... resto de tu JSX de ProfilePage igual ...
}
