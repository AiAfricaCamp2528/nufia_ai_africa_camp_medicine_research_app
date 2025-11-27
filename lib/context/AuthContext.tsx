"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "pharmacist";
  pharmacyName?: string;
}

interface StoredUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string, name: string, role: "user" | "pharmacist", pharmacyName?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Charger l'utilisateur depuis localStorage au montage
  useEffect(() => {
    // Initialiser le compte de démo
    const storedUsers = localStorage.getItem("pharmacist_users");
    const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.length === 0) {
      const demoUser: StoredUser = {
        id: "demo-001",
        email: "pharma@test.com",
        password: "password123",
        name: "Pharmacien Demo",
        role: "pharmacist",
        pharmacyName: "Pharmacie de Démo",
      };
      localStorage.setItem("pharmacist_users", JSON.stringify([demoUser]));
    }

    const storedUser = localStorage.getItem("pharmacist_user");
    if (storedUser) {
      try {
        const userData: User = JSON.parse(storedUser);
        // Only set if user is not already set to avoid re-renders
        if (!user) {
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to load user:", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (email: string, password: string): boolean => {
    // Simulation: vérifier les credentials
    const usersData = localStorage.getItem("pharmacist_users");
    const users: StoredUser[] = usersData ? JSON.parse(usersData) : [];
    const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password);

    if (foundUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsLoggedIn(true);
      localStorage.setItem("pharmacist_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = (
    email: string,
    password: string,
    name: string,
    role: "user" | "pharmacist",
    pharmacyName?: string
  ): boolean => {
    // Vérifier si l'email existe déjà
    const usersData = localStorage.getItem("pharmacist_users");
    const users: StoredUser[] = usersData ? JSON.parse(usersData) : [];
    
    if (users.some((u: StoredUser) => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      pharmacyName,
    };

    const newStoredUser: StoredUser = { ...newUser, password };
    users.push(newStoredUser);
    localStorage.setItem("pharmacist_users", JSON.stringify(users));

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem("pharmacist_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("pharmacist_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
