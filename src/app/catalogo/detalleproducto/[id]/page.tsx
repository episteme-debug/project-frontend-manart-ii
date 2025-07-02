import DetalleProductoCliente from "@/components/product/detalle-producto";
import { ObtenerProductosRelacionados } from "@/api/Producto";
import { ObtenerPorId } from "@/api/Producto";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const posts = await ObtenerProductosRelacionados(id);
  const producto = await ObtenerPorId(id);

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <DetalleProductoCliente producto={producto} posts={posts} />
  );
}

