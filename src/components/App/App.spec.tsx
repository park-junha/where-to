import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { PortalFormType } from '../../models/enums';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('App (integration)', () => {
  it('should throw correct error on portal form with missing title',
    async function() {
    let app: App = new App();
    const portalForm = {
      type: 'shortcut',
      title: '',
      url: 'https://google.com'
    };
    let error: string = '';
    await app.validatePortalForm(portalForm, PortalFormType.add)
    .catch((err) => {
      error = err
    });
    expect(error).toBe('ERROR: Please enter a name.');
  });

  it('should throw correct error on portal form with missing URL',
    async function() {
    let app: App = new App();
    const portalForm = {
      type: 'shortcut',
      title: 'Google',
      url: ''
    };
    let error: string = '';
    await app.validatePortalForm(portalForm, PortalFormType.add)
    .catch((err) => {
      error = err
    });
    expect(error).toBe('ERROR: Please enter a URL.');
  });

  it('should throw correct error when app has too many portals',
    async function() {
    let app: App = new App();
    app.state.contents.main = [
      {
        id: '1',
        type: 'shortcut',
        title: 'GitHub',
        url: 'https://github.com'
      },
      {
        id: '2',
        type: 'shortcut',
        title: 'LinkedIn',
        url: 'https://linkedin.com'
      }
    ];
    app.state.contents.settings.maxPortals = 2;
    const portalForm = {
      type: 'shortcut',
      title: 'Google',
      url: 'https://google.com'
    };
    let error: string = '';
    await app.validatePortalForm(portalForm, PortalFormType.add)
    .catch((err) => {
      error = err
    });
    expect(error).toBe('ERROR: Maximum number of portals reached.');
  });

  it('should throw correct error on portal form with invalid URL',
    async function() {
    let app: App = new App();
    const portalForm = {
      type: 'shortcut',
      title: 'Google',
      url: 'definitelyNotAValidURL'
    };
    let error: string = '';
    await app.validatePortalForm(portalForm, PortalFormType.add)
    .catch((err) => {
      error = err
    });
    expect(error).toBe('ERROR: Invalid URL.');
  });

  it('should not throw error on valid portal form',
    async function() {
    let app: App = new App();
    const portalForm = {
      type: 'shortcut',
      title: 'Google',
      url: 'https://google.com'
    };
    let error: string = '';
    await app.validatePortalForm(portalForm, PortalFormType.add)
    .catch((err) => {
      error = err
    });
    expect(error).toBe('');
  });
});

