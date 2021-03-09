import { useTheme } from "@material-ui/core";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Spinner from "../../components/Spinner/Spinner";
import { auth } from "./FirebaseAuth";

export interface AuthData {
  currentUser: object | null;
}

const AuthContext = createContext<AuthData>({ currentUser: null });

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const [pending, setPending] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
