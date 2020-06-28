import React, {
  Component
} from 'react';
import {
  Container
  , Button
  , Row
  , Col
} from 'react-bootstrap';
import { LandingPageLayout } from '../interfaces';

interface Props {
  contents: LandingPageLayout;
}

export default class LandingPage extends Component<Props> {
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
                    {contentRow.map((content) => (
                      <a
                        href={content.url}
                      >
                        <Button
                          className='landing-button-big'
                          size='lg'
                          variant='secondary'
                        >
                          <span>{content.title}</span>
                        </Button>
                      </a>
                    ))}
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
