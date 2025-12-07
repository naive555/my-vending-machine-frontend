import { api, handleError } from "../lib/axios";

export type ProductStock = {
  id: number;
  product_id: string;
  quantity: number;
};

export const getProductStock = async (productId: number) => {
  try {
    const res = await api.get(`/product-stock/${productId}`);
    return res.data as ProductStock;
  } catch (error) {
    throw handleError(error, "GetProductStock");
  }
};
