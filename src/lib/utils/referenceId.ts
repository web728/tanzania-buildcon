const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I

function randomSegment(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return out;
}

/** Generates a human-readable reference ID, e.g. TBEX-4K7QZP. */
export function generateReferenceId(prefix: "TBEX" | "TBVR" | "TBPT" | "TBCN"): string {
  return `${prefix}-${randomSegment(6)}`;
}
