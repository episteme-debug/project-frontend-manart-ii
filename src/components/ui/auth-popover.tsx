"use client"

import { useState } from "react"
import { X, ShoppingCart, CreditCard, LogIn, UserPlus } from "lucide-react"
import Link from "next/link"

interface AuthPopoverProps {
  isOpen: boolean
  onClose: () => void
  action: "cart" | "purchase"
}

export function AuthPopover({ isOpen, onClose, action }: AuthPopoverProps) {
  if (!isOpen) return null

  const getActionInfo = () => {
    if (action === "cart") {
      return {
        title: "Agregar al Carrito",
        description: "Para agregar productos al carrito necesitas iniciar sesión",
        icon: ShoppingCart,
        color: "text-[#114E93]"
      }
    }
    return {
      title: "Realizar Compra",
      description: "Para realizar una compra necesitas iniciar sesión",
      icon: CreditCard,
      color: "text-[#114E93]"
    }
  }

  const actionInfo = getActionInfo()
  const IconComponent = actionInfo.icon

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Contenido */}
        <div className="text-center">
          <div className={`w-16 h-16 bg-[#114E93]/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
            <IconComponent className={`w-8 h-8 ${actionInfo.color}`} />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {actionInfo.title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {actionInfo.description}
          </p>

          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#114E93] to-[#0D3A7A] text-white py-3 px-6 rounded-lg font-medium hover:from-[#0D3A7A] hover:to-[#092B61] transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={onClose}
            >
              <LogIn className="w-5 h-5" />
              Iniciar Sesión
            </Link>
            
            <Link
              href="/registro"
              className="w-full flex items-center justify-center gap-3 border-2 border-[#114E93] text-[#114E93] py-3 px-6 rounded-lg font-medium hover:bg-[#114E93] hover:text-white transition-all duration-300"
              onClick={onClose}
            >
              <UserPlus className="w-5 h-5" />
              Crear Cuenta
            </Link>
          </div>

          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Continuar sin iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
} 