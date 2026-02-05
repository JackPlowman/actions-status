import React, { useEffect, useState } from "react";

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({ onTokenSubmit }) => {
  const [token, setToken] = useState(() => localStorage.getItem("github_token") || "");

  useEffect(() => {
    // Sync initial token to parent if it exists
    const storedToken = localStorage.getItem("github_token");
    if (storedToken) {
      onTokenSubmit(storedToken);
    }
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
    <div className="mb-6 rounded-lg bg-gray-800 p-4 shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="token" className="font-medium text-white">
          GitHub Personal Access Token
        </label>
        <div className="flex gap-2">
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 rounded border border-gray-600 bg-gray-700 p-2 text-white focus:border-blue-500 focus:outline-none"
            placeholder="ghp_..."
          />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Clear
          </button>
        </div>
        <p className="text-sm text-gray-400">
          Token requires <code>repo</code> scope to access private repositories
          and workflow status.
        </p>
      </form>
    </div>
  );
};
