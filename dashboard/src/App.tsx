
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState, useEffect, createContext, useContext } from "react";

const queryClient = new QueryClient();

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({ theme: "light", setTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        background: "none",
        border: "none",
        fontSize: 20,
        cursor: "pointer",
        marginLeft: 8,
      }}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
          <header style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.5rem 0.5rem 1rem 0.5rem",
            borderBottom: "1px solid #e5e7eb",
            background: "var(--header-bg)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: 0.5 }}>Actions Status</span>
            <ThemeToggle />
          </header>
          <main style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 0.5rem" }}>
            <Dashboard />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
