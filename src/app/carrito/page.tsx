import ListarProductoCarritos from "../../components/carrito/listar-productos-carrito";
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

export default async function Carrito() {
  
  return (
      <section className="bg-gray-450 shadow-2xl w-[90%] rounded-md p-5">
        <div>
          <ListarProductoCarritos />
        </div>
        <div className="w-full  grid  justify-items-center">
        </div>
      </section>
  );
}