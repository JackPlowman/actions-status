import React, { useState, useEffect } from "react";

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({ onTokenSubmit }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("github_token");
    if (storedToken) {
      setToken(storedToken);
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
    <div className="p-4 bg-gray-800 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="token" className="text-white font-medium">
          GitHub Personal Access Token
        </label>
        <div className="flex gap-2">
          <input
            type="password"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="ghp_..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Clear
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          Token requires <code>repo</code> scope to access private repositories
          and workflow status.
        </p>
      </form>
    </div>
  );
};
