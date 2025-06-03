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
    <main className='min-h-screen'>
        <CardCatalogo posts={currentPosts} page={page} totalPages={totalPages} />        
    </main>
  );
}
