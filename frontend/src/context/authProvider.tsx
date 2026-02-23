import {  useState, useEffect, type ReactElement } from "react"
import { verifyUser } from "../services/authService"
import { AuthContext } from "./authContext"

type Props = {
    children:ReactElement
}

export const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  const checkAuth = async () => {
    try {
      await verifyUser()
      setIsAuth(true)
    } catch {
      setIsAuth(false)
    }
  }

  useEffect(() => {
    const alterAuth = () => {
        checkAuth()
    }
    
    alterAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
