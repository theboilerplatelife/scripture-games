/* ============================================================
   WHO WROTE IT

   Every verse in the app shows a face beside it. That face has to
   belong to the person who actually wrote the words, per Constitution
   Article 1.4 — not to whoever happened to be next in a rotation.

   Books follow their traditional author. Psalms follow their own
   superscriptions, so David's psalms are David's and the rest are
   named for what they are rather than assigned to him.

   Two cases are deliberately not a named person:
   - "psalmist": a psalm with no superscription naming its writer
   - "hebrews_writer": Hebrews, whose author scripture does not name
   Both get a portrait like anyone else; neither claims a name it
   cannot support.
   ============================================================ */

/* Traditional author of every book used by Verse Builder. */
export const BOOK_AUTHORS = {
  Genesis: "moses",
  Deuteronomy: "moses",
  Joshua: "joshua",
  "1 Chronicles": "chronicler",
  Nehemiah: "nehemiah",
  Job: "job",
  Proverbs: "solomon",
  Isaiah: "isaiah",
  Jeremiah: "jeremiah",
  Micah: "micah",
  Matthew: "matthew",
  Mark: "mark",
  Luke: "luke",
  Acts: "luke",
  John: "john",
  "1 John": "john",
  Revelation: "john",
  Romans: "paul",
  "1 Corinthians": "paul",
  "2 Corinthians": "paul",
  Galatians: "paul",
  Ephesians: "paul",
  Philippians: "paul",
  Colossians: "paul",
  "1 Thessalonians": "paul",
  "2 Timothy": "paul",
  James: "james",
  "1 Peter": "peter",
  // Hebrews names no author, and neither do we
  Hebrews: "hebrews_writer",
};

/* Psalms by their superscription. Psalms that name no writer are the
   work of a temple singer whose name we do not have. */
export const PSALM_AUTHORS = {
  4: "david",
  8: "david",
  9: "david",
  19: "david",
  23: "david",
  24: "david",
  27: "david",
  28: "david",
  33: "psalmist",
  46: "sons_of_korah",
  56: "david",
  100: "psalmist",
  104: "psalmist",
  107: "psalmist",
  111: "psalmist",
  118: "psalmist",
  119: "psalmist",
  121: "psalmist",
  136: "psalmist",
  139: "david",
  147: "psalmist",
  150: "psalmist",
};

/* A few verses are one person's words recorded in another's book. The
   face belongs to whoever said them, which is also who the hint names.
   Jesus' words are the exception and stay with the human narrator, per
   Article 1.2 — Matthew's gospel shows Matthew. */
export const SPEAKER_OVERRIDES = {
  // The Chronicler records the song David sang as the Ark came home
  "1 Chronicles 16:34": "david",
};

/* The book a reference belongs to: "1 Thessalonians 5:17" -> "1 Thessalonians" */
export function bookOf(ref) {
  return String(ref).replace(/\s+\d+[:\d–\-a-c]*$/, "").trim();
}

/* Who wrote this verse. */
export function authorOf(ref) {
  if (SPEAKER_OVERRIDES[ref]) return SPEAKER_OVERRIDES[ref];
  const book = bookOf(ref);
  if (book === "Psalm") {
    return PSALM_AUTHORS[Number(String(ref).match(/Psalm (\d+)/)[1])];
  }
  return BOOK_AUTHORS[book];
}

/* Which portrait a verse shows. The same person is drawn differently
   in each book they wrote — Paul in chains writing to Philippi is not
   Paul dictating Romans — so the key carries both. */
export function portraitOf(ref) {
  return `${authorOf(ref)}/${bookOf(ref)}`;
}
