import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LoadingPage from './LoadingPage';

it('should render', () => {
  const { queryAllByText } = render(<LoadingPage />);
  const loadingObjects = queryAllByText(/Loading/);
  expect(loadingObjects.length).toEqual(2);
});
