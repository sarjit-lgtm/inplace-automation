/**
 * Sequence Store
 *
 * In-memory store for speed-to-lead follow-up sequences.
 * The interface is designed so this module can be swapped for a database
 * implementation (Postgres, Supabase, etc.) without changing callers.
 *
 * NOTE: This in-memory store resets when the server process restarts.
 *       Replace with a persistent store before going to production.
 */

export type SequenceEntry = {
  contactId: string;
  contactName: string;
  phone: string;
  email: string;
  leadSource: string;
  stylePref: string;
  score: number;
  startedAt: string; // ISO date
  currentStep: number; // 0–5
  replied: boolean;
  completedAt: string | null;
  /** ISO timestamps of when each step was sent (index = step number) */
  stepsSentAt: (string | null)[];
};

/** The in-memory store — keyed by contactId */
const store = new Map<string, SequenceEntry>();

/** Add or overwrite a sequence entry */
export function upsertSequence(entry: SequenceEntry): void {
  store.set(entry.contactId, entry);
}

/** Get a sequence entry by contact ID, or null if not found */
export function getSequence(contactId: string): SequenceEntry | null {
  return store.get(contactId) ?? null;
}

/** Mark a contact as replied — stops future steps from being sent */
export function markReplied(contactId: string): boolean {
  const entry = store.get(contactId);
  if (!entry) return false;
  entry.replied = true;
  entry.completedAt = new Date().toISOString();
  return true;
}

/** Mark a sequence as completed */
export function markCompleted(contactId: string): boolean {
  const entry = store.get(contactId);
  if (!entry) return false;
  entry.completedAt = new Date().toISOString();
  return true;
}

/** Update the current step and record when it was sent */
export function advanceStep(contactId: string, step: number): boolean {
  const entry = store.get(contactId);
  if (!entry) return false;
  entry.currentStep = step;
  if (!entry.stepsSentAt[step]) {
    entry.stepsSentAt[step] = new Date().toISOString();
  }
  return true;
}

/** Return all active (non-completed, non-replied) sequences */
export function getActiveSequences(): SequenceEntry[] {
  return Array.from(store.values()).filter(
    (e) => !e.replied && !e.completedAt
  );
}

/** Return all sequences (for debugging / admin) */
export function getAllSequences(): SequenceEntry[] {
  return Array.from(store.values());
}

/** Remove a sequence from the store */
export function removeSequence(contactId: string): boolean {
  return store.delete(contactId);
}

/** Create a fresh sequence entry with sensible defaults */
export function createSequenceEntry(
  contactId: string,
  contactName: string,
  phone: string,
  email: string,
  leadSource: string,
  score: number,
  stylePref = ""
): SequenceEntry {
  return {
    contactId,
    contactName,
    phone,
    email,
    leadSource,
    stylePref,
    score,
    startedAt: new Date().toISOString(),
    currentStep: 0,
    replied: false,
    completedAt: null,
    stepsSentAt: new Array(6).fill(null),
  };
}
