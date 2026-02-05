import React, { useEffect, useState } from "react";

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({ onTokenSubmit }) => {
  const [token, setToken] = useState(() => localStorage.getItem("github_token") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("github_token");
    if (storedToken) onTokenSubmit(storedToken);
  }, [onTokenSubmit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem("github_token", token);
      onTokenSubmit(token);
    }
  };
  const handleClear = () => {
    localStorage.removeItem("github_token");
    setToken("");
    onTokenSubmit("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label htmlFor="token" style={{ fontWeight: 500, fontSize: 15, marginBottom: 2 }}>
        GitHub Personal Access Token
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="password"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{
            flex: 1,
            border: `1px solid var(--border)`,
            borderRadius: 6,
            padding: "8px 12px",
            fontSize: 15,
            background: "var(--card-bg)",
            color: "var(--fg)",
          }}
          placeholder="ghp_..."
        />
        <button
          type="submit"
          style={{
            borderRadius: 6,
            background: "#218bff",
            color: "#fff",
            padding: "8px 16px",
            fontWeight: 500,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            borderRadius: 6,
            background: "#e53e3e",
            color: "#fff",
            padding: "8px 16px",
            fontWeight: 500,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          Clear
        </button>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
        Token requires <code>repo</code> scope to access private repositories and workflow status.
      </p>
    </form>
  );
};
