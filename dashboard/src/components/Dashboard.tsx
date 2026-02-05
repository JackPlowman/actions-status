import React, { useState } from "react";

import type { Repo } from "../api/github";
import { useUserRepos } from "../hooks/useGithubData";
import { RepoCard } from "./RepoCard";
import { TokenInput } from "./TokenInput";

export const Dashboard: React.FC = () => {
  const [token, setToken] = useState("");
  const { data: repos, isLoading, error } = useUserRepos(token);

  return (
    <div>
      <div style={{ margin: "0 auto", maxWidth: 600 }}>
        <h2
          style={{
            fontWeight: 600,
            fontSize: 28,
            margin: "2rem 0 1rem 0",
            textAlign: "center",
          }}
        >
          Repository Status
        </h2>
        <div style={{ marginBottom: 24 }}>
          <TokenInput onTokenSubmit={setToken} />
        </div>

        {isLoading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: 48,
                  borderRadius: 8,
                  background: "var(--card-bg)",
                  border: `1px solid var(--border)`,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>
        )}

        {error && (
          <div
            style={{
              border: "1px solid #d1242f",
              background: "#fff0f1",
              color: "#d1242f",
              borderRadius: 8,
              padding: 16,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <p style={{ fontWeight: 500 }}>Unable to load repositories</p>
            <p style={{ fontSize: 14, opacity: 0.8 }}>
              {(error as Error).message}
            </p>
          </div>
        )}

        {repos && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {repos
              .filter((repo: Repo) => !repo.archived)
              .map((repo: Repo) => (
                <RepoCard
                  key={repo.id}
                  token={token}
                  owner={repo.owner.login}
                  repo={repo.name}
                  defaultBranch={repo.default_branch}
                  htmlUrl={repo.html_url}
                />
              ))}
          </div>
        )}

        {repos && repos.length === 0 && (
          <div
            style={{
              border: `1px solid var(--border)`,
              background: "var(--card-bg)",
              color: "var(--muted)",
              borderRadius: 8,
              padding: 32,
              textAlign: "center",
            }}
          >
            No repositories found with workflows.
          </div>
        )}
      </div>
    </div>
  );
};
