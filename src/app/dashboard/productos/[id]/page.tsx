import { obtenerUsuarioPorId } from "@/api/Usuario"
import { ProductForm } from "@/components/product/product-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ProductoRespuesta } from "@/interfaces/ProductoInterfaz"

const getProductById = (producto: ProductoRespuesta) => {
  const id = producto.idProducto

  return {
    id: id,
    name: producto.nombreProducto,
    description: producto.descripcionProducto,
    price: producto.precioProducto,
    stock: producto.stockProducto,
    category: producto.listaCategorias,
    region: producto.regionProducto,
    image: `/placeholder.svg?height=400&width=400&text=Producto+${id}`,
    createdAt: new Date().toISOString(),
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let product
  try {
    const user = await obtenerUsuarioPorId()
    const obtenerProducto = user.listaProductos.find(p => p.idProducto === parseInt(params.id))
    if (!obtenerProducto) {
      return <p>Cargando...</p>;
    }
    product = getProductById(obtenerProducto)
  } catch (e) {
    console.error("Error inesperado")
    return <p>Error al cargar el producto.</p>;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/productos">Productos</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Editar Producto</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold">Editar Producto</h1>
          <ProductForm product={product} />
        </div>
      </div>
    </SidebarInset>
  )
}
