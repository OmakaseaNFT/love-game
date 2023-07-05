import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export interface IAuth {
  onAuthUser: () => Promise<void | { sig: string; msg: string }>;
  signature: string;
  message: string;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: { children: any }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
