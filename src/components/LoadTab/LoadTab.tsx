import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';

interface Props {
  loadContents: () => void;
}

interface State {
  contentsToLoad: string;
}

export default class LoadTab extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  state: State = {
    contentsToLoad: ''
  };

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    } as any); /*
      * NOTE:
      * 'as any' is a workaround for TS2345 error
      *
      * see also:
      * https://stackoverflow.com/questions/46361905/property-is-missing-in-type-x-string-string
      */
  };

  submitForm = (): void => {
    localStorage.setItem('contentsMain', this.state.contentsToLoad);
    this.props.loadContents();
  };

  render (): JSX.Element {
    return (
      <>
        <h5>Load From Another Device</h5>
        <p>Load copied data from another device:</p>
        <FormControl
          as='textarea'
          style={{
            marginBottom: 12,
            fontSize: 12,
            height: '16em'
          }}
          name='contentsToLoad'
          value={this.state.contentsToLoad}
          onChange={this.handleChange}
        />
        <Button
          variant='primary'
          className='horiz-spaced-buttons'
          onClick={this.submitForm}
        >
          Load Data
        </Button>
      </>
    );
  };
}
