export default function needsMigrationSince(lastMigration: string | null):
  boolean {
  if (lastMigration === null) {
    return true;
  }
  return false;
};
