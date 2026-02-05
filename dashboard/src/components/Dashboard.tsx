import React, { useState } from "react";

import { useUserRepos } from "../hooks/useGithubData";
import { RepoCard } from "./RepoCard";
import { TokenInput } from "./TokenInput";

export const Dashboard: React.FC = () => {
  const [token, setToken] = useState("");

  const { data: repos, isLoading, error } = useUserRepos(token);

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          GitHub Actions Dashboard
        </h1>
        <p className="text-gray-400">
          View statuses of your workflows on default branches
        </p>
      </header>

      <TokenInput onTokenSubmit={setToken} />

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-xl bg-gray-800"
            ></div>
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-800 bg-red-900/10 p-4 text-red-500">
          Error loading repositories: {(error as Error).message}
        </div>
      )}

      {/* Grid of Repos */}
      {repos && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo: any) => (
            <RepoCard
              key={repo.id}
              token={token}
              owner={repo.owner.login}
              repo={repo.name}
              defaultBranch={repo.default_branch}
            />
          ))}
        </div>
      )}

      {repos && repos.length === 0 && (
        <p className="text-gray-400">No repositories found.</p>
      )}
    </div>
  );
};
