import CardCatalogo from '@/components/product/card-catalogo'
import { ObtenerProductos } from '@/api/Producto';
import { TraerCategorias } from '@/api/CategoriaProducto';
import { TraerPromociones } from '@/api/Promocion';
import { RagodePrecios } from '@/api/Producto';

/* interface Post {
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
} */

interface Props {
  searchParams?: {
    page?: string;
  };
}

export default async function CatalogoProducto({ searchParams }: Props) {
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = 15;

  const posts = await ObtenerProductos();
  const categorias = await TraerCategorias();
  const promociones = await TraerPromociones();
  const Rango = await RagodePrecios();

  const totalPages = Math.ceil(posts.length / limit);
  const startIndex = (page - 1) * limit;
  const currentPosts = posts.slice(startIndex, startIndex + limit);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      <CardCatalogo
        posts={currentPosts}
        page={page}
        totalPages={totalPages}
        categorias={categorias}
        promociones={promociones}
        rango={Rango}
      />
    </section>

  );
}