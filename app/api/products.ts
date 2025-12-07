import { api, handleError } from "../lib/axios";

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url?: string;
};

export type ProductWithStock = Product & { stock?: number };

export const getProducts = async () => {
  try {
    const res = await api.get("/products/");
    return res.data as Product[];
  } catch (error) {
    console.info("[api.getProducts]:", error);
    return [];
  }
};

export const getProduct = async (id: number) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data as Product;
  } catch (error) {
    throw handleError(error, "GetProduct");
  }
};
