import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { obtenerCookie } from "@/lib/ObtencionCookie"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ListarProductosPorUsuario } from "@/api/Producto"
import { DashboardCharts } from "@/components/dashboard-charts"
import { 
  Palette,
  Gem,
  Coins,
  AlertCircle,
  Camera,
  BookOpen,
  Users,
  DollarSign,
  ShoppingBag,
  Star,
  Eye,
  Heart,
  Map,
  TrendingUp,
  TrendingDown
} from "lucide-react"

export default async function DashboardPage() {
  const user = await obtenerCookie();
  if (!user) return <p>No autenticado</p>;

  // Obtener productos reales del usuario
  const productos = await ListarProductosPorUsuario() || [];
  
  // Calcular estadísticas reales
  const totalProductos = productos.length;
  const totalStock = productos.reduce((sum, producto) => sum + producto.stockProducto, 0);
  const valorTotalInventario = productos.reduce((sum, producto) => sum + (producto.precioProducto * producto.stockProducto), 0);
  const productosSinStock = productos.filter(p => p.stockProducto === 0).length;
  
  // Productos con stock bajo (menos de 5 unidades)
  const productosStockBajo = productos.filter(p => p.stockProducto > 0 && p.stockProducto < 5);
  
  // Productos con stock crítico (menos de 2 unidades)
  const productosStockCritico = productos.filter(p => p.stockProducto > 0 && p.stockProducto < 2);
  
  // Top 5 productos por stock (para mostrar los más populares)
  const topProductosPorStock = [...productos]
    .sort((a, b) => b.stockProducto - a.stockProducto)
    .slice(0, 5);

  // Productos por región
  const productosPorRegion = productos.reduce((acc, producto) => {
    acc[producto.regionProducto] = (acc[producto.regionProducto] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Datos para gráfica de área - Stock por producto
  const stockData = productos.slice(0, 8).map(producto => ({
    name: producto.nombreProducto.length > 12 
      ? producto.nombreProducto.substring(0, 12) + "..." 
      : producto.nombreProducto,
    stock: producto.stockProducto,
    valor: producto.precioProducto * producto.stockProducto,
    precio: producto.precioProducto
  }));

  // Datos para gráfica de barras - Distribución por región
  const regionData = Object.entries(productosPorRegion).map(([region, cantidad]) => ({
    region,
    productos: cantidad,
    stock: productos
      .filter(p => p.regionProducto === region)
      .reduce((sum, p) => sum + p.stockProducto, 0)
  }));

  // Datos para gráfica de donut - Estado del stock
  const stockStatusData = [
    { name: "Stock Alto", value: productos.filter(p => p.stockProducto >= 10).length, color: "#10b981" },
    { name: "Stock Medio", value: productos.filter(p => p.stockProducto >= 5 && p.stockProducto < 10).length, color: "#f59e0b" },
    { name: "Stock Bajo", value: productos.filter(p => p.stockProducto >= 2 && p.stockProducto < 5).length, color: "#ef4444" },
    { name: "Sin Stock", value: productos.filter(p => p.stockProducto === 0).length, color: "#6b7280" }
  ].filter(item => item.value > 0);

  // Datos para gráfica de línea - Simulación de tendencia de stock (últimos 7 días)
  const trendData = [
    { day: "Lun", stock: totalStock * 0.95 },
    { day: "Mar", stock: totalStock * 0.98 },
    { day: "Mié", stock: totalStock * 1.02 },
    { day: "Jue", stock: totalStock * 0.97 },
    { day: "Vie", stock: totalStock * 1.05 },
    { day: "Sáb", stock: totalStock * 1.08 },
    { day: "Dom", stock: totalStock }
  ];

  const statsData = [
    {
      title: "Productos Totales",
      value: totalProductos.toString(),
      change: productos.length > 0 ? "+" + productos.length : "0",
      trend: "up" as const,
      icon: Palette,
      color: "bg-purple-500",
      description: "artesanías únicas"
    },
    {
      title: "Stock Total",
      value: totalStock.toString(),
      change: totalStock > 0 ? "+" + totalStock : "0",
      trend: "up" as const,
      icon: ShoppingBag,
      color: "bg-emerald-500",
      description: "piezas disponibles"
    },
    {
      title: "Valor Inventario",
      value: `$${valorTotalInventario.toLocaleString()}`,
      change: valorTotalInventario > 0 ? "+" + valorTotalInventario.toLocaleString() : "$0",
      trend: "up" as const,
      icon: Gem,
      color: "bg-amber-500",
      description: "tesoro cultural"
    },
    {
      title: "Sin Stock",
      value: productosSinStock.toString(),
      change: productosSinStock > 0 ? "+" + productosSinStock : "0",
      trend: productosSinStock > 0 ? "down" as const : "up" as const,
      icon: AlertCircle,
      color: "bg-red-500",
      description: "requieren atención"
    }
  ];

  // Generar alertas de stock basadas en datos reales
  const stockAlerts = [
    ...productosStockCritico.map(producto => ({
      product: producto.nombreProducto,
      currentStock: producto.stockProducto,
      minStock: 2,
      status: "crítico" as const,
      color: "text-red-600",
      bgColor: "bg-red-50"
    })),
    ...productosStockBajo.filter(p => p.stockProducto >= 2).map(producto => ({
      product: producto.nombreProducto,
      currentStock: producto.stockProducto,
      minStock: 5,
      status: "bajo" as const,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }))
  ].slice(0, 4); // Mostrar máximo 4 alertas

  // Top productos por stock (simulando popularidad)
  const topProducts = topProductosPorStock.map(producto => ({
    name: producto.nombreProducto,
    stock: producto.stockProducto,
    revenue: `$${(producto.precioProducto * producto.stockProducto).toLocaleString()}`,
    growth: producto.stockProducto > 10 ? "+" + Math.floor(producto.stockProducto / 2) + "%" : "+5%",
    region: producto.regionProducto
  }));

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <ol>
              <li className="font-semibold text-muted-foreground">Dashboard</li>
            </ol>
          </Breadcrumb>
        </div>
      </header>
      
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        {/* Estadísticas Principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full border-2 ${stat.color.replace('bg-', 'border-')}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')} stroke-2`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Layout Principal */}
        <div className="w-full mt-8">
          {/* Gráficas */}
          <DashboardCharts 
            stockData={stockData}
            regionData={regionData}
            stockStatusData={stockStatusData}
            trendData={trendData}
          />

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {/* Reporte de Stock y Alertas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Alertas de Stock
                </CardTitle>
                <CardDescription>
                  Productos que requieren atención inmediata
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stockAlerts.length > 0 ? (
                  stockAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg ${alert.bgColor} border`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{alert.product}</h4>
                        <Badge 
                          variant={alert.status === "crítico" ? "destructive" : "secondary"}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Stock actual: {alert.currentStock}</span>
                        <span>Mínimo: {alert.minStock}</span>
                      </div>
                      <Progress 
                        value={(alert.currentStock / alert.minStock) * 100} 
                        className="mt-2"
                      />
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-800 font-medium">¡Excelente! No hay alertas de stock</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">Todos tus productos tienen stock suficiente</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Productos Más Vendidos */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Productos con Mayor Stock
                </CardTitle>
                <CardDescription>
                  Top productos por inventario disponible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.length > 0 ? (
                    topProducts.map((product, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center">
                          <Palette className="h-6 w-6 text-amber-500 stroke-2" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {product.stock} unidades • {product.revenue} • {product.region}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-green-600">
                          {product.growth}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mx-auto mb-2">
                        <Palette className="h-6 w-6 text-gray-400 stroke-2" />
                      </div>
                      <p>No hay productos registrados</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recomendaciones */}
          <div className="grid gap-6 md:grid-cols-2 mt-8">
            {/* Recomendación para Fotografías */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Camera className="h-5 w-5" />
                  Recomendación: Fotografías Artesanales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Consejos para mejores fotos:</h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Usa luz natural para resaltar texturas</li>
                    <li>• Incluye detalles de la artesanía</li>
                    <li>• Muestra el proceso artesanal</li>
                    <li>• Usa fondos neutros que no distraigan</li>
                    <li>• Captura múltiples ángulos del producto</li>
                  </ul>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>💡 Tip:</strong> Las fotos de alta calidad pueden aumentar las ventas hasta en un 40%
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recomendación para Historias */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                  <BookOpen className="h-5 w-5" />
                  Recomendación: Historias del Producto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Elementos de una buena historia:</h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Origen cultural y tradición</li>
                    <li>• Técnicas ancestrales utilizadas</li>
                    <li>• Artesanos y sus comunidades</li>
                    <li>• Materiales naturales empleados</li>
                    <li>• Significado cultural del producto</li>
                  </ul>
                </div>
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>💡 Tip:</strong> Los productos con historias bien contadas tienen 3x más probabilidad de venta
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas Generales */}
          {productosStockCritico.length > 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertTitle className="text-orange-800">Acción Requerida</AlertTitle>
              <AlertDescription className="text-orange-700">
                Tienes {productosStockCritico.length} productos con stock crítico que requieren reabastecimiento inmediato. 
                <a href="/dashboard/productos" className="ml-2 underline font-medium">Ver productos →</a>
              </AlertDescription>
            </Alert>
          )}

          {productos.length === 0 && (
            <Alert className="border-blue-200 bg-blue-50">
              <Palette className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">¡Comienza a vender!</AlertTitle>
              <AlertDescription className="text-blue-700">
                Aún no tienes productos registrados. 
                <a href="/dashboard/productos/nuevo" className="ml-2 underline font-medium">Agregar tu primer producto →</a>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </SidebarInset>
  )
}
