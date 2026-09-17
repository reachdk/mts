import assert from "node:assert/strict";
import {
  chatTypeLabel,
  displayIst,
  hottestFirst,
  snapshotWhen,
  teamsMetaLine,
  unsureFromTeams,
} from "./format.ts";

assert.equal(chatTypeLabel("oneOnOne"), "1:1");
assert.equal(chatTypeLabel("group"), "group");
assert.equal(chatTypeLabel("meeting"), "meeting");

assert.equal(displayIst("2026-08-30 10:18 IST"), "2026-08-30 10:18 IST");
assert.equal(
  displayIst("2026-08-29 23:01 IST (invite 2026-08-26 17:07 IST)"),
  "2026-08-29 23:01 IST (invite 2026-08-26 17:07 IST)",
);
assert.doesNotThrow(() => displayIst("not-a-date"));
assert.equal(displayIst("not-a-date"), "not-a-date");
assert.match(displayIst("2026-08-30T05:10:00Z"), /30 Aug/);
assert.equal(displayIst("2026-08-30 10:18"), "2026-08-30 10:18");
assert.match(snapshotWhen("2026-08-30T05:10:00Z"), /IST/);
assert.equal(snapshotWhen("2026-08-30 10:40 IST"), "2026-08-30 10:40 IST");

const sorted = hottestFirst([
  { heat: "medium", rank: 2, title: "b" },
  { heat: "hot", rank: 1, title: "a" },
]);
assert.deepEqual(
  sorted.map((r) => r.title),
  ["a", "b"],
);
assert.deepEqual(hottestFirst([]), []);

assert.deepEqual(
  unsureFromTeams({ unsure: [{ who: "Ada", why_unsure: "ambiguous ask" }] }),
  [{ who: "Ada", why_unsure: "ambiguous ask" }],
);
assert.deepEqual(unsureFromTeams({}), []);
assert.deepEqual(unsureFromTeams({ unsure: [] }), []);
assert.deepEqual(
  unsureFromTeams({
    unsure: [],
    ignore: [{ title: "Noise", why: "not for him" }],
  }),
  [],
);
assert.deepEqual(
  unsureFromTeams({ ignore: [{ title: "Noise", why: "not for him" }] }),
  [],
);

assert.equal(
  teamsMetaLine({
    snapshot: "17 Sep, 9:08 am IST",
    needReply: 13,
    unsure: 2,
    skipped: 346,
  }),
  "snapshot 17 Sep, 9:08 am IST · 13 need reply · 2 unsure · 346 HIN/HINU skipped",
);
assert.equal(
  teamsMetaLine({
    snapshot: "17 Sep, 9:08 am IST",
    needReply: 13,
    unsure: 0,
    skipped: 346,
    ignoredCount: 70,
  }),
  "snapshot 17 Sep, 9:08 am IST · 13 need reply · 0 unsure · 346 HIN/HINU skipped · 70 ignored",
);

console.log("format.check ok");
