import { api, handleError } from "../lib/axios";

export type Change = {
  denomination: number;
  count: number;
};

export type PurchaseRequest = {
  product_id: number;
  payment: Change[];
};

export type PurchaseResponse = {
  success: boolean;
  change: Change[];
  remaining_stock: number;
  message: string;
};

export const purchaseProduct = async (payload: PurchaseRequest) => {
  try {
    const res = await api.post("/purchase", payload);
    return res.data as PurchaseResponse;
  } catch (error) {
    throw handleError(error, "PurchaseProduct");
  }
};
