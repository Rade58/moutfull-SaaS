import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from "react";
import { useRouter } from "next/router";

import firebase from "./firebase";

import { createUser } from "./db";

export interface UserCherryPickedI {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
  // TOKEN
  token: string;
}

export interface AuthDataI {
  user: UserCherryPickedI | null;
  isLoading: boolean;
  signInWithGitHub: () => void;
  signInWithGoogle: (redirect?: string) => void;
  signOut: () => void;
}

// -----------------------------------------------------
const useProvideAuth = () => {
  const [user, setUser] = useState<AuthDataI["user"] | null>(null);
  // SAMO SLUZI ZA REQUEST, NEMOJ DA DEFINISES true
  // U SLUCAJU DA NISI GETT-OVAO USERA
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { push: routerPush } = useRouter();

  const formatUser = (rawUser: any): UserCherryPickedI => {
    return {
      uid: rawUser.uid,
      email: rawUser.email,
      name: rawUser.displayName,
      photoUrl: rawUser.photoURL,
      provider: rawUser.providerData[0].providerId,
      token: rawUser.xa,
    };
  };

  const handleUser = (rawUser?: any): UserCherryPickedI | false => {
    if (rawUser) {
      const user = formatUser(rawUser);

      const { token, ...userWithoutToken } = user;
      // KADA KREIRAMO user-A NE TREBA NAM TOKEN
      // MI KORISTIMO TOKEN ZA AUTHENTICATION LOGIKU, ALI ON NE TRBA
      // DA BUDE LISTED KAO FIELD KDA KREIRAMO USER-A
      createUser(user.uid, userWithoutToken);
      // ALI KADA SET-UJEMO USERA, POSTO TO KORISTIMO NA FRONTEND-U
      // TAMO NAM TREBA JWT
      setUser(user);
      setIsLoading(false);
      return user;
    } else {
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // GITHUB oAuth

  const signInWithGitHub = () => {
    setIsLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  // GOOGLE oAuth
  const signInWithGoogle = (redirect: any) => {
    setIsLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          routerPush(redirect);
        }
      });
  };

  // SIGNOUT

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(undefined); // EKSPLICITAN SAM SAMO DA BI UKAPIRAO STA RADIM
        // MADA NISAM MORAO DA PROSLEDJUJEM undefined
      });
  };

  // CLEANUP (OVDE PRI UNMOUNTINGU PROVIDE-UJEM
  // FUNKCIJU KOJA CE BITI IZVRSENA, A KOJA CE SET-OVATI USERA OPET NA null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => {
      unsubscribe();
    };
  }, []);

  // HOOK CE DA RETURN-UJE
  return {
    user,
    isLoading,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
  };
};
// -----------------------------------------------------

const defaultAuthData = {
  user: null,
  isLoading: true,
  signInWithGitHub: () => {},
  signInWithGoogle: (redirect?: string) => {},
  signOut: () => {},
};

const authContext = createContext<AuthDataI>(defaultAuthData);

const { Provider } = authContext;

export const AuthProvider: FC = ({ children }) => {
  // HOOK KORISTIMO U OVOJ KOMPOONENTI
  const authData = useProvideAuth();

  return <Provider value={authData}>{children}</Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
