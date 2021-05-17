import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ShortcutOptions from './ShortcutOptions';

const defaultProps = {
  submitForm: jest.fn(() => Promise.resolve('success')),
  submitLabel: 'Submit',
  hideModal: jest.fn()
};

it('should start with empty state without initialFormValues', () => {
  const { queryByPlaceholderText } = render(
    <ShortcutOptions {...defaultProps}/>);
  const titleField = queryByPlaceholderText(/Enter name/);
  const urlField = queryByPlaceholderText(/Enter URL/);
  expect(titleField.value).toBe('');
  expect(urlField.value).toBe('');
});

it('should populate state with initialFormValues for "shortcut" type',
  () => {
  const props = {
    ...defaultProps,
    initialFormValues: {
      type: 'shortcut',
      title: 'Shortcut type unit test',
      url: 'chrome://extensions'
    }
  };
  const { queryByPlaceholderText } = render(<ShortcutOptions {...props}/>);
  const titleField = queryByPlaceholderText(/Enter name/);
  const urlField = queryByPlaceholderText(/Enter URL/);
  expect(titleField.value).toBe('Shortcut type unit test');
  expect(urlField.value).toBe('chrome://extensions');
});

it('should populate state with initialFormValues for "webportal" type',
  () => {
  const props = {
    ...defaultProps,
    initialFormValues: {
      type: 'webportal',
      title: 'Webportal type unit test',
      url: 'chrome://blank'
    }
  };
  const { queryByPlaceholderText } = render(<ShortcutOptions {...props}/>);
  const titleField = queryByPlaceholderText(/Enter name/);
  const urlField = queryByPlaceholderText(/Enter URL/);
  expect(titleField.value).toBe('Webportal type unit test');
  expect(urlField.value).toBe('chrome://blank');
});

it('should not populate state with initialFormValues for an unknown type',
  () => {
  const props = {
    ...defaultProps,
    initialFormValues: {
      type: 'blah',
      title: 'Unknown type unit test',
      url: 'should.not.appear.com'
    }
  };
  const { queryByPlaceholderText } = render(<ShortcutOptions {...props}/>);
  const titleField = queryByPlaceholderText(/Enter name/);
  const urlField = queryByPlaceholderText(/Enter URL/);
  expect(titleField.value).toBe('');
  expect(urlField.value).toBe('');
});

it('should handle changes on name text input field', () => {
  const { queryByPlaceholderText } = render(
    <ShortcutOptions {...defaultProps}/>);
  const textField = queryByPlaceholderText(/Enter name/);
  expect(textField.value).toEqual('')
  fireEvent.change(textField, {
    target: {
      value: 'This should appear'
    }
  });
  expect(textField.value).toEqual('This should appear')
});

it('should handle changes on URL text input field', () => {
  const { queryByPlaceholderText } = render(
    <ShortcutOptions {...defaultProps}/>);
  const urlField = queryByPlaceholderText(/Enter URL/);
  expect(urlField.value).toEqual('')
  fireEvent.change(urlField, {
    target: {
      value: 'http://localhost'
    }
  });
  expect(urlField.value).toEqual('http://localhost')
});

it('should call submitForm prop on submit', () => {
  const { queryByText } = render(<ShortcutOptions {...defaultProps}/>);
  const submitButton = queryByText(/Submit/);
  fireEvent.click(submitButton);
  expect(defaultProps.submitForm).toHaveBeenCalled();
});

it('should call hideModal prop on cancel', () => {
  const { queryByText } = render(<ShortcutOptions {...defaultProps}/>);
  const cancelButton = queryByText(/Cancel/);
  fireEvent.click(cancelButton);
  expect(defaultProps.hideModal).toHaveBeenCalled();
});

it('should call hideModal prop on submitForm promise resolution', () => {
  const { queryByText } = render(<ShortcutOptions {...defaultProps}/>);
  const submitButton = queryByText(/Submit/);
  fireEvent.click(submitButton);
  expect(defaultProps.hideModal).toHaveBeenCalled();
});

it('should raise alert on submitForm promise rejection', async function () {
  const props = {
    ...defaultProps,
    submitForm: jest.fn(() => Promise.reject('alert should appear'))
  };
  const { queryByText } = render(<ShortcutOptions {...props}/>);
  const submitButton = queryByText(/Submit/);
  fireEvent.click(submitButton);
  await new Promise(resolve => setTimeout(resolve, 500));
  const alertLabel = queryByText(/alert should appear/);
  expect(alertLabel).toBeInTheDocument();
});
