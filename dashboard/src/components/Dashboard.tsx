import React, { useState, useMemo } from "react";

import type { Repo } from "../api/github";
import { useUserRepos } from "../hooks/useGithubData";
import { RepoCard } from "./RepoCard";
import { TokenInput } from "./TokenInput";

export const Dashboard: React.FC = () => {
  const [token, setToken] = useState("");
  const [sortBy, setSortBy] = useState<"alpha" | "status">("alpha");
  const [repoStatuses, setRepoStatuses] = useState<Record<number, string>>({});
  const { data: repos, isLoading, error } = useUserRepos(token);

  const sortedRepos = useMemo(() => {
    if (!repos) return [];

    // Step 1: Filter archived (as requested previously)
    let filtered = repos.filter((repo: Repo) => !repo.archived);

    // Step 2: Sort
    if (sortBy === "alpha") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      const statusOrder: Record<string, number> = {
        failure: 0,
        pending: 1,
        success: 2,
        neutral: 3,
      };

      filtered = [...filtered].sort((a, b) => {
        const statusA = statusOrder[repoStatuses[a.id] || "neutral"];
        const statusB = statusOrder[repoStatuses[b.id] || "neutral"];

        if (statusA !== statusB) {
          return statusA - statusB;
        }
        return a.name.localeCompare(b.name);
      });
    }

    return filtered;
  }, [repos, sortBy, repoStatuses]);

  const handleStatusUpdate = (repoId: number, status: string) => {
    if (repoStatuses[repoId] !== status) {
      setRepoStatuses((prev) => ({ ...prev, [repoId]: status }));
    }
  };

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

        {repos && repos.length > 0 && (
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
            alignItems: "center",
            gap: 12,
            fontSize: 13,
            color: "var(--muted)"
          }}>
            <span style={{ fontWeight: 500 }}>Sort by:</span>
            <div style={{
              display: "flex",
              background: "var(--header-bg)",
              padding: 2,
              borderRadius: 6,
              border: "1px solid var(--border)"
            }}>
              <button
                onClick={() => setSortBy("alpha")}
                style={{
                  padding: "4px 12px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: sortBy === "alpha" ? "var(--bg)" : "transparent",
                  color: sortBy === "alpha" ? "var(--fg)" : "var(--muted)",
                  boxShadow: sortBy === "alpha" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.15s"
                }}
              >
                Name
              </button>
              <button
                onClick={() => setSortBy("status")}
                style={{
                  padding: "4px 12px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: sortBy === "status" ? "var(--bg)" : "transparent",
                  color: sortBy === "status" ? "var(--fg)" : "var(--muted)",
                  boxShadow: sortBy === "status" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                  transition: "all 0.15s"
                }}
              >
                Status
              </button>
            </div>
          </div>
        )}

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
            {sortedRepos.map((repo: Repo) => (
              <RepoCard
                key={repo.id}
                token={token}
                owner={repo.owner.login}
                repo={repo.name}
                defaultBranch={repo.default_branch}
                htmlUrl={repo.html_url}
                onStatusUpdate={(status) => handleStatusUpdate(repo.id, status)}
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
