import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from "react";

import firebase from "./firebase";

export interface AuthDataI {
  user: any | null;
  signinWithGitHub: (() => void) | null;
  signout: (() => void) | null;
}

// FUNKCIJA
const useProvideAuth = () => {
  const [user, setUser] = useState<AuthDataI["user"]>(null);
};

const defaultAuthData = { user: null, signinWithGitHub: null, signout: null };

const authContext = createContext<AuthDataI>(defaultAuthData);

const { Provider } = authContext;

export const AuthProvider: FC = ({ children }) => {
  return <Provider value={defaultAuthData}>{children}</Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
