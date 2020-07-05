import React, {
  Component
} from 'react';
import {
  Container
  , Row
  , Col
  , Spinner
} from 'react-bootstrap';

export default class LoadingPage extends Component {
  render (): JSX.Element {
    return (
      <div className='page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1 className='fadein'>
                Loading...
              </h1>
              <br />
              <div className='fadein spinner centered'>
                <Spinner animation='border' variant='light'>
                  <span className='sr-only'>Loading...</span>
                </Spinner>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  };
}
