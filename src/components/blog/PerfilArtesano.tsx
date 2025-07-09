"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Calendar, MapPin } from 'lucide-react'

export function PerfilArtesano() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
      <CardContent className="p-6">
        {/* Información del usuario */}
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16 border-4 border-amber-300">
            <AvatarImage src="/images/usuario.webp" alt="Usuario" />
            <AvatarFallback className="bg-amber-100 text-amber-800 font-times text-xl">
              U
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-times font-bold text-gray-900 text-xl">
              Usuario ManArt
            </h3>
            <p className="text-amber-600 font-times text-sm">
              Artesano Colombiano
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 font-times">12</div>
            <div className="text-xs text-gray-500 font-times">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 font-times">1.2k</div>
            <div className="text-xs text-gray-500 font-times">Seguidores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 font-times">89</div>
            <div className="text-xs text-gray-500 font-times">Siguiendo</div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span className="font-times">Colombia</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span className="font-times">Miembro desde 2025</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Award className="w-4 h-4 text-amber-500" />
            <span className="font-times">Artesano Certificado</span>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="mt-6">
          <Button className="w-full bg-amber-600 hover:bg-amber-700 font-times">
            Editar Perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 