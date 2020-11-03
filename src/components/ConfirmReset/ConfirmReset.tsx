import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

interface Props {
  hideModal: () => void;
  resetPortals: () => void;
}

export default class ConfirmReset extends Component<Props> {
  render (): JSX.Element {
    return (
      <>
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
      </>
    );
  };
}
