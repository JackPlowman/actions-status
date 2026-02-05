import { render, screen, fireEvent } from "@testing-library/react";
import { TokenInput } from "../TokenInput";
import { describe, it, expect, vi } from "vitest";

describe("TokenInput", () => {
  it("renders input and buttons", () => {
    render(<TokenInput onTokenSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/personal access token/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("calls onTokenSubmit when submitted", () => {
    const handleSubmit = vi.fn();
    render(<TokenInput onTokenSubmit={handleSubmit} />);

    const input = screen.getByLabelText(/personal access token/i);
    fireEvent.change(input, { target: { value: "test-token" } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(handleSubmit).toHaveBeenCalledWith("test-token");
  });
});
