import ListarProductoCarritos from "../../components/carrito/listarProductoCarritos";
import { getPrimerosCinco } from "../../services/apis/detalleProducto/traerPrimerosCinco";
import CardCarusel from "../../components/carrito/cardCaruselCarrito";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}

export default async function Home() {
  
  return (
    <section className="w-full min-h-screen bg-gray-100  grid  justify-items-center">
      <section className="bg-gray-450 shadow-2xl max-w-[85%] rounded-md p-5">
        <div>
          <ListarProductoCarritos />
        </div>
        <div className="w-full  grid  justify-items-center">
        </div>
      </section>
    </section>
  );
}
