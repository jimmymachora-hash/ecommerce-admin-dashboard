import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import Products from "./Products";

const mockProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 4500,
    stock: 25,
    image: "headphones.jpg",
  },
  {
    id: "2",
    name: "Classic Sneakers",
    category: "Fashion",
    price: 3500,
    stock: 15,
    image: "sneakers.jpg",
  },
];

describe("Products page", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("displays products fetched from the API", async () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(await screen.findByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Classic Sneakers")).toBeInTheDocument();
  });

  test("filters products when searching", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    await screen.findByText("Wireless Headphones");

    await user.type(
      screen.getByPlaceholderText("Search products..."),
      "Headphones"
    );

    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Classic Sneakers")).not.toBeInTheDocument();
    });
  });
});
