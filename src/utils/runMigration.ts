import { VERSION } from '../models/constants';

export default function runMigration(): string {
  let storedContents = localStorage.getItem('contentsMain');
  let storedSettings = localStorage.getItem('settings');
  let contentsToMigrate = JSON.parse(storedContents ?? '[]');
  let settingsToMigrate = JSON.parse(storedSettings ?? '{}');
  for (let item of contentsToMigrate) {
    if (item.type === 'webportal') {
      item.type = 'shortcut';
    }
  }
  settingsToMigrate.maxPortals = 100;
  let migratedContents: string = JSON.stringify(contentsToMigrate);
  let migratedSettings: string = JSON.stringify(settingsToMigrate);
  localStorage.setItem('contentsMain', migratedContents);
  localStorage.setItem('settings', migratedSettings);
  localStorage.setItem('lastMigrationRun', VERSION);
  return migratedContents;
};
