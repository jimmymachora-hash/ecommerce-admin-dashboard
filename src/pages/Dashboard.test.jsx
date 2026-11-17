
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi, afterEach } from "vitest";
import Dashboard from "./Dashboard";

describe("Dashboard page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("displays dynamic product statistics", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { id: "1", name: "Headphones", stock: 25 },
          { id: "2", name: "Sneakers", stock: 5 },
          { id: "3", name: "Smart Watch", stock: 15 },
        ],
      })
    );

    render(<Dashboard />);

    expect(await screen.findByText("3")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Total Products")).toBeInTheDocument();
    expect(screen.getByText("Low Stock")).toBeInTheDocument();
  });
});
