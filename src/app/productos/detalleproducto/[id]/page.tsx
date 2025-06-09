import CardCarusel from "../../../../components/cardCarusel";
import { getPrimerosCinco } from "../../../../services/apis/traerPrimerosCinco";
import ActivarBoton from "../../../../components/agregarCarrito";
import ComparaAhora from "../../../../components/comparAhora"
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
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type id = {
  idProducto: number;
};

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
const stars = Array(5).fill(0);

export default async function Page({ params }: Props) {
  const posts: Post[] = await getPrimerosCinco();
  const { id } = params;

  let producto: Post | null = null;

  try {
    const res = await axios.get<Post>(
      `http://localhost:8080/api/producto/public/obtenerporid/${id}`
    );
    producto = res.data;
  } catch (error) {
    console.error("Error cargando producto:", error);
  }

  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <section className="grid w-full h-screen p-2 justify-items-center ">
      <section className="grid grid-cols-10 bg-gray-450 shadow-2xl max-w-[85%] rounded-md p-5">
        <div className="flex mr-1  pt-5 col-span-4 rounded-tl-lg h-[465px]">

          <div className="relative  h-full overflow-hidden">
            <Carousel orientation="vertical" className="w-full h-full relative">
              <CarouselContent className="flex flex-col h-full">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CarouselItem
                    key={i}
                    className="relative flex justify-center items-center h-[70px] mb-1"
                  >
                    <div className="relative w-[60px] h-[60px]">
                      <Image
                        src="/logo.png"
                        alt={`Logo ${i}`}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>


          <div className="ml-6 flex-1 h-full">
            <div className="relative w-full h-full">
              <Image
                src="/logo.png"
                alt="Main Image"
                fill
                className="rounded-lg object-cover  border-1 border-gray"
              />
            </div>
          </div>
        </div>


        <div className="col-span-3  pt-5  p-3 h-150">
          <div className="flex justify-end pr-5 ">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
          <h1 className="text-4xl text-amber-500 pb-4">
            {producto.nombreProducto}
          </h1>
          <h3 className="text-2xl pb-3">
            Precio: ${producto.precioProducto} COP
            <span className="text-xl text-gray-500 line-through">
              {" "}
              Precio anterior
            </span>
          </h3>
          <div className="col-start-1 col-end-5 flex pb-3">
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
          <p className="text-xl pb-3">Nombre del artesano</p>
          <p className="text-xl pb-3">{producto.descripcionProducto}</p>
        </div>

        <div className=" col-span-3   ">
          <div className="  rounded-lg   m-5 ">
            <Card className="h-[100%] min-h-50">
              <CardHeader>
                <CardTitle>
                  Cantidad disponibles: {producto.stockProducto}
                </CardTitle>
                <CardDescription>Costo de Envio: $$$$</CardDescription>
              </CardHeader>

              <ComparaAhora idProducto={producto.idProducto} />

              <ActivarBoton idProducto={producto.idProducto} />
            </Card>
          </div>
          <div className=" rounded-lg m-5 ">
            <Card className="h-[100%] min-h-50">
              <CardHeader>
                <CardTitle>Metodos de pago</CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corporis, necessitatibus illum. Saepe mollitia optio, dolorum
                  consequatur, laboriosam fugiat nihil iure nisi soluta corrupti
                  vero, officia tempora quas eaque beatae voluptates.
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <Image
                  src="/Metodo_de_pago.png"
                  alt="Metodo_de_pago"
                  width={900}
                  height={600}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="col-start-1 col-end-8 h-full  ">
          <hr />
          <div className="flex-auto m-2 shadow-2x1 p-2">
            <h1 className="text-2xl">Descripcion del producto</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Distinctio voluptatibus earum qui? Unde natus porro quis dolorum
              enim accusamus commodi laboriosam fugit nihil voluptatibus
              adipisci eum reiciendis praesentium, architecto voluptatum.
            </p>
          </div>
          <div className="border-1 border-gray-200"></div>
          <div className="flex-auto m-2 shadow-2x1  ">
            <h1 className="text-2xl">detalle del producto</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
              magnam nulla iste voluptatem id minus totam veniam laborum eveniet
              omnis? Animi eius dignissimos incidunt magnam eligendi perferendis
              possimus quasi esse!
            </p>
          </div>
          <div></div>
        </div>
        <div className="col-start-1 col-end-11 mt-5 grid grid-cols-6 w-full  h-[350px] ">
          <div className="col-span-2 ml-2 w-80">
            <h1>Opiniones del producto</h1>
            <img src="/Estrellas.png" alt="" />
          </div>
          <div className="col-span-4">
            <h1>Las más recientes</h1>

            <div className="relative h-[300px]">
              <Carousel orientation="vertical" className="relative h-full">
                <CarouselPrevious className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md" />

                <CarouselContent className=" h-80">
                  <CarouselItem className="basis-1/2 border-2 border-gray-200">
                    <div className="grid grid-cols-5  h-auto p-2 ">
                      <div className="col-span-4">
                        <p>
                          {" "}
                          OPINION Lorem ipsum dolor sit amet consectetur,
                          adipisicing elit. Ad et dolorum dolor nulla suscipit
                          aliquam? Iusto quia tempora dignissimos exercitationem
                          autem id esse rem illum! Cumque officiis facere ipsam
                          rerum.
                        </p>
                      </div>
                      <div className="col-span-1 ml-14 ">
                        <span>02/11/2025</span>
                      </div>
                      <div className="col-start-1 col-end-5 flex">
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
                <CarouselNext className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md" />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="w-full col-start-1 col-end-11  grid  justify-items-center">
          <div className=" p-3 max-w-[95%]">
            <hr />
            <h1>Esto también te podría interesar</h1>
            <br />
            <div className="">
              <Carousel className="">
                <CarouselPrevious className=" z-50 bg-white shadow-md" />

                <CarouselContent className="w-[100%] ">
                  {posts.map((post, index) => (
                    <CarouselItem key={index} className="basis-1/4">
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
