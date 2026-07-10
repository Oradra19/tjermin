"use client";
import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/services/product.service";
export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: getProducts });
export const useProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
