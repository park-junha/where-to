import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';

interface State {
  contents: string;
  copied: boolean;
}

export default class TransferTab extends Component<{}, State> {
  state: State = {
    contents: localStorage.getItem('contentsMain') ?? '',
    copied: false
  };

  copyToClipboard = (): void => {
    navigator.clipboard.writeText(this.state.contents).then(() => {
      this.setState({
        copied: true
      });
    });
  };

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
          defaultValue={this.state.contents}
        />
        <span>
          <Button
            variant='primary'
            className='horiz-spaced-buttons'
            id='transfer-tab-copy-label'
            onClick={this.copyToClipboard}
          >
            Copy to Clipboard
          </Button>
          <span
            id='transfer-tab-copied-label'
            style={{
              display: this.state.copied ? 'inline' : 'none'
            }}
          >
            Copied!
          </span>
        </span>
      </>
    );
  };
}
