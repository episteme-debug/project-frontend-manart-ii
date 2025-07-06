"use client"

import { AuthPopover } from "@/components/ui/auth-popover"
import { useAuth } from "@/contexts/AuthContext"
import { useAuthCheck } from "@/hooks/useAuthCheck"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { showAuthPopover, authAction, hideAuthPopover } = useAuth()
  
  // Verificar autenticación automáticamente
  useAuthCheck()

  return (
    <>
      {children}
      <AuthPopover
        isOpen={showAuthPopover}
        onClose={hideAuthPopover}
        action={authAction || "cart"}
      />
    </>
  )
} 