import validatePortal, {
  validateAllPortals,
  validateAllPortalsFromStr
} from './validatePortal';

it('should throw correct error on portal form with missing title',
  async function() {
  const portalForm = {
    type: 'shortcut',
    title: '',
    url: 'https://google.com'
  };
  let error: string = '';
  await validatePortal(portalForm).catch((err) => {
    error = err
  });
  expect(error).toBe('ERROR: Please enter a name.');
});

it('should throw correct error on portal form with missing URL',
  async function() {
  const portalForm = {
    type: 'shortcut',
    title: 'Google',
    url: ''
  };
  let error: string = '';
  await validatePortal(portalForm).catch((err) => {
    error = err
  });
  expect(error).toBe('ERROR: Please enter a URL.');
});

it('should throw correct error on portal form with invalid URL',
  async function() {
  const portalForm = {
    type: 'shortcut',
    title: 'Google',
    url: 'definitelyNotAValidURL'
  };
  let error: string = '';
  await validatePortal(portalForm).catch((err) => {
    error = err
  });
  expect(error).toBe('ERROR: Invalid URL.');
});

it('should not throw error on valid portal form', async function() {
  const portalForm = {
    type: 'shortcut',
    title: 'Google',
    url: 'https://google.com'
  };
  let error: string = '';
  await validatePortal(portalForm).catch((err) => {
    error = err
  });
  expect(error).toBe('');
});

it('should throw malformed data error on validating multiple portals',
  async function() {
  const portals = [
    {
      type: 'shortcut',
      title: 'Extensions',
      url: 'chrome://extensions'
    },
    {
      type: 'shortcut',
      title: 'Blank',
      url: 'about:blank'
    },
    {
      type: 'webportal',
      title: 'Google',
      url: 'asdfasdf'
    }
  ];
  let error: string = '';
  await validateAllPortals(portals).catch((err) => {
    error = err
  });
  expect(error).toEqual('ERROR: Malformed data.');
});

it('should not throw error on validating multiple portals',
  async function() {
  const portals = [
    {
      type: 'shortcut',
      title: 'Extensions',
      url: 'chrome://extensions'
    },
    {
      type: 'shortcut',
      title: 'Blank',
      url: 'about:blank'
    },
    {
      type: 'webportal',
      title: 'Google',
      url: 'https://google.com'
    }
  ];
  let error: string = '';
  await validateAllPortals(portals).catch((err) => {
    error = err
  });
  expect(error).toEqual('');
});

it('should throw error on validating by string, unparseable JSON',
  async function() {
  const portals =
    '[{"type":"shortcut","title":"Blank","url":"about:blank"}';
  let error: string = '';
  await validateAllPortalsFromStr(portals).catch((err) => {
    error = err
  });
  expect(error).toEqual('ERROR: Could not parse data.');
});

it('should throw error on validating by string, non-array',
  async function() {
  const portals =
    '{"type":"shortcut","title":"Blank","url":"about:blank"}';
  let error: string = '';
  await validateAllPortalsFromStr(portals).catch((err) => {
    error = err
  });
  expect(error).toEqual('ERROR: Malformed data.');
});

it('should throw error on validating by string, validation failure',
  async function() {
  const portals =
    '[{"type":"shortcut","title":"Blank","url":"notvalid"}]';
  let error: string = '';
  await validateAllPortalsFromStr(portals).catch((err) => {
    error = err
  });
  expect(error).toEqual('ERROR: Malformed data.');
});

it('should not throw error on validating by valid string',
  async function() {
  const portals =
    '[{"type":"shortcut","title":"Blank","url":"about:blank"}]';
  let error: string = '';
  await validateAllPortalsFromStr(portals).catch((err) => {
    error = err
  });
  expect(error).toEqual('');
});
