import DetalleProductoCliente from "../../../../components/detalleProductos/detalleproducto"
import { getPrimerosCinco } from "../../../../services/apis/detalleProducto/traerPrimerosCinco";
import { traerPorId } from "../../../../services/apis/detalleProducto/traerPorId";

interface Props {
  params: { id: string };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const posts = await getPrimerosCinco(id);
  const producto = await traerPorId(id);

  if (!producto) return <p>Producto no encontrado</p>;

  return <DetalleProductoCliente producto={producto} posts={posts} />;
}
