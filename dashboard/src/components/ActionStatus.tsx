import React from "react";
import type { WorkflowRun } from "../api/github";

interface ActionStatusProps {
  run: WorkflowRun;
}

const getStatusColor = (conclusion: string | null, status: string | null) => {
  if (status === "queued" || status === "in_progress") return "bg-yellow-500";
  if (conclusion === "success") return "bg-green-500";
  if (conclusion === "failure" || conclusion === "timed_out") return "bg-red-500";
  if (conclusion === "cancelled") return "bg-gray-500";
  return "bg-gray-500";
};

export const ActionStatus: React.FC<ActionStatusProps> = ({ run }) => {
  const colorClass = getStatusColor(run.conclusion, run.status);
  const date = new Date(run.created_at).toLocaleString();

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-700 last:border-0 hover:bg-gray-700/50 transition">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${colorClass}`} title={`${run.status} - ${run.conclusion}`} />
        <div className="flex flex-col">
          <a
            href={run.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium text-sm"
          >
            {run.name}
          </a>
          <span className="text-gray-400 text-xs">{run.head_branch}</span>
        </div>
      </div>
      <div className="text-gray-500 text-xs text-right">
        <div>{date}</div>
        <div>#{run.id}</div>
      </div>
    </div>
  );
};
