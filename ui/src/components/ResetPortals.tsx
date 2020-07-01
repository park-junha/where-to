import React, {
  Component
} from 'react';
import {
  Button
  , Modal
} from 'react-bootstrap';

interface Props {
  showModal: boolean;
  hideModal: () => void;
  resetPortals: () => void;
}

export default class ResetPortals extends Component<Props> {
  confirmReset = (): void => {
    this.props.resetPortals();
    this.props.hideModal();
  };

  render (): JSX.Element {
    return (
      <div className='page-padding'>
        <Modal
          show={this.props.showModal}
          onHide={this.props.hideModal}
        >
          <Modal.Header
            className='new-item-modal'
            closeButton
          >
            <h4>Confirm Reset</h4>
          </Modal.Header>
          <Modal.Body
            className='new-item-modal'
          >
            <h6>Are you sure you want to reset all portals?</h6>
            <p>You cannot undo this action!</p>
            <Button
              variant='danger'
              className='horiz-spaced-buttons'
              onClick={this.props.resetPortals}
            >
              Yes
            </Button>
            <Button
              variant='dark'
              className='horiz-spaced-buttons'
              onClick={this.props.hideModal}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
