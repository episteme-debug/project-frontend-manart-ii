"use client"

import { logoutCliente } from '@/api/auth-client'
import { useRouter } from 'next/navigation'
import { createContext, ReactNode, useContext, useState } from 'react'

interface User {
  id: number
  nombre: string
  email: string
  rol: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  showAuthPopover: boolean
  authAction: "cart" | "purchase" | null
  setAuthenticated: (value: boolean) => void
  setUser: (user: User | null) => void
  logout: () => void
  showAuthRequired: (action: "cart" | "purchase") => void
  hideAuthPopover: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUserState] = useState<User | null>(null)
  const [showAuthPopover, setShowAuthPopover] = useState(false)
  const [authAction, setAuthAction] = useState<"cart" | "purchase" | null>(null)
  const router = useRouter();

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value)
  }

  const setUser = (userData: User | null) => {
    setUserState(userData)
    setIsAuthenticated(!!userData)
  }

  const logout = async () => {
    try {
      const resultado = await logoutCliente();
      if (resultado.success) {
        console.log('Logout exitoso');
      } else {
        console.error('Error en logout:', resultado.error);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    
    // Siempre limpiar el estado local, independientemente del resultado del backend
    setUserState(null)
    setIsAuthenticated(false)
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      sessionStorage.clear()
    }
    
    router.push('/home');
  }

  const showAuthRequired = (action: "cart" | "purchase") => {
    setAuthAction(action)
    setShowAuthPopover(true)
  }

  const hideAuthPopover = () => {
    setShowAuthPopover(false)
    setAuthAction(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        showAuthPopover,
        authAction,
        setAuthenticated,
        setUser,
        logout,
        showAuthRequired,
        hideAuthPopover,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 