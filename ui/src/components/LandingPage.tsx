import React, {
  Component
} from 'react';
import {
  Container
  , Button
  , Row
  , Col
} from 'react-bootstrap';

export default class LandingPage extends Component {
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
                <div>
                  <Button
                    className='landing-button-big'
                    size='lg'
                    variant='secondary'
                  >
                    Leetcode
                  </Button>
                  <Button
                    className='landing-button-big'
                    size='lg'
                    variant='secondary'
                  >
                    Netflix
                  </Button>
                </div>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
