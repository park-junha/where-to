import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {
  ABSOLUTE_PORTAL_MIN_SIZE,
  ABSOLUTE_PORTAL_MAX_SIZE
} from '../../shared';

const wrapperStyle = { margin: 20 };

interface Props {
  portalSize: number;
  updatePortalSize: (newPortalSize: number) => void;
}

export default class GeneralSettingsTab extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange = (value: number) => {
    this.props.updatePortalSize(value)
  };

  render (): JSX.Element {
    return (
      <>
        <h5>Button Size</h5>
        <div style={wrapperStyle}>
          <Slider
            min={ABSOLUTE_PORTAL_MIN_SIZE}
            max={ABSOLUTE_PORTAL_MAX_SIZE}
            value={this.props.portalSize}
            onChange={this.handleChange}
          />
        </div>
      </>
    );
  };
}
