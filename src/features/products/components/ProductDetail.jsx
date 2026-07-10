"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import { Container } from "@/components/layout/Container";
import { Rating } from "@/components/ui/Rating";
import { ProductCard, ProductSkeleton } from "./ProductCard";

export function ProductDetail({
  product,
  products,
  isLoading,
  isError,
  onRetry,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (isLoading)
    return (
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="h-[500px] animate-pulse rounded-2xl bg-slate-100" />
          <div className="space-y-5">
            <div className="h-8 w-3/4 animate-pulse rounded bg-slate-100" />
            <div className="h-40 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      </Container>
    );

  if (isError || !product)
    return (
      <Container className="grid min-h-[50vh] place-items-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Product unavailable</h1>

          <button
            onClick={onRetry}
            className="mt-4 rounded-xl bg-navy px-5 py-3 text-sm text-white"
          >
            Try again
          </button>
        </div>
      </Container>
    );

  const related = (products ?? [])
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .slice(0, 3);

  return (
    <Container className="py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-navy"
      >
        <ChevronLeft size={17} />
        Back to collection
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="relative grid min-h-[460px] place-items-center rounded-2xl bg-surface p-12">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width:1024px)100vw,50vw"
            className="object-contain p-12"
          />
        </div>

        {/* Content */}
        <section>
          <p className="text-sm font-semibold uppercase tracking-widest text-navy">
            {product.category}
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <Rating value={product.rating.rate} />

            <span className="text-sm text-muted">
              {product.rating.count} reviews
            </span>
          </div>

          <p className="mt-7 text-3xl font-bold">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 leading-7 text-muted">
            {product.description}
          </p>

          {/* Quantity + Wishlist */}
          <div className="mt-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex overflow-hidden rounded-lg border border-slate-200">
                <button
                  onClick={() =>
                    quantity > 1 && setQuantity(quantity - 1)
                  }
                  className="flex h-11 w-11 items-center justify-center text-slate-500 transition hover:bg-slate-100"
                >
                  −
                </button>

                <div className="flex h-11 w-12 items-center justify-center border-x border-slate-200 text-sm font-medium">
                  {quantity}
                </div>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center text-slate-500 transition hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <button
                aria-label="Wishlist"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 transition hover:border-navy hover:text-navy"
              >
                <Heart size={18} />
                Wishlist
              </button>
            </div>

            <button
              onClick={() => dispatch(addToCart({ product, quantity }))}
              className="w-full rounded-lg bg-navy py-3.5 text-sm font-semibold text-white transition hover:bg-[#1D355D]"
            >
              Add to Cart
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 grid gap-4 text-sm text-muted sm:grid-cols-3">
            <p className="flex gap-2">
              <Truck size={18} className="text-navy" />
              Free delivery
            </p>

            <p className="flex gap-2">
              <RotateCcw size={18} className="text-navy" />
              Easy returns
            </p>

            <p className="flex gap-2">
              <ShieldCheck size={18} className="text-navy" />
              Secure payment
            </p>
          </div>
        </section>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold">
          You may also like
        </h2>

        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.length
            ? related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))
            : Array.from({ length: 3 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))}
        </div>
      </section>
    </Container>
  );
}