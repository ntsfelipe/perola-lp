export type ArchivePatch =
  | { set: { archivedAt: string } }
  | { unset: ["archivedAt"] };

export function getArchivePatch(
  currentlyArchived: boolean,
  timestamp: string,
): ArchivePatch {
  return currentlyArchived
    ? { unset: ["archivedAt"] }
    : { set: { archivedAt: timestamp } };
}
