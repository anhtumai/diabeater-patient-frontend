import { createContext, ReactNode, useContext, useState } from 'react';
import React from 'react';

export type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  gender: string;
  age: number;
  status: number;
  description: string;
  roles: string[];
};

interface AuthContextType {
  authState: User | null;
  getUser: () => User | null;
  setAuthState: (x: User) => void;
  authInfo: User | null;
  logout: () => void;
  isAuthenticated: () => boolean;
}

function saveLoggedUser(loggedUser: User): void {
  window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
}

function removeLoggedUser(): void {
  window.localStorage.removeItem('loggedUser');
}

function loadLoggedUser(): User | null {
  const loggedUserJson = window.localStorage.getItem('loggedUser');
  if (loggedUserJson) {
    return JSON.parse(loggedUserJson);
  }
  return null;
}

const storageUtils = {
  saveLoggedUser,
  removeLoggedUser,
  loadLoggedUser,
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const loggedUser = storageUtils.loadLoggedUser();

  const [authState, setAuthState] = useState(loggedUser);

  function getUser() {
    return loggedUser;
  }

  function setAuthInfo(newUser: User) {
    storageUtils.saveLoggedUser(newUser);
    setAuthState(newUser);
  }

  function logout() {
    storageUtils.removeLoggedUser();
    setAuthState(null);
  }

  function isAuthenticated() {
    return authState !== null;
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        getUser,
        setAuthState: (authInfo: User) => setAuthInfo(authInfo),
        authInfo: authState,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
