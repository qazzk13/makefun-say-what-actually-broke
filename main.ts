// Entry for "Say What Actually Broke": writes a single honest upload-error line to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

process.umask(0o022);

const ENTRY =
  "Upload failed: that file is 2.3 GB, the limit is 25 MB, and renaming it final_v9.pdf did not make it any smaller.";

function check(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

check(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
