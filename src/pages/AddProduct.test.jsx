
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, test, vi, afterEach } from "vitest";
import AddProduct from "./AddProduct";

describe("AddProduct page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("displays all product form fields", () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByLabelText("Product Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Price (KSh)")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock Quantity")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
  });

  test("submits a new product successfully", async () => {
    const user = userEvent.setup();
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "5" }),
    });

    vi.stubGlobal("fetch", mockFetch);

    render(
      <MemoryRouter initialEntries={["/products/add"]}>
        <Routes>
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products" element={<h1>Products Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText("Product Name"), "Bluetooth Speaker");
    await user.type(screen.getByLabelText("Category"), "Electronics");
    await user.type(screen.getByLabelText("Price (KSh)"), "2500");
    await user.type(screen.getByLabelText("Stock Quantity"), "12");
    await user.type(screen.getByLabelText("Description"), "Portable speaker");
    await user.type(
      screen.getByLabelText("Image URL"),
      "https://placehold.co/400x300"
    );

    await user.click(screen.getByRole("button", { name: "Save Product" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:3000/products",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      })
    );

    const submittedProduct = JSON.parse(mockFetch.mock.calls[0][1].body);

    expect(submittedProduct.name).toBe("Bluetooth Speaker");
    expect(submittedProduct.price).toBe(2500);
    expect(submittedProduct.stock).toBe(12);

    expect(await screen.findByText("Products Page")).toBeInTheDocument();
  });
});
