
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import EditProduct from "./EditProduct";

const mockProduct = {
  id: "1",
  name: "Wireless Headphones",
  category: "Electronics",
  price: 4500,
  stock: 25,
  description: "High-quality headphones",
  image: "https://placehold.co/400x300",
};

describe("EditProduct page", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockProduct,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ ...mockProduct, price: 5000 }),
        })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("loads and displays an existing product", async () => {
    render(
      <MemoryRouter initialEntries={["/products/1/edit"]}>
        <Routes>
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4500")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update Product" })).toBeInTheDocument();
  });

  test("updates a product using PATCH", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/products/1/edit"]}>
        <Routes>
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/:id" element={<h1>Updated Product Details</h1>} />
        </Routes>
      </MemoryRouter>
    );

    const priceInput = await screen.findByDisplayValue("4500");

    await user.clear(priceInput);
    await user.type(priceInput, "5000");
    await user.click(screen.getByRole("button", { name: "Update Product" }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    expect(fetch).toHaveBeenLastCalledWith(
      "http://localhost:3000/products/1",
      expect.objectContaining({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
    );

    const updateBody = JSON.parse(fetch.mock.calls[1][1].body);
    expect(updateBody.price).toBe(5000);

    expect(await screen.findByText("Updated Product Details")).toBeInTheDocument();
  });
});
