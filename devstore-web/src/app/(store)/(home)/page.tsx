import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedProducts(): Promise<Product[]> {
  const response = await api("/products/featured", {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });
  const products = await response.json();
  return products;
}

export const metadata: Metadata = {
  title: "Home",
}


export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts();

  return (
    <main className="grid msx-h-[860px] grid-cols-9 grid-rows-6 gap-6">
      <Link
        href={`product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={highlightedProduct.image}
          className="group-hover:scale-105 transition-transform duration-500"
          alt={highlightedProduct.title}
          width={920}
          height={920}
          quality={100}
        />
        <div className="absolute bottom-28 right-28 h-12 flex gap-2 items-center max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="text-sm truncate">{highlightedProduct.title}</span>
          <span className="flex h-full items-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      {otherProducts.map((product) => (
        <Link
          key={product.id}
          href={`product/${product.slug}`}
          className="relative group col-span-3 row-span-3 rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
        >
          <Image
            className="group-hover:scale-105 transition-transform duration-500"
            src={product.image}
            alt={product.title}
            width={920}
            height={920}
            quality={100}
          />
          <div className="absolute bottom-10 right-10 h-12 flex gap-2 items-center max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="text-sm truncate"> {product.title}</span>
            <span className="flex h-full items-center rounded-full bg-violet-500 px-4 font-semibold">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </main>
  );
}
