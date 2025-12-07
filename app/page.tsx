"use client";

import { useEffect, useState } from "react";

import { getProductStock } from "./api/product-stock";
import { getProducts, Product, ProductWithStock } from "./api/products";
import { Change, purchaseProduct } from "./api/purchase";
import PaymentModal from "./components/PaymentModal";
import ProductList from "./components/ProductList";

export default function Page() {
  const [products, setProducts] = useState<ProductWithStock[]>([]);
  const [selected, setSelected] = useState<ProductWithStock | null>(null);
  const [payment, setPayment] = useState<Record<number, number>>({});
  const [message, setMessage] = useState("");
  const [change, setChange] = useState<Change[] | null>(null);
  const [loading, setLoading] = useState(false);

  const loadProductsWithStock = async (): Promise<ProductWithStock[]> => {
    const products = await getProducts();

    const withStock = (await Promise.all(
      products.map(async (product: Product) => {
        const stock = await getProductStock(product.id);
        return {
          ...product,
          stock: stock?.quantity ?? 0,
        };
      })
    )) as ProductWithStock[];

    return withStock;
  };

  useEffect(() => {
    let ignore = false;

    (async () => {
      const products = await loadProductsWithStock();
      if (!ignore) setProducts(products);
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const loadProducts = async () => {
    const products = await loadProductsWithStock();
    setProducts(products);
  };

  const handlePurchase = async () => {
    if (!selected) return;

    setLoading(true);
    setMessage("");
    setChange(null);

    const payments = Object.entries(payment)
      .filter(([_, count]) => count > 0)
      .map(([denom, count]) => ({ denomination: Number(denom), count }));

    try {
      const result = await purchaseProduct({
        product_id: selected.id,
        payment: payments,
      });

      setMessage(result.message || "Success");
      setChange(result.change);
      setPayment({});

      await loadProducts();
    } catch (error) {
      const errorIns = error as Error;
      setMessage(errorIns.message || "Error");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vending Machine</h1>

      <ProductList
        products={products}
        selected={selected}
        onSelect={setSelected}
      />

      {selected && (
        <PaymentModal
          selected={selected}
          payment={payment}
          setPayment={setPayment}
          loading={loading}
          message={message}
          change={change}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
}
