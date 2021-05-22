import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import TransferTab from './TransferTab';

function stubCopyToClipboard() {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => { return Promise.resolve(); },
    },
  });
}

beforeAll(() => {
  stubCopyToClipboard();
  jest.spyOn(navigator.clipboard, 'writeText');
});

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

it('should copy on clipboard on button click', () => {
  localStorage.__STORE__.contentsMain = 'copythis';
  const { getByText } = render(<TransferTab/>);
  const copyButton = getByText(/Copy to Clipboard/);
  fireEvent.click(copyButton);
  const copiedLabel = getByText(/Copied/);
  expect(navigator.clipboard.writeText).toHaveBeenCalledWith('copythis');
  expect(copiedLabel).toBeInTheDocument();
});
