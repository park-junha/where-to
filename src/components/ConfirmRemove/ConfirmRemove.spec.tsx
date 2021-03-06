import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ConfirmRemove from './ConfirmRemove';

const props = {
  removePortal: jest.fn(),
  hideModal: jest.fn()
};

it('should render warning', () => {
  const { queryByText } = render(<ConfirmRemove {...props} />);
  const warningHeader = queryByText(
    /Are you sure you want to remove this portal/);
  const warningText = queryByText(/You cannot undo this action/);
  expect(warningHeader).toBeInTheDocument();
  expect(warningText).toBeInTheDocument();
});

it('should render buttons', () => {
  const { queryByText } = render(<ConfirmRemove {...props} />);
  const yesButton = queryByText(/Yes/);
  const cancelButton = queryByText(/Cancel/);
  expect(yesButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

it('should call removePortal prop upon clicking Yes button', () => {
  const { queryByText } = render(<ConfirmRemove {...props} />);
  const yesButton = queryByText(/Yes/);
  fireEvent.click(yesButton);
  expect(props.removePortal).toHaveBeenCalled();
});

it('should call hideModal prop upon clicking Cancel button', () => {
  const { queryByText } = render(<ConfirmRemove {...props} />);
  const cancelButton = queryByText(/Cancel/);
  fireEvent.click(cancelButton);
  expect(props.hideModal).toHaveBeenCalled();
});
