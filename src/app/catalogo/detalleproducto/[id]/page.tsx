import DetalleProductoCliente from "@/components/product/detalle-producto";
import { ObtenerProductosRelacionados } from "@/api/Producto";
import { ObtenerPorId } from "@/api/Producto";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const posts = await ObtenerProductosRelacionados(id);
  const producto = await ObtenerPorId(id);

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb 
          items={[
            { label: "Catálogo", href: "/catalogo" },
            { label: producto.nombreProducto, isCurrent: true }
          ]} 
          className="mb-6"
        />
      </div>
      <DetalleProductoCliente producto={producto} posts={posts} />
    </>
  );
}

