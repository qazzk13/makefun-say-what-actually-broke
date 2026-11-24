// Say What Actually Broke — make.fun entry (program/v1).
// Writes one line of error copy, at most 200 characters, to /output/entry.txt.
// No network, no model call, no randomness: the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";

// New files must be world-readable in the grading sandbox (uid 65534),
// so set the umask up front instead of chmod-ing anything afterwards.
process.umask(0o022);

const LINE =
  "Upload failed: that file is 2.3 GB, the limit is 25 MB, and renaming it final_v9.pdf did not make it any smaller.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
