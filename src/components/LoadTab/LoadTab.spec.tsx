import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import LoadTab from './LoadTab';

const props = {
  loadContents: jest.fn()
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

it('should render button', () => {
  const { queryByText } = render(<LoadTab {...props} />);
  const button = queryByText(/Load Data/);
  expect(button).toBeInTheDocument();
});

it('should render empty text input field', () => {
  const { queryByDisplayValue } = render(<LoadTab {...props} />);
  const emptyTextInputField = queryByDisplayValue('');
  expect(emptyTextInputField).toBeInTheDocument();
});

it('should handle changes on text input field', () => {
  const { queryByDisplayValue } = render(<LoadTab {...props} />);
  const textInputField = queryByDisplayValue('');
  expect(textInputField.value).toEqual('')
  fireEvent.change(textInputField, {
    target: {
      value: 'this should be here'
    }
  });
  expect(textInputField.value).toEqual('this should be here')
});

it('should call loadContents prop on submit', async function() {
  const {
    queryByText,
    queryByDisplayValue
  } = render(<LoadTab {...props} />);
  const button = queryByText(/Load Data/);
  const textInputField = queryByDisplayValue('');
  fireEvent.change(textInputField, {
    target: {
      value: '[{"title":"Valid","url":"about:blank"}]'
    }
  });
  fireEvent.click(button);
  await new Promise(resolve => setTimeout(resolve, 500));
  expect(props.loadContents).toHaveBeenCalled();
});

it('should not submit form and alert on invalid submit', async function() {
  const {
    queryByText,
    queryByDisplayValue
  } = render(<LoadTab {...props} />);
  const button = queryByText(/Load Data/);
  const textInputField = queryByDisplayValue('');
  fireEvent.change(textInputField, {
    target: {
      value: '[{"url": "about:blank"}]'
    }
  });
  fireEvent.click(button);
  await new Promise(resolve => setTimeout(resolve, 500));
  const alertText = queryByText(/ERROR: Malformed data./);
  expect(props.loadContents).not.toHaveBeenCalled();
  expect(alertText).toBeInTheDocument();
});

it('should preserve input field text on invalid submit', async function() {
  const {
    queryByText,
    queryByDisplayValue
  } = render(<LoadTab {...props} />);
  const button = queryByText(/Load Data/);
  const textInputField = queryByDisplayValue('');
  fireEvent.change(textInputField, {
    target: {
      value: '[{"url": "about:blank"}]'
    }
  });
  fireEvent.click(button);
  await new Promise(resolve => setTimeout(resolve, 500));
  expect(textInputField.value).toEqual('[{"url": "about:blank"}]');
});
