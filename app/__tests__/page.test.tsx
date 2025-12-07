/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Page from "../page";
import { getProducts } from "../api/products";
import { getProductStock } from "../api/product-stock";
import { purchaseProduct } from "../api/purchase";

// mock API
jest.mock("../api/products", () => ({
  getProducts: jest.fn(),
}));

jest.mock("../api/product-stock", () => ({
  getProductStock: jest.fn(),
}));

jest.mock("../api/purchase", () => ({
  purchaseProduct: jest.fn(),
}));

describe("<Page />", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (getProducts as jest.Mock).mockResolvedValue([
      { id: 1, name: "Coke", price: 20 },
    ]);

    (getProductStock as jest.Mock).mockResolvedValue({
      quantity: 5,
    });

    (purchaseProduct as jest.Mock).mockResolvedValue({
      message: "Success",
      change: [{ denomination: 10, count: 1 }],
    });
  });

  test("load products on mount", async () => {
    (getProducts as jest.Mock).mockResolvedValue([
      { id: 1, name: "Coke", price: 20 },
    ]);

    (getProductStock as jest.Mock).mockResolvedValue({ quantity: 5 });

    render(<Page />);

    expect(await screen.findByText("Coke")).toBeInTheDocument();
    expect(screen.getByText("Stock: 5")).toBeInTheDocument();
  });

  test("select product and show payment modal", async () => {
    render(<Page />);

    const cokeBtn = await screen.findByText("Coke");
    fireEvent.click(cokeBtn);

    const buyTitle = await screen.findByText(/Buy: Coke/);
    expect(buyTitle).toBeInTheDocument();
  });

  test("successful purchase updates UI", async () => {
    (getProducts as jest.Mock).mockResolvedValue([
      { id: 1, name: "Coke", price: 20 },
    ]);
    (getProductStock as jest.Mock).mockResolvedValue({ quantity: 5 });

    (purchaseProduct as jest.Mock).mockResolvedValue({
      message: "Success",
      change: [{ denomination: 5, count: 1 }],
    });

    render(<Page />);

    fireEvent.click(await screen.findByText("Coke"));

    const input20 = screen.getByLabelText("20 x");
    fireEvent.change(input20, { target: { value: "1" } });

    fireEvent.click(screen.getByText("Purchase"));

    expect(await screen.findByText("Success")).toBeInTheDocument();

    expect(screen.getByText(/change/i)).toBeInTheDocument();
  });

  test("error purchase shows error message", async () => {
    (getProducts as jest.Mock).mockResolvedValue([
      { id: 1, name: "Coke", price: 20 },
    ]);
    (getProductStock as jest.Mock).mockResolvedValue({ quantity: 5 });

    (purchaseProduct as jest.Mock).mockRejectedValue(
      new Error("Not enough money")
    );

    render(<Page />);

    fireEvent.click(await screen.findByText("Coke"));

    const buyBtn = screen.getByText("Purchase");
    fireEvent.click(buyBtn);

    await waitFor(() =>
      expect(screen.getByText("Not enough money")).toBeInTheDocument()
    );
  });
});
