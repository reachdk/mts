import assert from "node:assert/strict";
import { chatTypeLabel, displayIst, hottestFirst } from "./format.ts";

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

const sorted = hottestFirst([
  { heat: "medium", rank: 2, title: "b" },
  { heat: "hot", rank: 1, title: "a" },
]);
assert.deepEqual(
  sorted.map((r) => r.title),
  ["a", "b"],
);
assert.deepEqual(hottestFirst([]), []);

console.log("format.check ok");
