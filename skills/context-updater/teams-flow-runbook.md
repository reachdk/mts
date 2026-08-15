---
name: teams-flow-runbook
description: Step-by-step Power Automate cloud flow recipe to read your Teams chats/channels as you and emit one markdown digest that the context-updater agent classifies. Use when Deepak wants to wire Teams read access via Workflows instead of browser scraping or a custom Graph app.
---

# Teams Flow Runbook

This is a recipe for building Power Automate cloud flows in your own tenant. The agent cannot build these for you (no tenant access). Build them once, run manually, point the context-updater at the digest file.

Do not build a Teams Workflows incoming-webhook template. Those only post cards; they cannot read chats. Build a **cloud flow** with the Microsoft Teams connector.

## Step 1 — Prove the connector reads (10 min)

make.powerautomate.com -> Create -> Instant cloud flow -> Manually trigger a flow.

Add actions:
- Microsoft Teams -> List chats (chatType: oneOnOne)
- Microsoft Teams -> List chats (chatType: group)
- Microsoft Teams -> Get messages in a chat (paste a real conversation id from the List chats output) ($top: 20)
- Microsoft Teams -> Get messages in a channel (pick one war room team + channel)
- Microsoft Teams -> List replies of a channel message (use a message id from the previous step)

Run. Confirm plaintext bodies come back in `body/body/content` or `body/plainTextContent`.

If List chats returns empty, or Get messages returns Forbidden, or DLP blocks the connector -> go to Fallback.

## Step 2 — Build the scan flow

New instant cloud flow, manual trigger only. No schedule, no "When a new chat message is added" trigger.

1. List chats (oneOnOne) -> store `value`
2. List chats (group) -> store `value`
3. Combine, sort by `lastUpdatedDateTime` desc, take top ~20 (use a Filter array + Take/Top; or Select + Sort by)
4. Apply to each chat:
   - Get messages in a chat (chatId = current id, $top = 20)
   - Compose per-message line: `thread | when | sender | plaintext`
5. Allowlist of war rooms (hardcode team+channel ids: HDFC Prod, Mastercard bugs, Pluxee, etc.):
   - Get messages in a channel ($top = 20)
   - For each root message: List replies of a channel message
6. Compose one markdown blob (see Digest Schema below)
7. Cap: stop after ~10 candidate open-loop items (matches context-updater caps)

Plaintext extraction expression (when body is nested):
`outputs('Get_messages_in_a_chat')?['body/value']` -> each item `body/plainTextContent` or `body/content`

## Step 3 — Land the digest

Pick one:
- **OneDrive** (default): OneDrive for Business -> Create file, path `/MTS/teams-digest-YYYYMMDD-HHMM.md`. Agent reads via OneDrive connector or you paste it.
- **Email to self**: Office 365 Outlook -> Send an email (to yourself), body = the markdown. Reuses the existing Outlook scan path.

Skip HTTP out unless DLP explicitly allows it. Banks usually block it.

## Step 5 — Optional mention sidecar

Separate flow:
- Trigger: Microsoft Teams -> When I'm @mentioned
- Get message details (Message ID from trigger)
- Append the message line to the same OneDrive digest file (or send a small email)

Do NOT use "When a new chat message is added". It fires on every message in every chat (one user per flow) and throttles at 99+ unread.

## Fallback (only if Step 1 fails)

SR-135549 path: register a single-tenant Entra ID app, request delegated permissions only:
- `Chat.Read`
- `ChannelMessage.Read.All`
- `Team.ReadBasic.All`
- `Mail.Read`
- `User.Read`

Admin consent for your account. Use device-code or auth-code login (not ROPC; Conditional Access usually blocks it). On-demand poller: `GET /me/chats?$expand=lastMessagePreview&$orderby=lastMessagePreview/createdDateTime desc` then `GET /me/chats/{id}/messages?$top=50`. Do not request `Chat.Read.All` (application-only, tenant-wide).

## Digest Schema

The flow writes this file. The context-updater reads it.

```md
# Teams Digest YYYY-MM-DD HH:MM TZ

## Chats

### [chat topic or member names] (id: <chatId>, type: oneOnOne|group)
- 2026-08-15 14:03 IST | Sender Name: plaintext body
- 2026-08-15 14:10 IST | Sender Name: plaintext body

## Channels

### [team] / [channel] (team: <teamId>, channel: <channelId>)
- 2026-08-15 14:05 IST | Sender Name (root): plaintext body
  - 2026-08-15 14:06 IST | Sender Name (reply): plaintext body

## Mentions (if sidecar enabled)
- 2026-08-15 14:02 IST | Sender Name @you in [chat/channel]: plaintext body
```

Rules for the flow author:
- One line per message. Pipe-delimited.
- Skip system messages, reactions-only, edits, typing.
- Keep plaintext only; strip adaptive cards / images.
- Cap 20 messages per chat, 20 roots per channel + their replies.
- Filename timestamp = run time, not message time.

## Limits to design around

- List chats = recent chats, not full history, no unread flag. Infer unread from last message time vs scan-state marker.
- Get messages pages via @odata.nextLink; do not pull whole war rooms.
- Replies need an extra List replies call per root message.
- Teams connector throttle: ~100 API calls/min, 25 List-chats/Flow-bot ops per 300s.
- Power Platform DLP may block HTTP / custom connectors.
- The flow cannot commit to this git repo; the agent still writes `context/`.
