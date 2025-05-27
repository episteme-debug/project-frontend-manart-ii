
import { redirect } from "next/navigation";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import CardCarusel from '../../components/cardCarusel';
import { getPrimerosCinco } from '../../services/apis/getPrimerosCinco';
import Link from 'next/link';
import { Button } from "@/components/ui/button"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Post {
  id: number;
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}

export default async function Home() {
  const posts: Post[] = await getPrimerosCinco();
  return (
    <section className="w-full  min-h-screen bg-gray-100  p-5">
      <div className="w-full flex">
        <div className=" w-[75%] bg-white shadow-xl p-5  ">
          <div className="flex w-full shadow-xs mb-5">
            <div className=" w-50 ">
              <AspectRatio ratio={14 / 9}>
                <Image
                  src="/logo.png"
                  alt="Image"
                  className="rounded-md  object-cover w-full h-full"
                  width={600}
                  height={0}
                />
              </AspectRatio>
            </div>
            <div className=" w-full content-center grid grid-cols-8">
              <div className="col-span-4 b pl-3">
                <h1>Nombre del producto</h1>
                <span>unidades disponibles</span>
                <p>cosa importantes</p>
              </div>
              <div className="col-span-2  justify-items-center w-auto">
                <label htmlFor="">Cantidad</label>
                <div className="flex justify-self-center ">
                  <button className=" bg-gray-300 w-10">-</button>
                  <input type="text" className="text-center w-10 border-2 border-gray-950" min={1} />
                  <button className="bg-gray-300 w-10 ">+</button>
                </div>
              </div>
              <div className="col-span-2 content-center justify-items-center ">
                <p><span>$</span>Precio <span>COP</span></p>
              </div>
              <div className="col-start-1 col-end-8  pl-3  ">
                <Link href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400">Eliminar</Link>
                <Link href="#" className="underline hover:text-blue-600 dark:hover:text-blue-400 ml-5">Compra ahora</Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[25%] pr-5 pl-5">
          <div className="shadow-2xl bg-white justify-items-center">
            <h1 className="text-2xl">Resumen de compra</h1>
            <hr />
            <br />
            <p className="text-xl">Sudtotal:</p>
            <hr />
            <br />
            <p className="text-xl">Costo de envio:</p>
            <hr />
            <br />
            <p className="text-xl">Cupones:</p>
            <hr />
            <br />
            <p className="text-xl">Total de compra:</p>
            <hr />
            <br />
            <Button variant="outline" className=' bg-amber-300 mb-4  
            '>Continuar con la compra</Button>
          </div>
        </div>
      </div>
      <div className="col-start-1 col-end-8 p-3 w-[100%]">
        <h1>Esto tambien te podria interesar</h1>
        <br />
        <div className="relative ">
          <Carousel className=' relative  '>
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
