
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi, afterEach } from "vitest";
import ProductDetails from "./ProductDetails";

const mockProduct = {
  id: "1",
  name: "Wireless Headphones",
  category: "Electronics",
  price: 4500,
  stock: 25,
  description: "High-quality wireless headphones",
  image: "https://placehold.co/400x300",
};

describe("ProductDetails page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("displays product details fetched from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProduct,
      })
    );

    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText(/4,500/)).toBeInTheDocument();
    expect(screen.getByText("High-quality wireless headphones")).toBeInTheDocument();
  });

  test("deletes a product successfully", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      })
      .mockResolvedValueOnce({ ok: true });

    vi.stubGlobal("fetch", mockFetch);
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(
      <MemoryRouter initialEntries={["/products/1"]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<h1>Products Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText("Wireless Headphones");

    await user.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    expect(mockFetch).toHaveBeenLastCalledWith(
      "http://localhost:3000/products/1",
      expect.objectContaining({ method: "DELETE" })
    );

    expect(await screen.findByText("Products Page")).toBeInTheDocument();
  });
});
