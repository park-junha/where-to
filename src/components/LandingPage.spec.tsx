import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage';
import App from '../App';

const testContent = [
  {
    title: 'GitHub',
    type: 'webportal',
    url: 'https://github.com/park-junha',
    id: '5afa9b63-2268-465f-8f8f-513030d50730'
  },
  {
    title: 'Spekkio',
    type: 'webportal',
    url: 'https://github.com/spekkio-bot/spekkio',
    id: '0ff6095f-1de1-4e81-9053-96827d9029f0'
  }
];

it('renders header', () => {
  const props = {
    contents: testContent,
    switchComponent: App.switchComponent
  };
  const { getByText } = render(<LandingPage {...props} />);
  const h1 = getByText(/Where To/);
  expect(h1).toBeInTheDocument();
});
