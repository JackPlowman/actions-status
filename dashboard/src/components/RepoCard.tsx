import React, { useMemo } from "react";

import { useRepoWorkflows } from "../hooks/useGithubData";

interface RepoCardProps {
  token: string;
  owner: string;
  repo: string;
  defaultBranch: string;
  htmlUrl: string;
  onStatusUpdate?: (status: string) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  token,
  owner,
  repo,
  defaultBranch,
  htmlUrl,
  onStatusUpdate,
}) => {
  const {
    data: workflows,
    isLoading,
    error,
  } = useRepoWorkflows(token, owner, repo, defaultBranch);

  const status = useMemo(() => {
    if (!workflows || workflows.length === 0) return "neutral";
    const latestRunsMap = new Map();
    workflows.forEach((run) => {
      if (!latestRunsMap.has(run.workflow_id)) {
        latestRunsMap.set(run.workflow_id, run);
      }
    });
    const latestRuns = Array.from(latestRunsMap.values());
    if (latestRuns.length === 0) return "neutral";
    const hasFailure = latestRuns.some(
      (run) => run.conclusion === "failure" || run.conclusion === "timed_out",
    );
    const hasInProgress = latestRuns.some(
      (run) => run.status === "in_progress" || run.status === "queued",
    );
    if (hasFailure) return "failure";
    if (hasInProgress) return "pending";
    return "success";
  }, [workflows]);

  React.useEffect(() => {
    if (!isLoading && !error && onStatusUpdate) {
      onStatusUpdate(status);
    }
  }, [status, isLoading, error, onStatusUpdate]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: `1px solid var(--border)`,
          background: "var(--card-bg)",
          borderRadius: 8,
          padding: 16,
          minHeight: 48,
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: 120,
            height: 16,
            background: "var(--neutral)",
            borderRadius: 4,
          }}
        />
        <div
          style={{
            width: 16,
            height: 16,
            background: "var(--neutral)",
            borderRadius: 8,
          }}
        />
      </div>
    );
  }
  if (error) return null;
  if (!workflows || workflows.length === 0) return null;

  const badgeColor = {
    success: "var(--success)",
    pending: "var(--pending)",
    failure: "var(--failure)",
    neutral: "var(--neutral)",
  }[status];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid var(--border)`,
        background: "var(--card-bg)",
        borderRadius: 8,
        padding: 16,
        minHeight: 48,
        boxShadow: "none",
        transition: "box-shadow 0.15s, border 0.15s",
      }}
    >
      <a
        href={htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontWeight: 500, fontSize: 18, color: "inherit" }}
      >
        {owner} / <span style={{ fontWeight: 700 }}>{repo}</span>
      </a>
      <a
        href={`${htmlUrl}/actions`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 14,
          color: "inherit",
          textDecoration: "none",
        }}
        title={`Status: ${status}`}
      >
        <span
          style={{
            display: "inline-block",
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: badgeColor,
            border: `1.5px solid ${badgeColor}`,
            marginRight: 2,
          }}
        />
        <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: 13 }}>
          Actions
        </span>
      </a>
    </div>
  );
};
