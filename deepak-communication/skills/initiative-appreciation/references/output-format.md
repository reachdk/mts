# Output Format

## Default Output

```markdown
## Draft

<appreciation note>

## Attribution check

- <Name>: <specific contribution and confidence>
- <Name>: <specific contribution and confidence>

## Uncertain or omitted

- <Name or issue>: <reason>
```

When the user says `only give me the message`, return only the draft.

For email output, additionally provide:

```markdown
Subject: <subject suggestion>
```

## Draft Depth

Default to a compact note. Use an expanded per-person note when:

- The initiative involved multiple days, a workshop, a major review, or high-effort preparation.
- The user asks for a warmer or more meaningful appreciation.
- Several contributors had distinct roles that deserve separate recognition.
- The audience includes leaders who should understand each person's role.

In expanded notes, keep each contributor paragraph short. The goal is personal specificity, not a long report.

## Draft Rules

The appreciation note must:

- Start with the initiative, progress or result.
- Name people only when contribution evidence is sufficiently clear.
- Say what each named person did.
- Say how the contribution affected the discussion, decision, confidence, quality, or outcome.
- Group people when the work was genuinely shared.
- Explain why the contribution mattered.
- Keep the tone natural.
- Keep praise proportional.
- Preserve warm, natural language when it fits Deepak's voice.
- Include a lightweight `cc:` line when the user wants leaders copied for visibility.
- Optionally close with what the effort enables next or what pattern it sets for future work.
- Avoid generic compliments.
- Avoid revealing confidential details that are unnecessary for appreciation.
- Avoid reproducing large parts of the original conversation.
- Avoid describing the analysis process inside the appreciation note.

## Quality Checks

### Evidence

- Is every named contribution supported by the visible conversation?
- Has the skill confused the reporter with the contributor?
- Has the skill over-credited senior participants?
- Has the skill omitted a clearly important contributor?
- Is any attribution uncertain?
- Has user-supplied context been marked separately from browser-visible evidence?

### Style

- Does this sound direct?
- Does it sound warm but restrained?
- Is the praise specific?
- Is it concise?
- If the initiative is significant, is the note sufficiently personal rather than too compressed?
- Does it avoid corporate language?
- Does it avoid sounding AI-generated?
- Does it follow the selected channel overlay?

### Privacy

- Does the note expose unnecessary customer, employee, financial, security or incident information?
- Can sensitive details be replaced with a general description without weakening the appreciation?
