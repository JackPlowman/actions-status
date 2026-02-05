import React from "react";

import type { WorkflowRun } from "../api/github";

interface ActionStatusProps {
  run: WorkflowRun;
}

const getStatusColor = (conclusion: string | null, status: string | null) => {
  if (status === "queued" || status === "in_progress") return "bg-yellow-500";
  if (conclusion === "success") return "bg-green-500";
  if (conclusion === "failure" || conclusion === "timed_out")
    return "bg-red-500";
  if (conclusion === "cancelled") return "bg-gray-500";
  return "bg-gray-500";
};

export const ActionStatus: React.FC<ActionStatusProps> = ({ run }) => {
  const colorClass = getStatusColor(run.conclusion, run.status);
  const date = new Date(run.created_at).toLocaleString();

  return (
    <div className="flex items-center justify-between border-b border-gray-700 p-2 transition last:border-0 hover:bg-gray-700/50">
      <div className="flex items-center gap-3">
        <div
          className={`h-3 w-3 rounded-full ${colorClass}`}
          title={`${run.status} - ${run.conclusion}`}
        />
        <div className="flex flex-col">
          <a
            href={run.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            {run.name}
          </a>
          <span className="text-xs text-gray-400">{run.head_branch}</span>
        </div>
      </div>
      <div className="text-right text-xs text-gray-500">
        <div>{date}</div>
        <div>#{run.id}</div>
      </div>
    </div>
  );
};
