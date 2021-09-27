import loadContents from './loadContents';
import { DEFAULT_PORTALS, DEFAULT_SETTINGS } from '../models/constants';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

it('should properly initialize localStorage', () => {
  const appContents = loadContents();

  // Validate returned values
  expect(JSON.stringify(appContents.main))
    .toEqual(JSON.stringify(DEFAULT_PORTALS));
  expect(JSON.stringify(appContents.settings))
    .toEqual(JSON.stringify(DEFAULT_SETTINGS));

  // Validate local storage
  expect(localStorage.__STORE__['contentsMain'])
    .toEqual(JSON.stringify(DEFAULT_PORTALS));
  expect(localStorage.__STORE__['settings'])
    .toEqual(JSON.stringify(DEFAULT_SETTINGS));
});

it('should properly load from localStorage', () => {
  // Setup
  localStorage.__STORE__['contentsMain'] = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'shortcut', id: '2', url: 'chrome://extensions' }
  ]);
  localStorage.__STORE__['settings'] = JSON.stringify({
    'maxPortals': 100,
    'portalSize': 60
  });
  localStorage.__STORE__['lastMigrationRun'] = '1.5.1';

  const expectedContents = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'shortcut', id: '2', url: 'chrome://extensions' }
  ]);
  const expectedSettings = JSON.stringify({
    'maxPortals': 100,
    'portalSize': 60
  });

  // Call loadContents()
  const appContents = loadContents();

  // Validate returned values
  expect(JSON.stringify(appContents.main)).toEqual(expectedContents);
  expect(JSON.stringify(appContents.settings)).toEqual(expectedSettings);

  // Validate local storage
  expect(localStorage.__STORE__['contentsMain']).toEqual(expectedContents);
  expect(localStorage.__STORE__['settings']).toEqual(expectedSettings);
});

xit('should properly load from localStorage (<1.5.1)', () => {
  // Setup
  localStorage.__STORE__['contentsMain'] = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'shortcut', id: '2', url: 'chrome://extensions' }
  ]);
  localStorage.__STORE__['settings'] = JSON.stringify({
    'maxPortals': 30,
    'portalSize': 60
  });
  localStorage.__STORE__['lastMigrationRun'] = '1.3.0';

  const expectedContents = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'shortcut', id: '2', url: 'chrome://extensions' }
  ]);
  const expectedSettings = JSON.stringify({
    'maxPortals': 30,
    'portalSize': 60
  });

  // Call loadContents()
  const appContents = loadContents();

  // Validate returned values
  expect(JSON.stringify(appContents.main)).toEqual(expectedContents);
  expect(JSON.stringify(appContents.settings)).toEqual(expectedSettings);

  // Validate local storage
  expect(localStorage.__STORE__['contentsMain']).toEqual(expectedContents);
  expect(localStorage.__STORE__['settings']).toEqual(expectedSettings);
});

it('runs migration when migrations have never been run before', () => {
  // Setup
  localStorage.__STORE__['contentsMain'] = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'webportal', id: '2', url: 'chrome://extensions' }
  ]);
  localStorage.__STORE__['settings'] = JSON.stringify({
    'maxPortals': 100,
    'portalSize': 60
  });

  // Call loadContents()
  const appContents = loadContents();

  // Validate returned values
  const expectedContents = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'shortcut', id: '2', url: 'chrome://extensions' }
  ]);
  const expectedSettings = JSON.stringify({
    'maxPortals': 100,
    'portalSize': 60
  });

  expect(JSON.stringify(appContents.main)).toEqual(expectedContents);
  expect(JSON.stringify(appContents.settings)).toEqual(expectedSettings);

  // Validate local storage
  expect(localStorage.__STORE__['contentsMain']).toEqual(expectedContents);
  expect(localStorage.__STORE__['settings']).toEqual(expectedSettings);
});

xit('runs migration when they have never been run before (<1.5.1)', () => {
  // Setup
  localStorage.__STORE__['contentsMain'] = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'webportal', id: '2', url: 'chrome://extensions' }
  ]);
  localStorage.__STORE__['settings'] = JSON.stringify({
    'maxPortals': 30,
    'portalSize': 60
  });

  // Call loadContents()
  const appContents = loadContents();

  // Validate returned values
  const expectedContents = JSON.stringify([
    { type: 'shortcut', id: '1', url: 'about:blank' },
    { type: 'shortcut', id: '2', url: 'chrome://extensions' }
  ]);
  const expectedSettings = JSON.stringify({
    'maxPortals': 30,
    'portalSize': 60
  });

  expect(JSON.stringify(appContents.main)).toEqual(expectedContents);
  expect(JSON.stringify(appContents.settings)).toEqual(expectedSettings);

  // Validate local storage
  expect(localStorage.__STORE__['contentsMain']).toEqual(expectedContents);
  expect(localStorage.__STORE__['settings']).toEqual(expectedSettings);
});
