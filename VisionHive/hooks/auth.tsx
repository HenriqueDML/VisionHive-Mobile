import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from "@react-native-firebase/auth";

interface User {
  id: string;
  name?: string;
  email: string;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('@App:user');
      if (storedUser) setUser(JSON.parse(storedUser));
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = useCallback(async ({ email, password }: LoginData) => {
    if (!email || !password) throw new Error("Email e senha são obrigatórios.");
    
    const response = await auth().signInWithEmailAndPassword(email, password);
    const token = await response.user.getIdToken();

    const loggedUser: User = {
      id: response.user.uid,
      name: response.user.displayName || '',
      email: response.user.email || '',
      token,
    };

    setUser(loggedUser);
    await AsyncStorage.setItem('@App:user', JSON.stringify(loggedUser));
  }, []);

  const register = useCallback(async ({ email, password }: RegisterData) => {
    if (!email || !password) throw new Error("Email e senha são obrigatórios.");

    const response = await auth().createUserWithEmailAndPassword(email, password);


    const token = await response.user.getIdToken();

    const newUser: User = {
      id: response.user.uid,
      email: response.user.email || '',
      token,
    };

    setUser(newUser);
    await AsyncStorage.setItem('@App:user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(async () => {
    await auth().signOut();
    setUser(null);
    await AsyncStorage.removeItem('@App:user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isLoggedIn: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
