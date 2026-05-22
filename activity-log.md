# Activity Log

Date: 2026-05-22

## Project Setup

- Created project folders: `Profiles/`, `Projects/`, and `Trackers/`.
- Created `Profiles/ramki.md`.
- Created `updates.md` in the project root.
- Created `AGENTS.md` in the project root.

## Ramki Profile

- Built an initial Ramki profile from recent Outlook/Teams context.
- Later rewrote it to be much shorter after the EON update feedback.
- Current profile says Ramki prefers:
  - one-screen updates,
  - clear RAG/ETA/blocker view,
  - short milestone tables,
  - only the strongest evidence links,
  - asks only where he can decide, unblock, or sponsor.

## Update Preferences

- Captured project update preferences in `updates.md`.
- Key rule: when asked to create a project update, make it succinct, decision-oriented, and single-screen unless detail is requested.
- Avoid long research trails, large ticket dumps, and too many asks.
- If data is missing, mark it as missing/manual fill instead of inventing dates, owners, costs, or metrics.

## Agent Instructions

- Added `AGENTS.md`.
- Instruction: when asked to "create a project update", read `updates.md` first.
- Instruction: when the update is for a named person, consult `Profiles/` first.
- Added guard: if a prompt says `update.md`, treat that as `updates.md`.

## EON Project Update Work

- Used Atlassian Rovo to inspect EON Jira and Confluence.
- Updated Confluence page: `EON - CTO Visibility`.
- Page URL: https://zeta-tm.atlassian.net/wiki/spaces/EON/pages/5054726173/EON+-+CTO+Visibility
- First version was too verbose.
- User asked for a single-screen version.
- Condensed the page to:
  - one short summary,
  - three milestone rows,
  - four key risks/decisions,
  - minimal evidence links,
  - manual-fill gaps.

## Key EON Findings

- Overall EON RAG: red.
- Family Hub MVP committed date in Jira: 31-Mar-2026.
- Family Hub MVP had 33 total issues and 22 unresolved at time of review.
- Main blockers/risks included:
  - card block enforcement,
  - Support Centre vs Family App data mismatch,
  - owner login 500 error,
  - UPI PIN/access issue.
- Family Hub Phase 2 had only one backlog audit-events epic.
- Packs MVP had two groomed epics with no committed ETA.
- Spend could only be inferred as a people-meter; no real INR cost could be derived from source data.

## Important Style Lesson

For Ramki and project updates generally, default to compact. The user explicitly found a verbose update less useful. A better update fits on one screen and shows what matters now.

## Memory Setup

- Created `activity-log.md` in the project root for portable resume context.
- Created `memory.md` in the project root so context travels with the project.
- Created a central Codex memory note under `/Users/deepak/.codex/memories/extensions/ad_hoc/notes/`.
- User clarified that memory should exist both locally and centrally:
  - local project memory is portable across machines,
  - central memory helps Codex recall context on this machine.
