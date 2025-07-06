"use client"

import { useAuth } from "@/contexts/AuthContext"
import { AuthPopover } from "@/components/ui/auth-popover"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { showAuthPopover, authAction, hideAuthPopover } = useAuth()

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