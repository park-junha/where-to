import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ItemModal from './ItemModal';

const defaultProps = {
  showModal: true,
  hideModal: jest.fn(),
  removePortal: jest.fn(),
  submitForm: jest.fn(() => Promise.resolve('')),
  mode: 'create'
};

it('should render ShortcutOptions initially', () => {
  const { queryByText } = render(<ItemModal {...defaultProps}/>);
  const shortcutLabel = queryByText(/Configure Shortcut/);
  expect(shortcutLabel).toBeInTheDocument();
});

it('should render correct buttons', () => {
  const { queryByText } = render(<ItemModal {...defaultProps}/>);
  const shortcutButton = queryByText(/^Shortcut/);
  const folderButton = queryByText(/Folder/);
  expect(shortcutButton).toBeInTheDocument();
  expect(folderButton).toBeInTheDocument();
});

it('should not render clone button on create mode', () => {
  const { queryByText } = render(<ItemModal {...defaultProps}/>);
  const cloneButton = queryByText(/Clone/);
  expect(cloneButton).not.toBeInTheDocument();
});

it('should not render delete button on create mode', () => {
  const { queryByText } = render(<ItemModal {...defaultProps}/>);
  const deleteButton = queryByText(/Delete/);
  expect(deleteButton).not.toBeInTheDocument();
});

it('should render clone button on edit mode', () => {
  const props = {
    ...defaultProps,
    mode: 'edit'
  };
  const { queryByText } = render(<ItemModal {...props}/>);
  const cloneButton = queryByText(/Clone/);
  expect(cloneButton).toBeInTheDocument();
});

it('should render delete button on edit mode', () => {
  const props = {
    ...defaultProps,
    mode: 'edit'
  };
  const { queryByText } = render(<ItemModal {...props}/>);
  const deleteButton = queryByText(/Delete/);
  expect(deleteButton).toBeInTheDocument();
});

it('should render unsupported warning on folder button click', () => {
  const { queryByText } = render(<ItemModal {...defaultProps}/>);
  const folderButton = queryByText(/Folder/);
  fireEvent.click(folderButton);
  const sorryLabel = queryByText(/^Sorry/);
  expect(sorryLabel).toBeInTheDocument();
});

it('should render Configure Shortcut on shortcut button click', () => {
  const { queryByText } = render(<ItemModal {...defaultProps}/>);
  const shortcutButton = queryByText(/^Shortcut/);
  fireEvent.click(shortcutButton);
  const shortcutLabel = queryByText(/Configure Shortcut/);
  expect(shortcutLabel).toBeInTheDocument();
});

it('should render form clone button on clone tab button click', () => {
  const props = {
    ...defaultProps,
    mode: 'edit'
  };
  const { queryByText, queryAllByText } = render(<ItemModal {...props}/>);
  const cloneTabButton = queryByText(/Clone/);
  fireEvent.click(cloneTabButton);
  const cloneButtons = queryAllByText(/Clone/);
  expect(cloneButtons.length).toBe(2);
});

it('should render delete warning on delete button click', () => {
  const props = {
    ...defaultProps,
    mode: 'edit'
  };
  const { queryByText } = render(<ItemModal {...props}/>);
  const deleteButton = queryByText(/Delete/);
  fireEvent.click(deleteButton);
  const deleteLabel = queryByText(/^Are you sure you want to remove/);
  expect(deleteLabel).toBeInTheDocument();
});

it('should throw errors on invalid mode', () => {
  // Silence console.error in testing output
  const originalError = console.error;
  console.error = jest.fn();

  // Actual test case
  const props = {
    ...defaultProps,
    mode: 'invalid_mode'
  };
  expect(() => render(<ItemModal {...props}/>))
    .toThrow(/Invalid ItemModal mode state/);

  // Restore original console.error
  console.error = originalError;
});
