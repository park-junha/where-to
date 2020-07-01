import React, {
  Component
} from 'react';
import {
  Container
  , Button
  , Row
  , Col
  , Modal
} from 'react-bootstrap';

import {
  LandingPageItems
  , LandingPageItem
} from '../api';

interface Props {
  contents: LandingPageItems;
  removeWebPortal: (id: string) => void;
}

interface State {
  idToRemove: null | string;
}

export default class RemovePortal extends Component<Props, State> {
  state: State = {
    idToRemove: null
  };

  hideModal = (): void => {
    this.setState({
      idToRemove: null
    });
  };

  removePortal = (): void => {
    this.props.removeWebPortal(this.state.idToRemove ?? '');
    this.hideModal();
  };

  confirmRemove = (id: string): void => {
    this.setState({
      idToRemove: id
    });
  };

  renderItem = (item: LandingPageItem): JSX.Element => {
    const delay = '-' + Math.random().toFixed(2).substring(1) + 's';
    const duration = (Math.random() / 5 + 0.2).toFixed(2).substring(1)
      + 's';

    switch (item.type) {
    case 'webportal':
      return (
        <Button
          className='landing-button-big shake-portal'
          style={{
            animationDelay: delay
            , animationDuration: duration
          }}
          size='lg'
          variant='secondary'
          onClick={() => this.confirmRemove(item.id)}
        >
          <span>{item.title}</span>
        </Button>
      );
    default:
      return (
        <Button
          className='landing-button-big shake-portal'
          size='lg'
          variant='dark'
        >
          <span>N/A</span>
        </Button>
      )
    }
  };

  render (): JSX.Element {
    return (
      <div className='page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1 className='fadein'>Select a Portal to Remove</h1>
              <br />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col
              xs={12}
              id='portals-to-remove' 
            >
              {this.props.contents.map(
                (item) => this.renderItem(item)
              )}
            </Col>
            <Col />
          </Row>
        </Container>
        <Modal
          show={this.state.idToRemove !== null}
          onHide={this.hideModal}
        >
          <Modal.Header
            className='new-item-modal'
            closeButton
          >
            <h4>Confirm Portal Removal</h4>
          </Modal.Header>
          <Modal.Body
            className='new-item-modal'
          >
            <h6>Are you sure you want to remove this portal?</h6>
            <p>You cannot undo this action!</p>
            <Button
              variant='danger'
              className='horiz-spaced-buttons'
              onClick={this.removePortal}
            >
              Yes
            </Button>
            <Button
              variant='dark'
              className='horiz-spaced-buttons'
              onClick={this.hideModal}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
