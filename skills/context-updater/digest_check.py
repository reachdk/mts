#!/usr/bin/env python3
"""Self-check: a Teams digest file parses into the sections the context-updater expects.
No framework. Run: python3 skills/context-updater/digest_check.py
"""
import re, sys, pathlib

SAMPLE = """# Teams Digest 2026-08-15 14:00 IST

## Chats

### Sagar Babar (id: 19:abc, type: oneOnOne)
- 2026-08-15 14:03 IST | Sagar Babar: HDFC UAT EOD still red, need ETA
- 2026-08-15 14:10 IST | Sagar Babar: thanks

## Channels

### HDFC Prod / Deployments (team: t1, channel: c1)
- 2026-08-15 14:05 IST | Muskan (root): sanity green
  - 2026-08-15 14:06 IST | Deepak (reply): acknowledged

## Mentions
- 2026-08-15 14:02 IST | Tanya Tayal @you in [group chat]: check DM
"""

HEADER = re.compile(r"^# Teams Digest\s+(.+)$")
SECTION = re.compile(r"^## (Chats|Channels|Mentions)\s*$")
MSG = re.compile(r"^\s*-\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}\s+\S+\s\|\s+.+:\s+.+$")
REPLY = re.compile(r"^\s+-\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}\s+\S+\s\|\s+.+\(reply\):\s+.+$")

def parse(text):
    lines = text.splitlines()
    assert HEADER.match(lines[0]), "missing digest header"
    sections = []
    msgs = 0
    for ln in lines:
        if SECTION.match(ln):
            sections.append(ln.strip("# ").strip())
        if MSG.match(ln) or REPLY.match(ln):
            msgs += 1
    assert set(sections) == {"Chats", "Channels", "Mentions"}, f"sections: {sections}"
    assert msgs >= 4, f"expected messages, got {msgs}"
    return sections, msgs

if __name__ == "__main__":
    parse(SAMPLE)
    # also parse any real digest files handed in as argv
    for p in sys.argv[1:]:
        parse(pathlib.Path(p).read_text())
    print("digest_check: ok")
