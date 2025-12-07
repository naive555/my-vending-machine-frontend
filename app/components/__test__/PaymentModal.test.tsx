import { fireEvent, render, screen } from "@testing-library/react";

import PaymentModal from "../..//components/PaymentModal";
import { VALID_DENOMS } from "../../util/constant";

describe("<PaymentModal />", () => {
  const mockProduct = {
    id: 1,
    name: "Coke",
    price: 20,
    stock: 10,
    image_url: undefined,
  };

  const setup = (
    props?: Partial<React.ComponentProps<typeof PaymentModal>>
  ) => {
    const defaultProps = {
      selected: mockProduct,
      payment: {},
      setPayment: jest.fn(),
      loading: false,
      message: "",
      change: null,
      onPurchase: jest.fn(),
    };

    return render(<PaymentModal {...defaultProps} {...props} />);
  };

  test("renders product name in header", () => {
    setup();
    expect(screen.getByText(/buy: coke/i)).toBeInTheDocument();
  });

  test("renders all denomination inputs", () => {
    setup();

    VALID_DENOMS.forEach((d) => {
      const label = screen.getByLabelText(`${d} x`);
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute("id", `denom-${d}`);
    });
  });

  test("calls setPayment when input changes", () => {
    const mockSetPayment = jest.fn();
    setup({ setPayment: mockSetPayment });

    const denom = VALID_DENOMS[0];
    const input = screen.getByLabelText(`${denom} x`);

    fireEvent.change(input, { target: { value: "5" } });

    expect(mockSetPayment).toHaveBeenCalledWith(
      expect.objectContaining({ [denom]: 5 })
    );
  });

  test("calls onPurchase when purchase button clicked", () => {
    const mockOnPurchase = jest.fn();
    setup({ onPurchase: mockOnPurchase });

    fireEvent.click(screen.getByRole("button", { name: /purchase/i }));

    expect(mockOnPurchase).toHaveBeenCalled();
  });

  test("disables purchase button when loading", () => {
    setup({ loading: true });

    const btn = screen.getByRole("button", { name: /processing.../i });
    expect(btn).toBeDisabled();
  });

  test("shows message when provided", () => {
    setup({ message: "Payment failed" });

    expect(screen.getByText(/payment failed/i)).toBeInTheDocument();
  });

  test("renders change list when change is provided", () => {
    const change = [
      { denomination: 10, count: 1 },
      { denomination: 1, count: 3 },
    ];

    setup({ change });

    expect(screen.getByText("Change returned:")).toBeInTheDocument();
    expect(screen.getByText("10 x 1")).toBeInTheDocument();
    expect(screen.getByText("1 x 3")).toBeInTheDocument();
  });
});
