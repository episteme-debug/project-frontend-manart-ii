import CardCarusel from '../../../../components/cardCarusel';
import { getPrimerosCinco } from '../../../../services/apis/traerPrimerosCinco';
import ActivarBoton from '../../../../components/agregarCarrito'
import axios from "axios";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}

interface Props {
  params: { id: string };
}
const stars = Array(5).fill(0)

export default async function Page({ params }: Props) {
  const posts: Post[] = await getPrimerosCinco();
  const { id } = params;

  let producto: Post | null = null;

  try {
    const res = await axios.get<Post>(`http://localhost:8080/api/producto/public/obtenerporid/${id}`);
    producto = res.data;
  } catch (error) {
    console.error("Error cargando producto:", error);
  }

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <section className="grid w-full h-screen p-2 justify-items-center">
      <section className="grid grid-cols-10 bg-gray-450 shadow-2xl max-w-[80%] rounded-md ">
        <div className="flex flex-col  p-3 pt-5 col-span-4  rounded-tl-lg  h-150">
          <div className="">
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
          <div className="mt-5 relative">
            <Carousel className="shadow-xl m-0 relative" >
              <CarouselPrevious className='obsolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md' />
              <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 w-full">
                  <Image src="/logo.png" alt="Logo" width={200} height={100} />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Image src="/logo.png" alt="Logo" width={200} height={100} />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Image src="/logo.png" alt="Logo" width={200} height={100} />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                  <Image src="/logo.png" alt="Logo" width={200} height={100} />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Image src="/logo.png" alt="Logo" width={200} height={100} />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <Image src="/logo.png" alt="Logo" width={200} height={100} />
                </CarouselItem>
              </CarouselContent>
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md" />
            </Carousel>
          </div>
        </div>
        <div className="col-span-3  pt-5  p-3 h-150">
          <div className="flex justify-end pr-5 ">
            <button >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-2xl">{producto.nombreProducto}</h1>
          <h3>Precio: ${producto.precioProducto} COP</h3>
          <p>Nombre del artesano</p>
          <p>
            {producto.descripcionProducto}
          </p>
        </div>

        <div className=" col-span-3   ">
          <div className="  rounded-lg   m-5">
            <Card className="h-[100%]">
              <CardHeader>
                <CardTitle>Cantidad disponibles:{producto.stockProducto}</CardTitle>
                <CardDescription>Costo de Envio</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Cantidad: <span>1</span>
                </p>
              </CardContent>
              <Button variant="outline" className="mr-5 ml-5">
                Comprar Ahora
              </Button>
              <ActivarBoton idProducto={producto.idProducto} />
            </Card>
          </div>
          <div className=" rounded-lg m-5 ">
            <Card className="h-[100%]">
              <CardHeader>
                <CardTitle>Metodos de pago</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, necessitatibus illum. Saepe mollitia optio, dolorum
                  consequatur, laboriosam fugiat nihil iure nisi soluta corrupti
                  vero, officia tempora quas eaque beatae voluptates.
                </CardDescription>
              </CardHeader>
              <CardContent className=''>
                <Image src="/Metodo_de_pago.png" alt="Metodo_de_pago" width={900} height={600} />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='col-start-1 col-end-8 h-full  '>
          <hr />
          <div className='flex-auto m-2 shadow-2x1 p-2'  >
            <h1 className='text-2xl'>Descripcion del producto</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio voluptatibus earum qui? Unde natus porro quis dolorum enim accusamus commodi laboriosam fugit nihil voluptatibus adipisci eum reiciendis praesentium, architecto voluptatum.</p>
          </div>
          <div className='border-1 border-gray-200'></div>
          <div className='flex-auto m-2 shadow-2x1  '>
            <h1 className='text-2xl'>Espesificaciones del producto</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime magnam nulla iste voluptatem id minus totam veniam laborum eveniet omnis? Animi eius dignissimos incidunt magnam eligendi perferendis possimus quasi esse!</p>
          </div>
          <div>
          </div>
        </div>
        <div className='col-start-1 col-end-9 mt-5 grid grid-cols-6 p-2 w-[114%]  h-[350px] '>
          <div className='col-span-2 w-76 ml-2 '>
            <h1>Opiniones del producto</h1>
            <img src="/logo.png" alt="" />
          </div>
          <div className='col-span-4'>
            <h1>Las más recientes</h1>

            <div className="relative h-[300px]">
              <Carousel orientation="vertical" className="relative h-full">


                <CarouselPrevious
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md"
                />

                <CarouselContent className=' h-80'>
                  <CarouselItem className="basis-1/2 shadow-md">
                    <div className='grid grid-cols-5  h-auto p-2 '>
                      <div className='col-span-4'>
                        <p > OPINION Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad et dolorum dolor nulla suscipit aliquam? Iusto quia tempora dignissimos exercitationem autem id esse rem illum! Cumque officiis facere ipsam rerum.</p>
                      </div>
                      <div className='col-span-1 ml-14 '>
                        <span>02/11/2025</span>
                      </div>
                      <div className='col-start-1 col-end-5 flex'>
                        {stars.map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={i < 1 ? "yellow" : "none"}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselNext
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md"
                />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-10 p-3 max-w-[100%]">
          <hr />
          <h1>Esto también te podría interesar</h1>
          <br />
          <div className="relative">
            <Carousel className="relative">

              <CarouselPrevious
                className="absolute top-1/2 left-0 -translate-y-1/2 z-10 bg-white shadow-md"
              />

              <CarouselContent className="w-auto">
                {posts.map((post, index) => (
                  <CarouselItem key={index} className="basis-1/4 shadow-lg">
                    <CardCarusel posts={[post]} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselNext
                className="absolute top-1/2 right-0 -translate-y-1/2 z-10 bg-white shadow-md"
              />

            </Carousel>
          </div>
        </div>

      </section>
    </section>
  )
}



