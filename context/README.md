# Personal Context Pack

This folder is a small, human-editable context pack for agents acting on Deepak's behalf.

## Principle

Do not create a digital twin.

Create a small, readable context pack:

- easy for humans to edit
- easy for agents to retrieve
- no vector DB initially
- no duplicate agent-specific memory
- permanent memory requires human approval

## Core Rules

- Read only the files needed for the task.
- Prefer project-specific context over global context.
- Never invent missing owner, ETA, impact, cost, or priority.
- Use `manual fill` when facts are missing.
- Write proposed durable memories to `memory-inbox.md`.
- Do not silently rewrite core profile or preferences.

## Files

- `me.md`: Stable personal context.
- `people.md`: Key people and how to handle them.
- `priorities.md`: Current priorities only.
- `projects.md`: Active programs and projects.
- `open-loops.md`: Waiting items, owed follow-ups, and watch items.
- `scan-state.md`: Last manual scan source, scope, and timestamp markers.
- `evidence-log.md`: Source-backed notes captured during manual communication scans.
- `activity-log.md`: Chronological run notes for context maintenance.
- `style.md`: Writing and response style.
- `memory-inbox.md`: Proposed durable memories awaiting human approval.

## Agent Read Rules

Email triage agent should read:

- `me.md`
- `people.md`
- `priorities.md`
- `style.md`

Email follow-up agent should read:

- `open-loops.md`
- `people.md`
- `projects.md`
- `style.md`

Teams monitor should read:

- `people.md`
- `priorities.md`
- `projects.md`
- `open-loops.md`

Teams response agent should read:

- `style.md`
- `people.md`
- `open-loops.md`
- `projects.md` when needed

Program tracker agent should read:

- `projects.md`
- `open-loops.md`
- `people.md`
- `priorities.md`

## Permissions Model

Agents may directly append to:

- `open-loops.md`
- `scan-state.md`
- `evidence-log.md`
- `activity-log.md`
- `memory-inbox.md`

Agents may suggest edits to:

- `me.md`
- `people.md`
- `priorities.md`
- `projects.md`
- `style.md`

Agents should not directly change durable profile files without approval.
