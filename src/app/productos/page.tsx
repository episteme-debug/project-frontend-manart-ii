import CardCatalogo from '../../components/CardCatalogo';
import { obtenerPosts } from '../../services/apis/GetTodosLosProductos';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Button } from "@/components/ui/button"


interface Post {
  idProducto: number;
  nombreProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  stockProducto: number;
}
interface Props {
  searchParams?: {
    page?: string;
  };
}
const stars = Array(5).fill(0)
import Link from "next/link";
export default async function CatalogoProducto({ searchParams }: Props) {
  const page = parseInt(searchParams?.page || '1', 10);
  const limit = 20;

  const posts = await obtenerPosts();

  const totalPages = Math.ceil(posts.length / limit);
  const startIndex = (page - 1) * limit;
  const currentPosts = posts.slice(startIndex, startIndex + limit);

  return (
    <main>
      <section className="grid grid-cols-5 w-full min-h-screen ">

        <div className=" col-span-1 row-span-2 mt-3 pt-1 shadow-2xl h-auto mr-5">
          <h2 className='text-2xl'>Categorias</h2>
          <div className='grid  p-1'>
            <Link href="#">Categoria 1</Link>
            <Link href="#">Categoria 2</Link>
            <Link href="#">Categoria 3</Link>
          </div>
          <br />

          <div className=' p-1'>
            <label className='m-1 text-2xl' >Precio</label>
            <div className=' p-1 flex'>
              <input type="number" min="60000" max="450000" name="cantidadMinima" id="" className='border-2  w-[45%] m ' placeholder="Lo minimo es:" />
              <InputOTPSeparator />
              <input type="number" min="60000" max="450000" name="cantidadMaxima" id="" className='border-2  w-[45%]' placeholder="Lo maximo es:" />
            </div>
            <div>
              <Button variant="outline" className='m-1 '>Filtrar</Button>
            </div>
          </div>
          <br />
          <div className=' p-1'>
            <h2 className='text-2xl'>Descuentos</h2>
            <Link href="#">20% dcto o mas</Link>
            <br />
            <Link href="#">30% dcto o mas</Link>
            <br />
            <Link href="#">40% dcto o mas</Link>
            <br />
            <Link href="#">50% dcto o mas</Link>
            <br />
            <Link href="#">60% dcto o mas</Link>
            <br />
            <Link href="#">70% dcto o mas</Link>
            <br />

          </div>
          <br />
          <div className=' p-1'>
            <h2 className='text-2xl'>Calificacion</h2>
            <div className="flex">
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
          <br />
          <div className=' p-1'>
            <h2 className='text-2xl'>Regiones</h2>
            <Link href="#">Región Andina</Link>
            <br />
            <Link href="#">Región Caribe</Link>
            <br />
            <Link href="#">Región Pacífica</Link>
            <br />
            <Link href="#">Región Amazónica</Link>
            <br />
            <Link href="#">Región Orinoquía</Link>
            <br />
            <Link href="#">Región Insular</Link>
            <br />
          </div>
        </div>
        <div className='w-full '><CardCatalogo posts={currentPosts} />
        </div>
        <div className=" col-span-4 flex justify-center center m-5"  >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={`?page=${Math.max(1, page - 1)}`} />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`?page=${i + 1}`}
                    aria-current={page === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext href={`?page=${Math.min(totalPages, page + 1)}`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </main>
  );
}
