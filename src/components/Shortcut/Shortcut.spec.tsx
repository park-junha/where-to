import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Shortcut from './Shortcut';

const props = {
  item: {
    type: 'shortcut',
    id: 'test',
    title: 'Shortcut Unit Tests',
    url: 'about:blank'
  },
  size: 60,
  switchComponent: jest.fn()
};

it('should render', () => {
  const { queryByText } = render(<Shortcut {...props} />);
  const button = queryByText(/Shortcut Unit Tests/);
  expect(button).toBeInTheDocument();
});

it('should call switchComponent prop on click', () => {
  const { queryByText } = render(<Shortcut {...props} />);
  const button = queryByText(/Shortcut Unit Tests/);
  fireEvent.click(button);
  expect(props.switchComponent).toHaveBeenCalled();
});
