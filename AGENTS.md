# ER11 Agent Instructions

## Task completion workflow

After every task that changes project files is complete:

1. Run the relevant validation for the change and confirm it passes.
2. Stage only the files that belong to the completed task. Never include unrelated or pre-existing work from the dirty worktree.
3. Create the commit through Commitizen with `cz commit`. Use a scoped Conventional Commit message that describes the completed task.
4. Deploy that committed revision to Vercel production with `vercel --prod`.
5. Confirm the production deployment is ready and report the commit SHA and production URL.

Do not commit or deploy read-only work, an incomplete task, or a task blocked on required user input. If Commitizen, Git, Vercel authentication, validation, or deployment fails, report the blocker instead of claiming completion.
