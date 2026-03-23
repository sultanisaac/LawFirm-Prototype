# GITHUB_ISSUES_GUIDE.md

This guide establishes the protocol for AI Dev Agents to maintain high-discipline project tracking. Following this guide ensures every development action is documented, traceable, and aligned with the project's milestones.

---

## 1. Core Workflow: "Issue-First Development"

Before implementing any code or making structural changes, the AI Agent MUST follow this sequence:

1.  **Search & Sync:** Check for existing open issues (`search_issues` or `list_issues`) to see if the current task is already tracked.
2.  **Create if Missing:** If no matching issue exists for the user's request, create one immediately using `issue_write (method: 'create')`.
3.  **Acknowledge:** Confirm to the user that the task is now tracked under Issue #X.

---

## 2. Issue Standard & Metadata

### Titles
Use clear, objective titles with category prefixes:
- `[FEAT]` - New features or components.
- `[BUG]` - Fixes for broken functionality or UI issues.
- `[POLISH]` - UI/UX refinements, animations, or styling tweaks.
- `[DOC]` - Documentation or plan updates.
- `[REFACTOR]` - Code organization or performance improvements.

### Body Content
- **Objective:** What is being solved?
- **Context:** Reference specific files or existing plans (e.g., `CAL.COM_INTEGRATION_PLAN.md`).
- **Checklist:** (Optional) Add a bulleted list of sub-tasks for the agent to check off via comments.

### Labels
Proactively apply labels (enhancement, bug, help wanted) based on the task type.

---

## 3. Communication & Tracking

-   **Step Updates:** For multi-step tasks, the AI Agent should add a comment (`add_issue_comment`) after significant milestones (e.g., "Step 1: Environment variables configured").
-   **Traceability:** Refer to the issue number in follow-up discussions.
-   **Closing:** Only close an issue (`issue_write (method: 'update', state: 'closed')`) once the user acknowledges the task is complete and satisfactory.

---

## 4. Milestone Integration

-   **Assignment:** Ensure the issue is assigned to the current milestone if one is defined for the target release (e.g., `MVP`, `Beta v1`).
-   **Proactive Milestones:** If the Agent identifies a recurring theme in user requests (e.g., "more security fixes"), it may suggest creating a new Milestone to group those issues.

---

## 5. Tool-Specific Instructions (for AI Agent)

When managing issues, use the following `github-mcp-server` tools:

| Action | Tool to Use |
| :--- | :--- |
| **Check Current Status** | `list_issues` or `search_issues` |
| **Start New Task** | `issue_write` (method: `create`) |
| **Update Progress** | `add_issue_comment` |
| **Fix/Complete Task** | `issue_write` (method: `update`, status: `closed`) |

---

> [!IMPORTANT]
> **Discipline is Mandatory.** The AI Agent is the "Project Manager" for its own tasks. Never skip issue creation for "small" changes.
