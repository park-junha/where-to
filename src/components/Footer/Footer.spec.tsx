import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Footer from './Footer';

const defaultProps = {
  currentComponent: 'PleaseSetMe',
  showItemModal: jest.fn(),
  showSettingsModal: jest.fn(),
  switchComponent: jest.fn()
};

it('renders correct button icons on landing page', () => {
  const props = {...defaultProps, currentComponent: 'LandingPage'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  const editButton = queryByTestId('footer-button-edit');
  const cancelEditButton = queryByTestId('footer-button-cancel-edit');
  const settingsButton = queryByTestId('footer-button-settings');
  const sourceCodeButton = queryByTestId('footer-button-source-code');
  expect(addButton).toBeInTheDocument();
  expect(editButton).toBeInTheDocument();
  expect(cancelEditButton).not.toBeInTheDocument();
  expect(settingsButton).toBeInTheDocument();
  expect(sourceCodeButton).toBeInTheDocument();
});

it('renders correct button icons on edit portals page', () => {
  const props = {...defaultProps, currentComponent: 'EditPortals'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  const editButton = queryByTestId('footer-button-edit');
  const cancelEditButton = queryByTestId('footer-button-cancel-edit');
  const settingsButton = queryByTestId('footer-button-settings');
  const sourceCodeButton = queryByTestId('footer-button-source-code');
  expect(addButton).toBeInTheDocument();
  expect(editButton).not.toBeInTheDocument();
  expect(cancelEditButton).toBeInTheDocument();
  expect(settingsButton).toBeInTheDocument();
  expect(sourceCodeButton).toBeInTheDocument();
});

it('should disable add button when edit portals page is loaded', () => {
  const props = {...defaultProps, currentComponent: 'EditPortals'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  expect(addButton).toBeDisabled();
});

it('should disable add/edit buttons when app is loading a website', () => {
  const props = {...defaultProps, currentComponent: 'LoadWebsite'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  const editButton = queryByTestId('footer-button-edit');
  expect(addButton).toBeDisabled();
  expect(editButton).toBeDisabled();
});

it('should not disable add button when landing page is loaded', () => {
  const props = {...defaultProps, currentComponent: 'LandingPage'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  expect(addButton).not.toBeDisabled();
});

it('should not disable add button when landing page (no fade) is loaded',
  () => {
  const props = {...defaultProps, currentComponent: 'LandingPageNoFade'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  expect(addButton).not.toBeDisabled();
});

it('should call showItemModal prop on add button click', () => {
  const props = {...defaultProps, currentComponent: 'LandingPage'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const addButton = queryByTestId('footer-button-add');
  fireEvent.click(addButton);
  expect(props.showItemModal).toHaveBeenCalled();
});

it('should call switchComponent prop on edit button click', () => {
  const props = {...defaultProps, currentComponent: 'LandingPage'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const editButton = queryByTestId('footer-button-edit');
  fireEvent.click(editButton);
  expect(props.switchComponent).toHaveBeenCalled();
  expect(props.switchComponent).toHaveBeenCalledWith('EditPortals');
});

it('should call switchComponent prop on cancel edit button click', () => {
  const props = {...defaultProps, currentComponent: 'EditPortals'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const cancelEditButton = queryByTestId('footer-button-cancel-edit');
  fireEvent.click(cancelEditButton);
  expect(props.switchComponent).toHaveBeenCalled();
  expect(props.switchComponent).toHaveBeenCalledWith('LandingPageNoFade');
});

it('should call showSettingsModal prop on settings button click', () => {
  const props = {...defaultProps, currentComponent: 'LandingPage'};
  const { queryByTestId } = render(<Footer {...props}/>);
  const settingsButton = queryByTestId('footer-button-settings');
  fireEvent.click(settingsButton);
  expect(props.showSettingsModal).toHaveBeenCalled();
});
