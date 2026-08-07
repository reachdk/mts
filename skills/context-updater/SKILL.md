---
name: context-updater
description: Project-local MTS workflow for manual browser-based scans of Outlook mail and Microsoft Teams chats. Use when Deepak asks to scan email, Outlook, Teams, chats, unread items, mentions, follow-ups, open loops, or update MTS context from communications while keeping durable memory changes human-approved.
---

# Context Updater

Use this skill as a manual runbook. Do not create a scheduler, service, database, vector store, background agent, or autonomous monitor.

## Core Rules

- Use the Codex browser for Outlook and Microsoft Teams.
- Keep each run bounded; do not scan all history.
- Prefer the existing `context/` files in this repo over new files.
- Never invent missing owner, ETA, priority, impact, cost, or stakeholder intent.
- Use `manual fill` when a necessary fact is absent.
- Keep quoted evidence short; prefer source-backed paraphrase.
- Stop and ask before a deeper scan if any cap is hit.

## Read First

Read only the files needed for the run, starting with:

```text
context/README.md
context/open-loops.md
context/scan-state.md
context/evidence-log.md
context/memory-inbox.md
```

Then read these only when they affect the scan:

```text
context/people.md
context/projects.md
context/priorities.md
context/style.md
context/me.md
context/activity-log.md
```

If root-level legacy files such as `AGENTS.md`, `memory.md`, `activity-log.md`, `Profiles/`, `Projects/`, or `Trackers/` exist, read them only when they are relevant and reconcile them with the `context/` files. Treat `context/` as the current project-local context pack unless the repo docs say otherwise.

## Update Permissions

Auto-update these operational files:

```text
context/open-loops.md
context/scan-state.md
context/evidence-log.md
context/activity-log.md
```

Append durable-memory proposals to:

```text
context/memory-inbox.md
```

Do not directly modify these without explicit human approval in the current conversation:

```text
context/me.md
context/people.md
context/priorities.md
context/projects.md
context/style.md
legacy memory/profile/project/style/priority files
```

## Scan Order

Use the saved state in `context/scan-state.md` to bound the run. If state is missing, scan only current unread/flagged/mentioned items and recent sent items from the last 14 days.

1. Outlook unread direct emails.
2. Outlook mentions or direct asks.
3. Outlook flagged or important emails.
4. Outlook emails from key people in `context/people.md`.
5. Outlook sent items from the last 14 days where Deepak asked for something.
6. Teams unread chats.
7. Teams mentions.
8. Teams chats from key people in `context/people.md`.
9. Teams threads linked to active projects in `context/projects.md`.

Do not deep-scroll. Do not open broad historical searches unless Deepak asks for a deeper scan.

## Extract Only

Capture an item only when it changes action or durable context:

- Someone owes Deepak.
- Deepak owes someone.
- A decision is needed.
- A risk, blocker, or escalation appears.
- A commitment or date appears.
- A stakeholder preference changes.
- A project status changes.

Ignore FYIs, thanks, acknowledgements, newsletters, copied-only noise, broadcasts with no ask, and old history with no current action.

## Caps

- Add at most 10 open-loop updates.
- Add at most 10 durable memory proposals.
- Surface at most 10 review items.

If more is found, stop and report `hit cap`.

## Write Format

For `context/evidence-log.md`, append concise source-backed notes:

```md
## YYYY-MM-DD - Context updater run

- Source: Outlook | Teams
  When seen: YYYY-MM-DD HH:MM timezone
  Thread: sender/channel and short subject
  Evidence: short paraphrase with minimal quote if needed
  Extracted item: action/context change
```

For `context/open-loops.md`, append or update the appropriate section:

```md
- YYYY-MM-DD: [person] owes Deepak [thing]. Follow up by [date or manual fill]. Related project: [project or manual fill]. Evidence: context/evidence-log.md#yyyy-mm-dd-context-updater-run
- YYYY-MM-DD: Deepak owes [person] [thing] by [date or manual fill]. Related project: [project or manual fill]. Evidence: context/evidence-log.md#yyyy-mm-dd-context-updater-run
```

For `context/memory-inbox.md`, append only proposals:

```md
### YYYY-MM-DD - Short title

Proposed memory: [durable fact or preference]
Source: [Outlook/Teams thread and date]
Why it may matter: [reason]
Suggested target file: me.md | people.md | priorities.md | projects.md | style.md
Status: pending
```

For `context/scan-state.md`, update source and timestamp boundaries:

```md
- YYYY-MM-DD HH:MM timezone: Scanned [source/scope]. Last seen: [timestamp or marker]. Notes: [none | browser issue | hit cap]
```

For `context/activity-log.md`, append one short run note:

```md
- YYYY-MM-DD: Ran context updater. Added [n] open loops, [n] evidence notes, [n] memory proposals. Stopped because: [reason].
```

## Return Format

Return exactly this structure:

```md
## Needs Your Review
- ...

## Added To Open Loops
- ...

## Proposed Memory Updates
- ...

## Ignored
- ...

## Stopped Because
- none | hit cap | browser access issue | needs clarification
```
