import React, {
  Component
} from 'react';
import {
  Button
} from 'react-bootstrap';
import { LandingPageItem } from '../api';

interface Props {
  item: LandingPageItem;
}

export default class WebPortal extends Component<Props> {
  render (): JSX.Element {
    return (
      <a
        href={this.props.item.url}
      >
        <Button
          className='landing-button-big'
          size='lg'
          variant='secondary'
        >
          <span>{this.props.item.title}</span>
        </Button>
      </a>
    );
  };
}
