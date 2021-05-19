import { VERSION } from '../models/constants';

export default function runMigration(): string {
  let storedContents = localStorage.getItem('contentsMain');
  let contentsToMigrate = JSON.parse(storedContents ?? '[]');
  for (let item of contentsToMigrate) {
    if (item.type === 'webportal') {
      item.type = 'shortcut';
    }
  }
  let migratedContents: string = JSON.stringify(contentsToMigrate);
  localStorage.setItem('contentsMain', migratedContents);
  localStorage.setItem('lastMigrationRun', VERSION);
  return migratedContents;
};
