# mts

Monitoring the situation.

## What's here

- `context/` — personal context pack for agents. Edit by hand. Durable profile changes need approval via `context/memory-inbox.md`.
- `skills/` — reusable skills, including `context-updater`.
- `apps/inbox-dashboard` — inbox triage dashboard (needs action + unsure).
- `data/inbox.json` — dashboard snapshot. Keep the repo private, or strip this file before sharing.

## Inbox dashboard

```bash
cd apps/inbox-dashboard
npm install
npm run dev
```

Two tables: mail that needs you, and mail that might. Open links go to Outlook on the web. Drafts stay in the table; nothing is sent.

Live pulls belong in `data/inbox.live.json` (gitignored), not in git.
