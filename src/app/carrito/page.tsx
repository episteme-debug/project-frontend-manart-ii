import ListarProductoCarritos from "../../components/listarProductoCarritos";
import { getPrimerosCinco } from '../../services/apis/getPrimerosCinco';
import CardCarusel from '../../components/cardCarusel';

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
    <section className="w-full min-h-screen bg-gray-100 p-5">
      <div>
       <ListarProductoCarritos />
       </div>
      <div className="col-start-1 col-end-8 p-3 w-full">
        <h1>Esto también te podría interesar</h1>
        <br />
        <div className="relative">
          <Carousel className='relative'>
            <CarouselPrevious className='absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white shadow-md' />
            <CarouselContent className='w-auto'>
              {posts.map((post, index) => (
                <CarouselItem key={index} className="basis-1/4 shadow-lg">
                  <CardCarusel posts={[post]} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white shadow-md" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
