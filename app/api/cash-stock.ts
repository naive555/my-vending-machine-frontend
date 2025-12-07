import { api } from "../lib/axios";

export type CashStock = {
  denomination: string;
  quantity: number;
};

export const getCashStocks = async () => {
  try {
    const res = await api.get("/cash-stock/");
    return res.data as CashStock[];
  } catch (error) {
    console.info("[api.getCashStock]:", error);
    return [];
  }
};
