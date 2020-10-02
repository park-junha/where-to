import React, {
  Component
} from 'react';
import {
  Button
} from 'react-bootstrap';
import { LandingPageItem } from '../../shared';

interface Props {
  item: LandingPageItem;
  switchComponent: (newComponent: string) => void;
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
          onClick={() => this.props.switchComponent('LoadWebsite')}
        >
          <span>{this.props.item.title}</span>
        </Button>
      </a>
    );
  };
}
