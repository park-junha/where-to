import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

it('should render', () => {
  const { queryByText } = render(<LoadingScreen />);
  const spinner = queryByText(/Loading/);
  expect(spinner).toBeInTheDocument();
});
