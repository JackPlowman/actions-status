import React from "react";

import { useRepoWorkflows } from "../hooks/useGithubData";
import { ActionStatus } from "./ActionStatus";

interface RepoCardProps {
  token: string;
  owner: string;
  repo: string;
  defaultBranch: string;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  token,
  owner,
  repo,
  defaultBranch,
}) => {
  const {
    data: workflows,
    isLoading,
    error,
  } = useRepoWorkflows(token, owner, repo, defaultBranch);

  if (isLoading)
    return <div className="h-32 animate-pulse rounded bg-gray-800 p-4"></div>;
  if (error)
    return (
      <div className="rounded border border-red-800 bg-red-900/20 p-4 text-red-300">
        Error loading {repo}
      </div>
    );
  if (!workflows || workflows.length === 0) return null; // Hide repos with no recent workflows on default branch? Or show generated text.

  // Filter only latest run for each distinct workflow definition?
  // The API returns list of runs.
  // The user wanted "shows all the statuses of my github actions".
  // Usually this means the latest status of each unique workflow file.

  // Let's group by workflow_id
  const latestRunsMap = new Map();
  workflows.forEach((run) => {
    // We only care about the latest run for a specific workflow_id
    // Since the API returns sorted by created_at desc, the first one encountered is the latest.
    // However, fetchWorkflowRuns returns a mixed list.
    if (!latestRunsMap.has(run.workflow_id)) {
      latestRunsMap.set(run.workflow_id, run);
    }
  });

  const uniqueWorkflows = Array.from(latestRunsMap.values());

  if (uniqueWorkflows.length === 0) return null;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900/50 p-4">
        <h3 className="truncate text-lg font-bold text-white" title={repo}>
          {repo}
        </h3>
        <span className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-500">
          {defaultBranch}
        </span>
      </div>
      <div className="flex flex-col">
        {uniqueWorkflows.map((run) => (
          <ActionStatus key={run.id} run={run} />
        ))}
      </div>
    </div>
  );
};
