# Agent Rules

When user says `create a project update`:

1. Read `updates.md`.
2. Keep it one screen.
3. If update is for a person, read `Profiles/`.
4. Use that person style.

If user says `update.md`, use `updates.md`.

## Cursor Cloud specific instructions

This is a documentation/knowledge repository, not a software project. There is no
code, package manager, build system, lint config, or test framework. The "runtime"
is an AI agent that consumes these markdown rules, profiles, and skills to draft
communications.

- Nothing to install/build/run/serve. There are no dependencies; the startup update
  script is a no-op.
- "Running the app" = following the rules here. For a project update, follow the
  `create a project update` rule above (`updates.md` format + `Profiles/` style).
- The only shipped test-style artifact is the `initiative-appreciation` skill fixture:
  `deepak-communication/skills/initiative-appreciation/tests/{sample-thread,expected-analysis}.md`.
  Exercise the skill per `deepak-communication/skills/initiative-appreciation/SKILL.md`
  and compare output to `expected-analysis.md`.
- `deepak-communication/AGENTS.md` adds guardrails for the communication skills
  (evidence-backed attribution, never auto-send/post). Follow it when using them.
- Known stale references (do not "fix" without being asked): root `memory.md` mentions
  `Projects/`, `Trackers/` and lowercase paths that are not present in this repo.
