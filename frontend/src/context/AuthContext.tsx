'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

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
  token?: string;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (propertyId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const TOKEN_KEY = 'staynest_token';
const USER_KEY = 'staynest_user';

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | undefined>(
    undefined
  );

  const [isAuthModalOpen, setIsAuthModalOpen] =
    useState(false);

  const [wishlist, setWishlist] = useState<string[]>([
    'stay-001',
  ]);

  // Restore authentication after refresh.
  useEffect(() => {
    try {
      const savedToken =
        localStorage.getItem(TOKEN_KEY);

      const savedUser =
        localStorage.getItem(USER_KEY);

      if (savedToken) {
        setToken(savedToken);
      }

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error(
        'Failed to restore authentication:',
        error
      );

      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (
    loggedInUser: User,
    authToken: string
  ) => {
    setUser(loggedInUser);
    setToken(authToken);

    localStorage.setItem(
      TOKEN_KEY,
      authToken
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(loggedInUser)
    );

    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setToken(undefined);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const toggleWishlist = (
    propertyId: string
  ) => {
    setWishlist((prev) =>
      prev.includes(propertyId)
        ? prev.filter(
            (id) => id !== propertyId
          )
        : [...prev, propertyId]
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
}
