# mts

Monitoring the situation.

## What's here

- `context/` — personal context pack for agents. Edit by hand. Durable profile changes need approval via `context/memory-inbox.md`.
- `skills/` — reusable skills, including `context-updater`.
- `apps/inbox-dashboard` — local Inbox | Teams dashboard. Default tab is Inbox.

- `apps/inbox-dashboard/src/inbox.json` — inbox snapshot. Single source of truth; producers write here.
- `apps/inbox-dashboard/src/teams.json` — Teams snapshot. Single source of truth; producers write here.


Keep the repo private, or strip snapshot files before sharing.

## Dashboard

```bash
cd apps/inbox-dashboard
npm install
npm run dev
```

Opens at http://localhost:5173. Two tabs: Inbox and Teams. The app only renders those static JSON snapshots — nothing is sent, and it does not call mail or Teams APIs.

**Inbox** — mail that needs you, and mail that might. Open links go to Outlook on the web. Drafts stay in the table.

**Teams** — chats that need a reply (hottest first), plus an ignore list. Header shows snapshot time (IST), needs-reply count, ignore count, and skipped HIN/HINU count. Open uses `webUrl` when present.

Live pulls belong in `data/inbox.live.json` and `data/teams.live.json` (gitignored), not in git.
