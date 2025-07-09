"use client"

import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Map, PieChart as PieChartIcon, Palette, Sparkles, Mountain, Leaf } from "lucide-react"

interface DashboardChartsProps {
  stockData: Array<{
    name: string
    stock: number
    valor: number
    precio: number
  }>
  regionData: Array<{
    region: string
    productos: number
    stock: number
  }>
  stockStatusData: Array<{
    name: string
    value: number
    color: string
  }>
  trendData: Array<{
    day: string
    stock: number
  }>
}

export function DashboardCharts({ 
  stockData, 
  regionData, 
  stockStatusData, 
  trendData 
}: DashboardChartsProps) {
  return (
    <>
      {/* Gráficas */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfica de Área - Stock por Producto */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-purple-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-purple-500 stroke-2" />
              </div>
              Stock por Producto
            </CardTitle>
            <CardDescription>
              Distribución de stock disponible por producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stockData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'stock' ? `${value} unidades` : `$${value}`,
                      name === 'stock' ? 'Stock' : 'Valor'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="stock" 
                    stackId="1"
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="valor" 
                    stackId="2"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.4}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mx-auto mb-2">
                    <Palette className="h-6 w-6 text-gray-400 stroke-2" />
                  </div>
                  <p>No hay datos para mostrar</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfica de Barras - Distribución por Región */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                <Mountain className="h-4 w-4 text-emerald-500 stroke-2" />
              </div>
              Distribución por Región
            </CardTitle>
            <CardDescription>
              Productos y stock por región de Colombia
            </CardDescription>
          </CardHeader>
          <CardContent>
            {regionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="productos" fill="#10b981" name="Productos" />
                  <Bar dataKey="stock" fill="#8b5cf6" name="Stock Total" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-2">
                    <Mountain className="h-6 w-6 text-gray-600" />
                  </div>
                  <p>No hay datos por región</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gráficas Adicionales */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfica de Donut - Estado del Stock */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-green-500 stroke-2" />
              </div>
              Estado del Stock
            </CardTitle>
            <CardDescription>
              Distribución de productos por nivel de stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stockStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stockStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stockStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
                              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                                      <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mx-auto mb-2">
                    <Leaf className="h-6 w-6 text-gray-400 stroke-2" />
                  </div>
                    <p>No hay datos de stock</p>
                  </div>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Gráfica de Línea - Tendencia de Stock */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-amber-500 stroke-2" />
              </div>
              Tendencia de Stock
            </CardTitle>
            <CardDescription>
              Evolución del stock total en la semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} unidades`, 'Stock Total']} />
                <Line 
                  type="monotone" 
                  dataKey="stock" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  )
} 