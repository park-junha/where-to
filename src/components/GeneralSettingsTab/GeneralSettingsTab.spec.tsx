import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, fireEvent } from '@testing-library/react';
import GeneralSettingsTab from './GeneralSettingsTab';

const props = {
  portalSize: 60,
  updatePortalSize: jest.fn()
};

it('should render', () => {
  const { queryByText, queryByTestId } = render(
    <GeneralSettingsTab {...props}/>);
  const buttonSizeLabel = queryByText(/Button Size/);
  const buttonSizeSlider = queryByTestId('button-size-slider');
  expect(buttonSizeLabel).toBeInTheDocument();
  expect(buttonSizeSlider).toBeInTheDocument();
});

xit('should call updatePortalSize prop when dragging slider', () => {
  // TODO: Implement
  expect(props.updatePortalSize).toHaveBeenCalled();
  expect(props.updatePortalSize).toHaveBeenCalledWith(45);
});
