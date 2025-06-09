import ListarProductoCarritos from "../../components/listarProductoCarritos";
import { getPrimerosCinco } from "../../services/apis/traerPrimerosCinco";
import CardCarusel from "../../components/cardCaruselCarrito";

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
  const posts: Post[] = await getPrimerosCinco();
  return (
    <section className="w-full min-h-screen bg-gray-100  grid  justify-items-center">
      <section className="bg-gray-450 shadow-2xl max-w-[85%] rounded-md p-5">
        <div>
          <ListarProductoCarritos />
        </div>
        <div className="w-full  grid  justify-items-center">
          <div className="col-start-1 col-end-8 w-ful max-w-[95%]">
            <h1>Esto también te podría interesar</h1>
            <br />
            <div className="">
              <Carousel className=" ">
                <CarouselPrevious className="z-50 bg-white shadow-md" />
                <CarouselContent className="w-auto ">
                  {posts.map((post, index) => (
                    <CarouselItem key={index} className="basis-1/4 ">
                      <CardCarusel posts={[post]} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselNext className=" z-50 bg-white shadow-md" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
