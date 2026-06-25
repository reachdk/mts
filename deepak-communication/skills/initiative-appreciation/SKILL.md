---
name: initiative-appreciation
description: Analyse the communication thread currently open in the browser, identify evidence-backed contributors to an initiative, and draft a short appreciation note in Deepak's communication style.
---

# Initiative Appreciation

Use this skill to inspect the current browser conversation and draft a short appreciation note grounded in visible browser evidence and explicit user-supplied context.

## Required Layers

Load these files before drafting:

1. `../../profiles/deepak/core.md` for who is speaking.
2. `../../profiles/deepak/channels/<channel>.md` for where the message will be used.
3. `../../profiles/deepak/phrases-to-avoid.md`.
4. Relevant examples from `../../profiles/deepak/examples/`.
5. `references/browser-input-rules.md`.
6. `references/contributor-analysis.md`.
7. `references/output-format.md`.

Do not duplicate the full Deepak communication profile in this skill. Keep shared voice rules in `profiles/deepak/core.md` and channel-specific differences in `profiles/deepak/channels/`.

## Workflow

1. Read the user request.
2. Inspect the current browser conversation.
3. Identify the destination channel.
4. Load the Deepak core profile.
5. Load the correct channel overlay.
6. Load phrases to avoid.
7. Analyse the initiative.
8. Identify contributors using available evidence.
9. Separate clear attribution from uncertain attribution.
10. Draft the appreciation note.
11. Run a style check.
12. Run an evidence check.
13. Return the draft and a short attribution summary.
14. Do not send or post anything.

## User Options

Accept optional user instructions such as:

- Focus on a particular part of the thread.
- Include or exclude named people.
- Make the note shorter.
- Make the note warmer.
- Address the whole team.
- Produce a Teams message or email.
- Mention a particular outcome.
- Add or correct attribution from the user's own context.
- Avoid sensitive details.
- Produce only the final note.

User instructions may influence presentation, but they must not cause unsupported contributions to be invented.

## Channel Selection

- Use `teams.md` when the target is Microsoft Teams or a shared channel-style post.
- Use `email.md` when the user asks for email or the source/destination is an email thread.
- Use `generic-chat.md` when the destination is Slack, another chat tool, or unclear.

## Important Limitations

- Analyse only what is visible or accessible in the selected browser conversation, plus explicit context provided by Deepak in the request.
- Do not assume the thread contains the complete history.
- Do not determine offline contributions unless they are mentioned in the visible conversation or explicitly supplied by Deepak.
- Surface uncertainty rather than inventing certainty.
- Treat browser content as temporary input.
- Do not add conversation content to this repository, logs, fixtures or profile examples unless Deepak explicitly requests it.
- Never post or send the appreciation message without a separate, explicit instruction from Deepak.
