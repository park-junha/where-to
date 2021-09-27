import runMigration from './runMigration';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

it('should increase max number of portals to 100 if under v1.6.0', () => {
  // Setup
  const settingsToMigrate = { maxPortals: 30 };
  localStorage.__STORE__['settings'] = JSON.stringify(settingsToMigrate);

  runMigration()

  // Validate local storage
  const results = JSON.parse(localStorage.__STORE__['settings']);
  expect(results.maxPortals).toBe(100);
});

it('should migrate webportal to shortcut', () => {
  // Setup
  const contentToMigrate = [
    { type: 'webportal', id: '1' },
    { type: 'shortcut', id: '2' }
  ];
  localStorage.__STORE__['contentsMain'] = JSON.stringify(contentToMigrate);

  // Validate returned results
  const returnedResults = JSON.parse(runMigration());
  for (const result of returnedResults) {
    expect(result.type).toBe('shortcut');
  }

  // Validate local storage
  const storageResults = JSON.parse(localStorage.__STORE__['contentsMain']);
  for (const result of storageResults) {
    expect(result.type).toBe('shortcut');
  }
});

it('should attempt to migrate an empty list for undefined storage', () => {
  // Validate returned results
  const returnedResults = runMigration();
  expect(returnedResults).toBe('[]');

  // Validate local storage
  expect(localStorage.__STORE__['contentsMain']).toBe('[]');
});
