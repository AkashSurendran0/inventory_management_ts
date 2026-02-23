import { createContext } from "react";

type AuthContextType = {
  isAuth: boolean | null
  setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)