import { AppContents } from '../models/interfaces';
import { DEFAULT_PORTALS, DEFAULT_SETTINGS } from '../models/constants';
import runMigration from './runMigration';
import needsMigrationSince from './needsMigrationSince';

export default function loadContents(): AppContents {
  let storedContents = localStorage.getItem('contentsMain');
  let storedSettings = localStorage.getItem('settings');
  let lastMigration = localStorage.getItem('lastMigrationRun');
  let main = [];
  let settings: any = {};
  if (storedContents === null) {
    main = DEFAULT_PORTALS;
    localStorage.setItem('contentsMain', JSON.stringify(main));
  } else {
    if (needsMigrationSince(lastMigration)) {
      runMigration();
    }
    main = JSON.parse(localStorage.getItem('contentsMain') ?? '[]');
  }
  if (storedSettings === null) {
    settings = Object.assign({}, DEFAULT_SETTINGS);
    localStorage.setItem('settings', JSON.stringify(settings));
  } else {
    settings = Object.assign({}, JSON.parse(storedSettings ?? '[]'));
  }
  return {
    main: main,
    settings: settings
  };
};
