"use client";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useProduct, useProducts } from "@/features/products/hooks/useProducts";
import { ProductDetail } from "./ProductDetail";
export function ProductDetailPage() {
  const params = useParams();
  const { data: product, isLoading, isError, refetch } = useProduct(params.id);
  const { data: products } = useProducts();
  return (
    <>
      <Navbar />
      <main>
        <ProductDetail
          product={product}
          products={products}
          isLoading={isLoading}
          isError={isError}
          onRetry={refetch}
        />
      </main>
      <Footer />
    </>
  );
}
