import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';
import App from '../App';

it('renders correct button icons on landing page', () => {
  const props = {
    currentComponent: 'LandingPage',
    showItemModal: false,
    showResetModal: false,
    switchComponent: App.switchComponent
  };
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  const editButton = queryByTestId('footer-button-edit');
  const cancelEditButton = queryByTestId('footer-button-cancel-edit');
  const resetButton = queryByTestId('footer-button-reset');
  const sourceCodeButton = queryByTestId('footer-button-source-code');
  expect(addButton).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(cancelEditButton).not.toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
  expect(sourceCodeButton).toBeInTheDocument();
});

it('renders correct button icons on edit portals page', () => {
  const props = {
    currentComponent: 'EditPortals',
    showItemModal: false,
    showResetModal: false,
    switchComponent: App.switchComponent
  };
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  const editButton = queryByTestId('footer-button-edit');
  const cancelEditButton = queryByTestId('footer-button-cancel-edit');
  const resetButton = queryByTestId('footer-button-reset');
  const sourceCodeButton = queryByTestId('footer-button-source-code');
  expect(addButton).toBeInTheDocument();
  expect(editButton).not.toBeInTheDocument();
  expect(cancelEditButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
  expect(sourceCodeButton).toBeInTheDocument();
});

it('should disable add button when edit portals page is loaded', () => {
  const props = {
    currentComponent: 'EditPortals',
    showItemModal: false,
    showResetModal: false,
    switchComponent: App.switchComponent
  };
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  expect(addButton).toBeDisabled();
});

it('should disable add/edit buttons when app is loading a website', () => {
  const props = {
    currentComponent: 'LoadWebsite',
    showItemModal: false,
    showResetModal: false,
    switchComponent: App.switchComponent
  };
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  const editButton = queryByTestId('footer-button-edit');
  expect(addButton).toBeDisabled();
  expect(editButton).toBeDisabled();
});

it('should not disable add button when landing page is loaded', () => {
  const props = {
    currentComponent: 'LandingPage',
    showItemModal: false,
    showResetModal: false,
    switchComponent: App.switchComponent
  };
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  expect(addButton).not.toBeDisabled();
});

it('should not disable add button when landing page (no fade) is loaded',
  () => {
  const props = {
    currentComponent: 'LandingPageNoFade',
    showItemModal: false,
    showResetModal: false,
    switchComponent: App.switchComponent
  };
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  expect(addButton).not.toBeDisabled();
});
