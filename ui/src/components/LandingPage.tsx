import React, {
  Component
} from 'react';
import {
  Container
  , Button
  , Row
  , Col
} from 'react-bootstrap';

import WebPortal from './WebPortal';
import {
  LandingPageLayout
  , LandingPageItem
} from '../interfaces';

interface Props {
  contents: LandingPageLayout;
}

export default class LandingPage extends Component<Props> {
  renderItem = (item: LandingPageItem): JSX.Element => {
    switch (item.type) {
    case 'webportal':
      return (
        <WebPortal
          item={item}
        />
      );
    default:
      return (
        <Button
          className='landing-button-big'
          size='lg'
          variant='dark'
          disabled
        >
          <span>N/A</span>
        </Button>
      )
    }
  }

  render (): JSX.Element {
    return (
      <div className='fadein page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1>Where To?</h1>
              <br />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col xs={12}>
              <div>
                {this.props.contents.map((contentRow) => (
                  <div>
                    {contentRow.map((item) => this.renderItem(item))}
                  </div>
                ))}
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
