'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'Guest' | 'Host' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (propertyId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'user-01',
    name: 'Rahul',
    email: 'rahul@staynest.com',
    role: 'Guest',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['stay-001']);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const login = (email: string, role: UserRole) => {
    setUser({
      id: 'user-01',
      name: email.split('@')[0] || 'Rahul',
      email,
      role
    });
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
  };

  const toggleWishlist = (propertyId: string) => {
    setWishlist(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        wishlist,
        toggleWishlist
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