describe('App (e2e)', () => {
  const sampleData = [
    {
      id: 'e2e-sample-data',
      type: 'shortcut',
      title: 'E2E Sample Data',
      url: 'chrome://extensions'
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    localStorage.__STORE__.contentsMain = JSON.stringify(sampleData);
    jest.clearAllMocks();
  });

  it('can render (no WebGL)', () => {
    const { queryByText } = render(<App renderVisuals={false} />);
    const header = queryByText(/Where To/);
    expect(header).toBeInTheDocument();
  });

  it('can render portals', () => {
    const { queryByText } = render(<App renderVisuals={false} />);
    const portal = queryByText(/E2E Sample Data/);
    expect(portal).toBeInTheDocument();
  });

  it('can load data through settings', () => {
    const {
      queryByDisplayValue,
      queryByText,
      queryByTestId
    } = render(<App renderVisuals={false} />);

    // Open Settings modal
    const settingsButton = queryByTestId('footer-button-settings');
    fireEvent.click(settingsButton);

    // Navigate to Load
    const loadTabButton = queryByText(/^Load/);
    fireEvent.click(loadTabButton);

    // Fill out and submit
    const loadButton = queryByText(/Load Data/);
    const textInputField = queryByDisplayValue('');
    fireEvent.change(textInputField, {
      target: {
        value: JSON.stringify(sampleData)
      }
    });
    fireEvent.click(loadButton);

    // Validate
    const storageData = JSON.parse(localStorage.__STORE__.contentsMain);
    expect(storageData.length).toEqual(1);
  });

  it('can reset data through settings', () => {
    const {
      queryByText,
      queryByTestId
    } = render(<App renderVisuals={false} />);

    // Open Settings modal
    const settingsButton = queryByTestId('footer-button-settings');
    fireEvent.click(settingsButton);

    // Navigate to Reset
    const resetTabButton = queryByText(/^Reset to Default/);
    fireEvent.click(resetTabButton);

    // Confirm
    const resetButton = queryByText(/Yes/);
    fireEvent.click(resetButton);

    // Validate
    const storageData = JSON.parse(localStorage.__STORE__.contentsMain);
    expect(storageData.length).toEqual(4);
    const facebookPortal = queryByText(/Facebook/);
    const amazonPortal = queryByText(/Amazon/);
    const netflixPortal = queryByText(/Netflix/);
    const googlePortal = queryByText(/Google/);
    expect(facebookPortal).toBeInTheDocument();
    expect(amazonPortal).toBeInTheDocument();
    expect(netflixPortal).toBeInTheDocument();
    expect(googlePortal).toBeInTheDocument();
  });

  it('can create portal', async () => {
    const {
      queryByPlaceholderText,
      queryByText,
      queryByTestId
    } = render(<App renderVisuals={false} />);

    // Click add portal button
    const editButton = queryByTestId('footer-button-add');
    fireEvent.click(editButton);

    // Fill out form and submit
    const nameField = queryByPlaceholderText(/Enter name/);
    const urlField = queryByPlaceholderText(/Enter URL/);
    fireEvent.change(nameField, {
      target: {
        value: 'New shortcut'
      }
    });
    fireEvent.change(urlField, {
      target: {
        value: 'about:blank'
      }
    });
    const createButton = queryByText(/^Create/);
    fireEvent.click(createButton);

    // Sleep for 0.5s
    await sleep(500);

    // Validate
    const storageData = JSON.parse(localStorage.__STORE__.contentsMain);
    expect(storageData.length).toEqual(2);
    expect(storageData[1].title).toEqual('New shortcut');
    expect(storageData[1].url).toEqual('about:blank');
    const portalAfterEdit = queryByText(/^New shortcut$/);
    expect(portalAfterEdit).toBeInTheDocument();
  });

  it('can edit portal', async () => {
    const {
      queryByDisplayValue,
      queryByText,
      queryByTestId
    } = render(<App renderVisuals={false} />);

    // Enable edit mode
    const editButton = queryByTestId('footer-button-edit');
    fireEvent.click(editButton);

    // Click portal
    const portal = queryByText(/E2E Sample Data/);
    fireEvent.click(portal);

    // Fill out form and submit
    const nameField = queryByDisplayValue('E2E Sample Data');
    const urlField = queryByDisplayValue('chrome://extensions');
    fireEvent.change(nameField, {
      target: {
        value: 'E2E'
      }
    });
    fireEvent.change(urlField, {
      target: {
        value: 'about:blank'
      }
    });
    const saveButton = queryByText(/^Save/);
    fireEvent.click(saveButton);

    // Sleep for 0.5s
    await sleep(500);

    // Validate
    const storageData = JSON.parse(localStorage.__STORE__.contentsMain);
    expect(storageData.length).toEqual(1);
    expect(storageData[0].title).toEqual('E2E');
    expect(storageData[0].url).toEqual('about:blank');
    const portalBeforeEdit = queryByText(/^E2E Sample Data$/);
    const portalAfterEdit = queryByText(/^E2E$/);
    expect(portalBeforeEdit).not.toBeInTheDocument();
    expect(portalAfterEdit).toBeInTheDocument();
  });

  it('can clone portal', async () => {
    const {
      queryAllByText,
      queryByDisplayValue,
      queryByText,
      queryByTestId
    } = render(<App renderVisuals={false} />);

    // Enable edit mode
    const editButton = queryByTestId('footer-button-edit');
    fireEvent.click(editButton);

    // Click portal
    const portal = queryByText(/E2E Sample Data/);
    fireEvent.click(portal);

    // Click clone tab button
    const cloneTab = queryByText(/Clone/);
    fireEvent.click(cloneTab);

    // Fill out form and submit
    const nameField = queryByDisplayValue('E2E Sample Data');
    const urlField = queryByDisplayValue('chrome://extensions');
    fireEvent.change(nameField, {
      target: {
        value: 'E2E Cloned Data'
      }
    });
    fireEvent.change(urlField, {
      target: {
        value: 'about:blank'
      }
    });
    const saveButton = queryAllByText(/Clone/)[1];
    fireEvent.click(saveButton);

    // Sleep for 0.5s
    await sleep(500);

    // Validate
    const storageData = JSON.parse(localStorage.__STORE__.contentsMain);
    expect(storageData.length).toEqual(2);
    expect(storageData[0].title).toEqual('E2E Sample Data');
    expect(storageData[0].url).toEqual('chrome://extensions');
    expect(storageData[1].title).toEqual('E2E Cloned Data');
    expect(storageData[1].url).toEqual('about:blank');
    const firstPortal = queryByText(/E2E Sample Data/);
    const clonedPortal = queryByText(/E2E Cloned Data/);
    expect(firstPortal).toBeInTheDocument();
    expect(clonedPortal).toBeInTheDocument();
  });

  it('can remove portal', () => {
    const {
      queryByText,
      queryByTestId
    } = render(<App renderVisuals={false} />);

    // Enable edit mode
    const editButton = queryByTestId('footer-button-edit');
    fireEvent.click(editButton);

    // Click portal
    const portal = queryByText(/E2E Sample Data/);
    fireEvent.click(portal);

    // Delete
    const deleteTabButton = queryByText(/Delete/);
    fireEvent.click(deleteTabButton);
    const deleteButton = queryByText(/Yes/);
    fireEvent.click(deleteButton);

    // Validate
    const storageData = JSON.parse(localStorage.__STORE__.contentsMain);
    expect(storageData.length).toEqual(0);
    const portalAfterDelete = queryByText(/E2E Sample Data/);
    expect(portalAfterDelete).not.toBeInTheDocument();
  });
});
