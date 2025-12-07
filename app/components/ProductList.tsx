import Image from "next/image";

import { ProductWithStock } from "../api/products";

export default function ProductList({
  products,
  selected,
  onSelect,
}: {
  products: ProductWithStock[];
  selected: ProductWithStock | null;
  onSelect: (product: ProductWithStock) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 mb-6">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onSelect(product)}
          className={`p-4 border rounded-xl shadow text-left cursor-pointer ${
            selected?.id === product.id ? "bg-blue-100" : "bg-white"
          }`}
          disabled={product.stock === 0}
        >
          {product.image_url && (
            <Image
              width={200}
              height={400}
              src={product.image_url}
              alt={product.name}
              loading="eager"
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <div className="font-semibold">{product.name}</div>
          <div className="text-sm text-gray-600">Price: {product.price}</div>
          {product.stock && (
            <div className="text-sm text-gray-600">Stock: {product.stock}</div>
          )}
        </button>
      ))}
    </div>
  );
}
