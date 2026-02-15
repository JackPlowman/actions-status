import { describe, expect, it, vi } from "vitest";

import * as useGithubData from "../../hooks/useGithubData";
import { RepoCard } from "../RepoCard";
import { render, screen } from "@testing-library/react";

vi.mock("../../hooks/useGithubData");

const mockWorkflows = [
  {
    id: 1,
    workflow_id: 101,
    name: "CI",
    status: "completed",
    conclusion: "success",
    html_url: "http://example.com",
    created_at: "2023-01-01",
    head_branch: "main",
  },
];

describe("RepoCard", () => {
  it("renders loading state", () => {
    vi.spyOn(useGithubData, "useRepoWorkflows").mockReturnValue({
      isLoading: true,
      data: undefined,
      error: null,
    } as unknown as ReturnType<typeof useGithubData.useRepoWorkflows>);

    const { container } = render(
      <RepoCard
        token="test-token"
        owner="owner"
        repo="repo"
        defaultBranch="main"
        htmlUrl="http://github.com/owner/repo"
      />,
    );
    // Check for skeleton loader structure (e.g. opacity 0.5)
    expect(container.firstChild).toHaveStyle({ opacity: "0.5" });
  });

  it("renders nothing on error", () => {
    vi.spyOn(useGithubData, "useRepoWorkflows").mockReturnValue({
      isLoading: false,
      data: undefined,
      error: new Error("Failed"),
    } as unknown as ReturnType<typeof useGithubData.useRepoWorkflows>);

    const { container } = render(
      <RepoCard
        token="test-token"
        owner="owner"
        repo="repo"
        defaultBranch="main"
        htmlUrl="http://github.com/owner/repo"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing if no workflows", () => {
    vi.spyOn(useGithubData, "useRepoWorkflows").mockReturnValue({
      isLoading: false,
      data: [],
      error: null,
    } as unknown as ReturnType<typeof useGithubData.useRepoWorkflows>);

    const { container } = render(
      <RepoCard
        token="test-token"
        owner="owner"
        repo="repo"
        defaultBranch="main"
        htmlUrl="http://github.com/owner/repo"
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders repo name and status when data is present", () => {
    vi.spyOn(useGithubData, "useRepoWorkflows").mockReturnValue({
      isLoading: false,
      data: mockWorkflows,
      error: null,
    } as unknown as ReturnType<typeof useGithubData.useRepoWorkflows>);

    render(
      <RepoCard
        token="test-token"
        owner="owner"
        repo="repo"
        defaultBranch="main"
        htmlUrl="http://github.com/owner/repo"
      />,
    );
    expect(screen.getByText("repo")).toBeInTheDocument();
    // success status usually renders a green badge/dot
    // In our component logic, success -> var(--success)
  });

  it("calls onStatusUpdate with correct status", () => {
    const onStatusUpdate = vi.fn();
    vi.spyOn(useGithubData, "useRepoWorkflows").mockReturnValue({
      isLoading: false,
      data: mockWorkflows,
      error: null,
    } as unknown as ReturnType<typeof useGithubData.useRepoWorkflows>);

    render(
      <RepoCard
        token="test-token"
        owner="owner"
        repo="repo"
        defaultBranch="main"
        htmlUrl="http://github.com/owner/repo"
        onStatusUpdate={onStatusUpdate}
      />,
    );

    expect(onStatusUpdate).toHaveBeenCalledWith("success");
  });
});
