/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";

import ProductList from "../ProductList";
import { ProductWithStock } from "../../api/products";

jest.mock("next/image", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function MockImage(props: any) {
    return <img {...props} />;
  };
});

const mockProducts: ProductWithStock[] = [
  {
    id: 1,
    name: "Coke",
    price: 20,
    stock: 5,
    image_url: "/coke.png",
  },
  {
    id: 2,
    name: "Pepsi",
    price: 18,
    stock: 0,
    image_url: "/pepsi.png",
  },
];

describe("<ProductList />", () => {
  test("renders products with correct name, price, and stock", () => {
    render(
      <ProductList
        products={mockProducts}
        selected={null}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText("Coke")).toBeInTheDocument();
    expect(screen.getByText("Price: 20")).toBeInTheDocument();
    expect(screen.getByText("Stock: 5")).toBeInTheDocument();

    expect(screen.getByText("Pepsi")).toBeInTheDocument();
    expect(screen.getByText("Price: 18")).toBeInTheDocument();
  });

  test("disabled button when stock = 0", () => {
    render(
      <ProductList
        products={mockProducts}
        selected={null}
        onSelect={() => {}}
      />
    );

    const pepsiBtn = screen.getByText("Pepsi").closest("button");
    expect(pepsiBtn).toBeDisabled();
  });

  test("highlights selected product", () => {
    render(
      <ProductList
        products={mockProducts}
        selected={mockProducts[0]}
        onSelect={() => {}}
      />
    );

    const cokeBtn = screen.getByText("Coke").closest("button");
    expect(cokeBtn).toHaveClass("bg-blue-100");
  });

  test("calls onSelect when clicked", () => {
    const onSelect = jest.fn();
    render(
      <ProductList
        products={mockProducts}
        selected={null}
        onSelect={onSelect}
      />
    );

    const cokeBtn = screen.getByText("Coke");
    fireEvent.click(cokeBtn);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(mockProducts[0]);
  });

  test("renders product image when image_url exists", () => {
    render(
      <ProductList
        products={mockProducts}
        selected={null}
        onSelect={() => {}}
      />
    );

    const img = screen.getByAltText("Coke");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/coke.png");
  });
});
