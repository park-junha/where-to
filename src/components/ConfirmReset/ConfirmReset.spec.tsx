import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ConfirmReset from './ConfirmReset';

const props = {
  resetPortals: jest.fn(),
  hideModal: jest.fn()
};

it('should render warning', () => {
  const { queryByText } = render(<ConfirmReset {...props} />);
  const warningHeader = queryByText(
    /Are you sure you want to reset all portals/);
  const warningText = queryByText(/You cannot undo this action/);
  expect(warningHeader).toBeInTheDocument();
  expect(warningText).toBeInTheDocument();
});

it('should render buttons', () => {
  const { queryByText } = render(<ConfirmReset {...props} />);
  const yesButton = queryByText(/Yes/);
  const cancelButton = queryByText(/Cancel/);
  expect(yesButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

it('should call resetPortals prop upon clicking Yes button', () => {
  const { queryByText } = render(<ConfirmReset {...props} />);
  const yesButton = queryByText(/Yes/);
  fireEvent.click(yesButton);
  expect(props.resetPortals).toHaveBeenCalled();
});

it('should call hideModal prop upon clicking Cancel button', () => {
  const { queryByText } = render(<ConfirmReset {...props} />);
  const cancelButton = queryByText(/Cancel/);
  fireEvent.click(cancelButton);
  expect(props.hideModal).toHaveBeenCalled();
});
