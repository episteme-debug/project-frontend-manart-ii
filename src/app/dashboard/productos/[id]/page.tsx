import { obtenerUsuarioPorId } from "@/api/Usuario"
import { ProductForm } from "@/components/product/product-form"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ProductoRespuesta } from "@/interfaces/ProductoInterfaz"

const getProductById = (producto: ProductoRespuesta, idUsuario: number) => {
  return {
    idUsuario: idUsuario,
    idProducto: producto.idProducto,
    nombreProducto: producto.nombreProducto,
    descripcionProducto: producto.descripcionProducto,
    precioProducto: producto.precioProducto,
    stockProducto: producto.stockProducto,
    listaCategorias: producto.listaCategorias,
    regionProducto: producto.regionProducto,
    listaArchivos: producto.listaArchivos
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  let product
  let user
  try {
    user = await obtenerUsuarioPorId()
    if (!user) {
      return <p>Error al obtener el usuario</p>
    }

    const idProducto = Number(params?.id)

    if (isNaN(idProducto)) {
      return <p>ID de producto inválido</p>
    }

    const obtenerProducto = user.listaProductos.find(p => p.idProducto === idProducto)
    if (!obtenerProducto) {
      return <p>Cargando...</p>;
    }
    product = getProductById(obtenerProducto, user.idUsuario)

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
          <Breadcrumb 
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Productos", href: "/dashboard/productos" },
              { label: "Editar Producto", isCurrent: true }
            ]} 
          />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold">Editar Producto</h1>
          <ProductForm product={product} idUsuario={user.idUsuario} />
        </div>
      </div>
    </SidebarInset>
  )
}
