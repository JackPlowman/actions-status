import React, { createContext, useEffect, useMemo, useState } from "react";

import { useTheme } from "./hooks/useTheme";

// Define the Theme type
export type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "light", setTheme: () => {} });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return globalThis.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export function ThemeToggle() {
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

export { ThemeContext };
