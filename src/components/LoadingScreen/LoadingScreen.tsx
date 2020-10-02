import React, {
  Component
} from 'react';
import { Spinner } from 'react-bootstrap';

export default class LoadingScreen extends Component {
  render () {
    return (
      <div
        className='fadein spinner centered'
      >
        <Spinner animation='border' variant='light'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    );
  };
}
