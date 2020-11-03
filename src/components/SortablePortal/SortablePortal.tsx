import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { LandingPageItem, calculatePortalStyles } from '../../shared';

interface Props {
  item: LandingPageItem;
  size: number;
  confirmRemove: (id: string) => void;
  openEditModal: (id: string) => void;
  removePortal: (id: string) => void;
}

export default class SortablePortal extends Component<Props> {
  render (): JSX.Element {
    const delay = '-' + Math.random().toFixed(2).substring(1) + 's';
    const duration = (Math.random() / 5 + 0.2).toFixed(2).substring(1)
      + 's';

    switch (this.props.item.type) {
    case 'shortcut':
    case 'webportal': // For backwards compatibility
      return (
        <span
          key={this.props.item.id}
        >
          <Button
            className='landing-button-big shake-portal'
            style={Object.assign({
              animationDelay: delay,
              animationDuration: duration
            }, calculatePortalStyles(this.props.size))}
            size='lg'
            variant='secondary'
            onClick={() => this.props.openEditModal(this.props.item.id)}
          >
            <span>{this.props.item.title}</span>
          </Button>
        </span>
      );
    default:
      return (
        <span
          key={this.props.item.id}
        >
          <Button
            className='landing-button-big shake-portal'
            style={Object.assign({
              animationDelay: delay,
              animationDuration: duration
            }, calculatePortalStyles(this.props.size))}
            size='lg'
            variant='dark'
            onClick={() => this.props.removePortal(this.props.item.id)}
          >
            <span>N/A</span>
          </Button>
        </span>
      );
    }
  };
}
