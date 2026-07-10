import { api } from "@/services/api";

export const getProducts = async () => (await api.get("/products")).data;
export const getProduct = async (id) => (await api.get(`/products/${id}`)).data;
