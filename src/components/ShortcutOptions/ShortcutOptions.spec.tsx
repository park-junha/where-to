import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ShortcutOptions from './ShortcutOptions';

it('should start with empty state without initialFormValues',
  async function () {
    const submitFormSpy = jest.fn();
    const hideModalSpy = jest.fn();
    const props = {
      submitForm: data => submitFormSpy(),
      submitLabel: 'Unknown Type Test',
      hideModal: () => hideModalSpy()
    };
    const { queryByTestId } = render(<ShortcutOptions {...props}/>);
    const titleField = queryByTestId('title');
    const urlField = queryByTestId('url');
    expect(titleField.value).toBe('');
    expect(urlField.value).toBe('');
});

it('should populate state with initialFormValues for "shortcut" type',
  async function () {
    const submitFormSpy = jest.fn();
    const hideModalSpy = jest.fn();
    const props = {
      submitForm: data => submitFormSpy(),
      submitLabel: 'Shortcut Test',
      hideModal: () => hideModalSpy(),
      initialFormValues: {
        type: 'shortcut',
        title: 'Shortcut type unit test',
        url: 'chrome://extensions'
      }
    };
    const { queryByTestId } = render(<ShortcutOptions {...props}/>);
    const titleField = queryByTestId('title');
    const urlField = queryByTestId('url');
    expect(titleField.value).toBe('Shortcut type unit test');
    expect(urlField.value).toBe('chrome://extensions');
});

it('should populate state with initialFormValues for "webportal" type',
  async function () {
    const submitFormSpy = jest.fn();
    const hideModalSpy = jest.fn();
    const props = {
      submitForm: data => submitFormSpy(),
      submitLabel: 'Webportal Test',
      hideModal: () => hideModalSpy(),
      initialFormValues: {
        type: 'webportal',
        title: 'Webportal type unit test',
        url: 'chrome://blank'
      }
    };
    const { queryByTestId } = render(<ShortcutOptions {...props}/>);
    const titleField = queryByTestId('title');
    const urlField = queryByTestId('url');
    expect(titleField.value).toBe('Webportal type unit test');
    expect(urlField.value).toBe('chrome://blank');
});

it('should not populate state with initialFormValues for an unknown type',
  async function () {
    const submitFormSpy = jest.fn();
    const hideModalSpy = jest.fn();
    const props = {
      submitForm: data => submitFormSpy(),
      submitLabel: 'Unknown Type Test',
      hideModal: () => hideModalSpy(),
      initialFormValues: {
        type: 'blah',
        title: 'Unknown type unit test',
        url: 'should.not.appear.com'
      }
    };
    const { queryByTestId } = render(<ShortcutOptions {...props}/>);
    const titleField = queryByTestId('title');
    const urlField = queryByTestId('url');
    expect(titleField.value).toBe('');
    expect(urlField.value).toBe('');
});
