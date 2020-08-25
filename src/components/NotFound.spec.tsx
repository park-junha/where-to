import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

it('renders messages', () => {
  const { getByText } = render(<NotFound />);
  const h1 = getByText(/404/);
  const h4 = getByText(/Oops\. Something broke\./);
  expect(h1).toBeInTheDocument();
  expect(h4).toBeInTheDocument();
});
