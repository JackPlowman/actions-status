import { render, screen } from "@testing-library/react";
import { ActionStatus } from "../ActionStatus";
import type { WorkflowRun } from "../../api/github";
import { describe, it, expect } from "vitest";

const mockRun: WorkflowRun = {
  id: 123,
  workflow_id: 456,
  name: "Build and Test",
  status: "completed",
  conclusion: "success",
  html_url: "https://github.com/owner/repo/actions/runs/123",
  repository: {
    name: "repo",
    full_name: "owner/repo",
    html_url: "https://github.com/owner/repo",
  },
  head_branch: "main",
  created_at: "2023-10-27T10:00:00Z",
};

describe("ActionStatus", () => {
  it("renders workflow name and branch", () => {
    render(<ActionStatus run={mockRun} />);
    expect(screen.getByText("Build and Test")).toBeInTheDocument();
    expect(screen.getByText("main")).toBeInTheDocument();
  });

  it("renders success status correctly", () => {
    render(<ActionStatus run={mockRun} />);
    // Check for green indicator class or accessible label if added.
    // In our component, we use a div with bg-green-500.
    // Ideally we should have role="status" or similar.
    // For now let's query by title attribute.
    const statusIndicator = screen.getByTitle("completed - success");
    expect(statusIndicator).toBeInTheDocument();
    expect(statusIndicator).toHaveClass("bg-green-500");
  });

  it("renders failure status correctly", () => {
    const failureRun = { ...mockRun, conclusion: "failure" };
    render(<ActionStatus run={failureRun} />);
    const statusIndicator = screen.getByTitle("completed - failure");
    expect(statusIndicator).toHaveClass("bg-red-500");
  });
});
