import React, { useState } from "react";
import { TokenInput } from "./TokenInput";
import { useUserRepos } from "../hooks/useGithubData";
import { RepoCard } from "./RepoCard";

export const Dashboard: React.FC = () => {
  const [token, setToken] = useState("");

  const { data: repos, isLoading, error } = useUserRepos(token);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">GitHub Actions Dashboard</h1>
        <p className="text-gray-400">View statuses of your workflows on default branches</p>
      </header>

      <TokenInput onTokenSubmit={setToken} />

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="bg-gray-800 h-32 rounded-xl animate-pulse"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 bg-red-900/10 p-4 rounded-lg border border-red-800">
          Error loading repositories: {(error as Error).message}
        </div>
      )}

      {/* Grid of Repos */}
      {repos && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
