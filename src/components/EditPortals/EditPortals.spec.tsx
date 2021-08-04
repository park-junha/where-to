import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import EditPortals from './EditPortals';

function sleep(ms) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

const defaultContents = [
  {
    id: 'i1',
    type: 'shortcut',
    title: 'Blank',
    url: 'about:blank'
  },
  {
    id: 'i2',
    type: 'shortcut',
    title: 'Extensions',
    url: 'chrome://extensions'
  }
];

const defaultProps = {
  contents: Object.assign([], defaultContents),
  portalSize: 60,
  editPortals: jest.fn(),
  clonePortal: jest.fn(),
  editPortal: jest.fn(),
  removePortal: jest.fn(),
  validatePortalForm: jest.fn(() => Promise.resolve(''))
};

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

it('should render correct header', () => {
  const { queryByText } = render(<EditPortals {...defaultProps}/>);
  const header = queryByText(/Reorder or Remove/);
  expect(header).toBeInTheDocument();
});

it('should render correct number of buttons', () => {
  const { queryAllByRole } = render(<EditPortals {...defaultProps}/>);
  const portals = queryAllByRole('button');
  expect(portals.length).toBe(2);
});

it('should be able to show modal', () => {
  const {
    queryAllByRole,
    queryByText
  } = render(<EditPortals {...defaultProps}/>);
  const portals = queryAllByRole('button');
  expect(queryByText(/Edit Portal/)).not.toBeInTheDocument();
  fireEvent.click(portals[0]);
  expect(queryByText(/Edit Portal/)).toBeInTheDocument();
});

it('should be able to edit portal', async () => {
  const {
    queryAllByRole,
    queryByPlaceholderText,
    queryByText
  } = render(<EditPortals {...defaultProps}/>);

  // Click first portal
  const portals = queryAllByRole('button');
  fireEvent.click(portals[0]);

  // Fill out form on modal and submit
  const nameField = queryByPlaceholderText(/Enter name/);
  fireEvent.change(nameField, {
    target: {
      value: 'Renamed'
    }
  });
  const submitButton = queryByText(/Save/);
  fireEvent.click(submitButton);

  await sleep(500);

  // Validate
  expect(defaultProps.validatePortalForm).toHaveBeenCalled();
  expect(defaultProps.editPortal).toHaveBeenCalled();
  expect(defaultProps.clonePortal).not.toHaveBeenCalled();
});

it('should be able to clone portal', async () => {
  const {
    queryAllByRole,
    queryAllByText,
    queryByPlaceholderText,
    queryByText
  } = render(<EditPortals {...defaultProps}/>);

  // Click first portal
  const portals = queryAllByRole('button');
  fireEvent.click(portals[0]);

  // Click clone tab
  const cloneTab = queryByText(/Clone/);
  fireEvent.click(cloneTab);

  // Fill out form on modal and submit
  const nameField = queryByPlaceholderText(/Enter name/);
  fireEvent.change(nameField, {
    target: {
      value: 'Renamed'
    }
  });
  const submitButton = queryAllByText(/Clone/)[1];
  fireEvent.click(submitButton);

  await sleep(500);

  // Validate
  expect(defaultProps.validatePortalForm).toHaveBeenCalled();
  expect(defaultProps.editPortal).not.toHaveBeenCalled();
  expect(defaultProps.clonePortal).toHaveBeenCalled();
});

it('should be able to delete portal', () => {
  const {
    queryAllByRole,
    queryByPlaceholderText,
    queryByText
  } = render(<EditPortals {...defaultProps}/>);

  // Click first portal
  const portals = queryAllByRole('button');
  fireEvent.click(portals[0]);

  // Delete
  const deleteButton = queryByText(/Delete/);
  fireEvent.click(deleteButton);
  const confirmButton = queryByText(/Yes/);
  fireEvent.click(confirmButton);

  // Validate
  expect(defaultProps.removePortal).toHaveBeenCalled();
});
