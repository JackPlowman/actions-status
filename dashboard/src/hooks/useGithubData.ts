import { useQuery } from "@tanstack/react-query";
import { fetchWorkflowRuns, fetchUserRepos } from "../api/github";

export const useUserRepos = (token: string) => {
  return useQuery({
    queryKey: ["repos", token],
    queryFn: () => fetchUserRepos(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRepoWorkflows = (
  token: string,
  owner: string,
  repo: string,
  branch: string = "main",
) => {
  // Try fetching main, if it fails or returns empty, maybe try master?
  // For now, let's just stick to the requested main/master (default) branch logic.
  // The API allows filtering by branch.

  return useQuery({
    queryKey: ["workflows", token, owner, repo, branch],
    queryFn: () => fetchWorkflowRuns(token, owner, repo, branch),
    enabled: !!token && !!owner && !!repo,
    refetchInterval: 60000, // Refresh every minute
  });
};
