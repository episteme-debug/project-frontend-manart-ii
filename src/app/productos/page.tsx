import CardCatalogo from '../../components/producto/CardCatalogo';
import { obtenerPosts } from '../../services/apis/producto/traerTodosLosProductos';
import { traersCategorias } from '../../services/apis/producto/traersCategorias';
import { traerPromociones } from '../../services/apis/producto/traerPromociones';
import { RagodePreciso } from "../../services/apis/producto/traerRangodePrecio"
interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}
interface Categoria {
  idCategoria: number;
  nombreCategoria: string;
  descripcionCategoria: string;
  estadoCategoria: boolean;
  archivoMultimedia: any[];
}
interface Promocion {
  idPromocion: number;
  nombrePromocion: string;
  porcentajeDescuentoPromocion: number;
  estadoPromocion: boolean;
}
 interface Rango {
  precioMinimo: number;
  precioMaximo: number;
}
interface Props {
  searchParams?: {
    page?: string;
  };
}

export default async function CatalogoProducto({ searchParams }: Props) {
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = 15;

  const posts = await obtenerPosts();
  const categorias = await traersCategorias();
  const promociones = await traerPromociones();
  const Rango = await RagodePreciso();

  const totalPages = Math.ceil(posts.length / limit);
  const startIndex = (page - 1) * limit;
  const currentPosts = posts.slice(startIndex, startIndex + limit);

  return (
    <main className='min-h-screen'>
      <CardCatalogo
        posts={currentPosts}
        page={page}
        totalPages={totalPages}
        categorias={categorias}
        promociones={promociones}
        rango={Rango}
      />

    </main>
  );
}
