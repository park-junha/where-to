import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import SortablePortal from './SortablePortal';

const defaultProps = {
  item: {
    id: 'x',
    type: 'shortcut',
    title: 'SortablePortalTest',
    url: 'about:blank'
  },
  size: 60,
  openEditModal: jest.fn(),
  removePortal: jest.fn()
};

it('should render portals of type "shortcut"', () => {
  const { queryByText } = render(<SortablePortal {...defaultProps}/>);
  const portal = queryByText('SortablePortalTest');
  expect(portal).toBeInTheDocument();
});

it('should render portals of type "webportal"', () => {
  const props = {
    ...defaultProps,
    item: {
      ...defaultProps.item,
      type: 'webportal'
    }
  };
  const { queryByText } = render(<SortablePortal {...props}/>);
  const portal = queryByText('SortablePortalTest');
  expect(portal).toBeInTheDocument();
});

it('should render portals of invalid type as N/A', () => {
  const props = {
    ...defaultProps,
    item: {
      ...defaultProps.item,
      type: 'invalid_type'
    }
  };
  const { queryByText } = render(<SortablePortal {...props}/>);
  const portal = queryByText('SortablePortalTest');
  const naPortal = queryByText('N/A');
  expect(portal).not.toBeInTheDocument();
  expect(naPortal).toBeInTheDocument();
});

it('should open edit modal on valid portal click', () => {
  const { queryByText } = render(<SortablePortal {...defaultProps}/>);
  const portal = queryByText('SortablePortalTest');
  fireEvent.click(portal);
  expect(defaultProps.openEditModal).toHaveBeenCalled();
});

it('should automatically remove portal on invalid portal click', () => {
  const props = {
    ...defaultProps,
    item: {
      ...defaultProps.item,
      type: 'invalid_type'
    }
  };
  const { queryByText } = render(<SortablePortal {...props}/>);
  const portal = queryByText('N/A');
  fireEvent.click(portal);
  expect(defaultProps.removePortal).toHaveBeenCalled();
});

