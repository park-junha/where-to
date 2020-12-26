import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App, { validatePortalForm } from './App';
import { PortalFormType } from './shared';

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
  app.state.maxPortals = 2;
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
