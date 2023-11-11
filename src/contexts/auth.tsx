import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id: number;
  email: string;
  password: string;
  username: string;
  gender: string;
  age: number;
  status: number;
  description: string;
  disease_type: string;
  disease_start: string;
};

interface AuthContextType {
  authState: User | null;
  setAuthState: (x: User) => void;
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
        setAuthState: (authInfo: User) => setAuthInfo(authInfo),
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
