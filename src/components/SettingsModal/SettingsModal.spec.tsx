import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SettingsModal from './SettingsModal';

const props = {
  showModal: true,
  hideModal: jest.fn(),
  portalSize: 60,
  updatePortalSize: jest.fn(),
  loadContents: jest.fn(),
  resetPortals: jest.fn()
};

it('should render general settings on general button click', () => {
  const { queryByText } = render(<SettingsModal {...props}/>);
  const generalButton = queryByText(/General/);
  fireEvent.click(generalButton);
  const buttonSizeLabel = queryByText(/Button Size/);
  expect(buttonSizeLabel).toBeInTheDocument();
});

it('should render transfer tab on transfer button click', () => {
  const { queryByText } = render(<SettingsModal {...props}/>);
  const transferButton = queryByText(/Transfer/);
  fireEvent.click(transferButton);
  const transferLabel = queryByText(/Transfer To Another Device/);
  expect(transferLabel).toBeInTheDocument();
});

it('should render load tab on load button click', () => {
  const { queryByText } = render(<SettingsModal {...props}/>);
  const loadButton = queryByText(/Load/);
  fireEvent.click(loadButton);
  const loadLabel = queryByText(/Load From Another Device/);
  expect(loadLabel).toBeInTheDocument();
});

it('should render reset tab on reset button click', () => {
  const { queryByText } = render(<SettingsModal {...props}/>);
  const resetButton = queryByText(/Reset to Default/);
  fireEvent.click(resetButton);
  const resetLabel = queryByText(/Are you sure/);
  expect(resetLabel).toBeInTheDocument();
});
