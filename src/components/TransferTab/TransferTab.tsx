import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap';

export default class TransferTab extends Component {
  render (): JSX.Element {
    return (
      <>
        <h5>Transfer To Another Device</h5>
        <p>Copy the following and paste into Load on another device:</p>
        <FormControl
          as='textarea'
          style={{
            marginBottom: 12,
            fontSize: 12,
            height: '16em'
          }}
          disabled
          defaultValue={localStorage.getItem('contentsMain') ?? ''}
        />
      </>
    );
  };
}
