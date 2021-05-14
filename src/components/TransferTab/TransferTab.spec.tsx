import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TransferTab from './TransferTab';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

it('should populate the text box with localStorage.contentsMain', () => {
  localStorage.__STORE__.contentsMain = 'this.should.appear';
  const { getByDisplayValue } = render(<TransferTab/>);
  const correctDataDisplay = getByDisplayValue('this.should.appear');
  expect(correctDataDisplay).toBeInTheDocument();
});

it('should have empty text box without localStorage.contentsMain', () => {
  const { getByDisplayValue } = render(<TransferTab/>);
  const correctDataDisplay = getByDisplayValue('');
  expect(correctDataDisplay).toBeInTheDocument();
});
