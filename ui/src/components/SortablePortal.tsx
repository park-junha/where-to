import React, {
  Component
} from 'react';
import {
  Button
  , Popover
  , OverlayTrigger
} from 'react-bootstrap';

import {
  LandingPageItem
} from '../shared';

interface Props {
  item: LandingPageItem;
  removePortal: (id: string) => void;
  confirmRemove: (id: string) => void;
  openEditModal: (id: string) => void;
}

export default class SortablePortal extends Component<Props> {
  //  TODO: find proper type for props
  editOptions = (props: any): JSX.Element => {
    return (
      <Popover
        {...props}
      >
        <Popover.Content
          style={{backgroundColor: 'rgba(0,0,0,0.8)'}}
        >
          <Button
            className='horiz-spaced-buttons'
            variant='primary'
            onClick={() => this.props.openEditModal(this.props.item.id)}
          >
            Edit
          </Button>
          <Button
            className='horiz-spaced-buttons'
            variant='danger'
            onClick={() => this.props.confirmRemove(this.props.item.id)}
          >
            Delete
          </Button>
        </Popover.Content>
      </Popover>
    );
  }

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
          <OverlayTrigger
            placement='top'
            delay={{
              show: 250
              , hide: 450
            }}
            overlay={this.editOptions}
          >
            <Button
              className='landing-button-big shake-portal'
              style={{
                animationDelay: delay
                , animationDuration: duration
              }}
              size='lg'
              variant='secondary'
            >
              <span>{this.props.item.title}</span>
            </Button>
          </OverlayTrigger>
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
            onClick={() => this.props.removePortal(this.props.item.id)}
          >
            <span>N/A</span>
          </Button>
        </span>
      );
    }
  };
}
