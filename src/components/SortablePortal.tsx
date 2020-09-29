import React, {
  Component
} from 'react';
import {
  Button
} from 'react-bootstrap';

import {
  LandingPageItem
} from '../shared';

interface Props {
  item: LandingPageItem;
  confirmRemove: (id: string) => void;
  openEditModal: (id: string) => void;
}

export default class SortablePortal extends Component<Props> {
  //  TODO: Render Edit modal with DELETE only for N/A portals
  render (): JSX.Element {
    const delay = '-' + Math.random().toFixed(2).substring(1) + 's';
    const duration = (Math.random() / 5 + 0.2).toFixed(2).substring(1)
      + 's';

    switch (this.props.item.type) {
    case 'webportal':
      return (
        <span
          key={this.props.item.id}
        >
          <Button
            className='landing-button-big shake-portal'
            style={{
              animationDelay: delay
              , animationDuration: duration
            }}
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
            style={{
              animationDelay: delay
              , animationDuration: duration
            }}
            size='lg'
            variant='dark'
          >
            <span>N/A</span>
          </Button>
        </span>
      );
    }
  };
}
