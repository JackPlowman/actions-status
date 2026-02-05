import React from "react";

import "./App.css";
import { ThemeProvider, ThemeToggle } from "./ThemeContext";
import { Dashboard } from "./components/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div
          style={{
            minHeight: "100vh",
            background: "var(--bg)",
            color: "var(--fg)",
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.5rem 0.5rem 1rem 0.5rem",
              borderBottom: "1px solid #e5e7eb",
              background: "var(--header-bg)",
              position: "sticky",
              top: 0,
              zIndex: 10,
              borderRadius: 8,
              margin: "0 auto 1.5rem auto",
              maxWidth: 600,
              boxShadow: "0 1px 4px 0 rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: 0.5 }}>
              Actions Status
            </span>
            <ThemeToggle />
          </header>
          <main
            style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 0.5rem" }}
          >
            <Dashboard />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
