import React, {
  Component
} from 'react';
import {
  Button
} from 'react-bootstrap';

interface Props {
  removePortal: () => void;
  hideModal: () => void;
}

export default class ConfirmRemove extends Component<Props> {
  render (): JSX.Element {
    return (
      <div>
        <h6>Are you sure you want to remove this portal?</h6>
        <p>You cannot undo this action!</p>
        <Button
          variant='danger'
          className='horiz-spaced-buttons'
          onClick={this.props.removePortal}
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
      </div>
    );
  };
}
