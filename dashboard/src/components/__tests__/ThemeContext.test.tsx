import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider, ThemeToggle } from "../../ThemeContext";
import { useTheme } from "../../hooks/useTheme";
import { act, render, screen } from "@testing-library/react";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Mock matchMedia
const matchMediaMock = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: matchMediaMock,
});
Object.defineProperty(global, "matchMedia", {
  writable: true,
  value: matchMediaMock,
});

const TestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-val">{theme}</span>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
    </div>
  );
};

describe("ThemeContext", () => {
  // Top-level afterEach handles cleanup now

  it("provides default theme (light) if no storage or system pref", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme-val")).toHaveTextContent("light");
  });

  it("reads theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme-val")).toHaveTextContent("dark");
  });

  it("updates theme and localStorage when setTheme is called", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    const setDarkBtn = screen.getByText("Set Dark");
    act(() => {
      setDarkBtn.click();
    });
    expect(screen.getByTestId("theme-val")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

describe("ThemeToggle", () => {
  it("toggles theme on click", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByRole("button");
    // Initial state light -> moon icon?
    // Let's just check clicking it.
    act(() => {
      btn.click();
    });
    // We can't easily check the icon without more implementation detail,
    // but we can check if it calls setTheme.
    // Or check the title attribute if it updates.
    // Let's rely on integration with ThemeProvider behavior or check the updated title.

    // Assuming initial was light.
    expect(btn).toHaveAttribute("title", "Switch to dark mode");
    act(() => {
      btn.click();
    });
    // Now it should be dark
    expect(btn).toHaveAttribute("title", "Switch to light mode");
  });
});
