import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

import {
  LandingPageItems,
  LandingPageItem
} from '../../models/interfaces';
import calculatePortalStyles from '../../utils/calculatePortalStyles';
import Shortcut from '../Shortcut/Shortcut';

interface Props {
  nofade?: boolean;
  portalSize: number;
  contents: LandingPageItems;
  switchComponent: (newComponent: string) => void;
}

export default class LandingPage extends Component<Props> {
  renderItem = (item: LandingPageItem): JSX.Element => {
    switch (item.type) {
    case 'shortcut':
    case 'webportal': // For backwards compatibility
      return (
        <Shortcut
          key={item.id}
          item={item}
          size={this.props.portalSize}
          switchComponent={this.props.switchComponent}
        />
      );
    default:
      return (
        <Button
          key={item.id}
          className='landing-button-big'
          style={calculatePortalStyles(this.props.portalSize)}
          size='lg'
          variant='dark'
          disabled
        >
          <span>N/A</span>
        </Button>
      )
    }
  };

  render (): JSX.Element {
    return (
      <div className={this.props.nofade ?
        'page-padding' :
        'fadein page-padding'}>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1 className={this.props.nofade
                ? 'fadein'
                : ''}>
                Where To?
              </h1>
              <br />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col xs={12}>
              {this.props.contents.map(
                (item) => this.renderItem(item)
              )}
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
