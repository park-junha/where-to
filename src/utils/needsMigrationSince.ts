import { NEED_MIGRATION_IF_BEFORE } from '../models/constants';

export default function needsMigrationSince(lastMigration: string | null):
  boolean {
  if (lastMigration === null) {
    return true;
  }

  const [
    lastMigrationMajor,
    lastMigrationMinor,
    lastMigrationPatch
  ] = lastMigration.split('.').map(n => parseInt(n));

  const [
    migrationRequiredMajor,
    migrationRequiredMinor,
    migrationRequiredPatch
  ] = NEED_MIGRATION_IF_BEFORE.split('.').map(n => parseInt(n));

  if (lastMigrationMajor < migrationRequiredMajor) {
    return true;
  } else if (lastMigrationMinor < migrationRequiredMinor) {
    return true;
  } else if (lastMigrationPatch < migrationRequiredPatch) {
    return true;
  }

  return false;
};
