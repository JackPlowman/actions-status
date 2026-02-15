import { Octokit } from "@octokit/rest";

export const createOctokit = (token: string) => {
  return new Octokit({
    auth: token,
  });
};

export interface WorkflowRun {
  id: number;
  workflow_id: number;
  name: string;
  status: string | null;
  conclusion: string | null;
  html_url: string;
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  };
  head_branch: string | null;
  created_at: string;
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  default_branch: string;
  html_url: string;
  archived: boolean;
}

export const fetchWorkflowRuns = async (
  token: string,
  owner: string,
  repo: string,
  branch: string = "main",
) => {
  const octokit = createOctokit(token);
  const { data } = await octokit.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    branch,
    per_page: 5, // Just get last 5
  });
  return data.workflow_runs;
};

export const fetchUserRepos = async (token: string) => {
  const octokit = createOctokit(token);
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 100,
    type: "owner", // Only repos owned by the user
  });
  return data;
};
