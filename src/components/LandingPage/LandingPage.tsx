import React, { Component } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

import WebPortal from '../WebPortal/WebPortal';
import { LandingPageItems, LandingPageItem } from '../../shared';

interface Props {
  nofade?: boolean;
  contents: LandingPageItems;
  switchComponent: (newComponent: string) => void;
}

export default class LandingPage extends Component<Props> {
  renderItem = (item: LandingPageItem): JSX.Element => {
    switch (item.type) {
    case 'webportal':
      return (
        <WebPortal
          key={item.id}
          item={item}
          switchComponent={this.props.switchComponent}
        />
      );
    case 'folder':
      return (
        <Button
          key={item.id}
          className='landing-button-big'
          size='lg'
          variant='dark'
          disabled
        >
          <span>implement me!</span>
        </Button>
      );
    default:
      return (
        <Button
          key={item.id}
          className='landing-button-big'
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
