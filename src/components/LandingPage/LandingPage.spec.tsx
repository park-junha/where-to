import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LandingPage from './LandingPage';
import App from '../../App';

const testContent = [
  {
    title: 'GitHub',
    type: 'shortcut',
    url: 'https://github.com/park-junha',
    id: '5afa9b63-2268-465f-8f8f-513030d50730'
  },
  {
    title: 'Spekkio',
    type: 'shortcut',
    url: 'https://github.com/spekkio-bot/spekkio',
    id: '0ff6095f-1de1-4e81-9053-96827d9029f0'
  }
];

const testInvalidContent = [
  {
    title: 'This title should not render',
    type: 'invalidcontent',
    url: 'nowhere',
    id: 'notvalid'
  }
];

it('renders header', () => {
  const props = {
    contents: testContent,
    switchComponent: App.switchComponent
  };
  const { queryByText } = render(<LandingPage {...props} />);
  const h1 = queryByText(/Where To/);
  expect(h1).toBeInTheDocument();
});

it('renders shortcut buttons', () => {
  const props = {
    contents: testContent,
    switchComponent: App.switchComponent
  };
  const { queryByText } = render(<LandingPage {...props} />);
  const github = queryByText(/GitHub/);
  const spekkio = queryByText(/Spekkio/);
  expect(github).toBeInTheDocument();
  expect(spekkio).toBeInTheDocument();
});

it('renders N/A for invalid items', () => {
  const props = {
    contents: testInvalidContent,
    switchComponent: App.switchComponent
  };
  const { queryByText } = render(<LandingPage {...props} />);
  const na = queryByText(/N\/A/);
  const unexpected = queryByText(/This title should not render/);
  expect(na).toBeInTheDocument();
  expect(unexpected).not.toBeInTheDocument();
});
