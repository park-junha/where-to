import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { FolderForm } from '../../shared';

interface Props {
  submitForm: (portal: FolderForm) => Promise<string>;
  submitLabel: string;
  hideModal: () => void;
  initialFormValues?: FolderForm;
}

interface State {
  title: string;
  submitError: string;
}

export default class FolderOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  state: State = {
    title: '',
    submitError: ''
  };

  componentDidMount(): void {
    if (this.props.initialFormValues &&
        this.props.initialFormValues.type === 'folder') {
      this.setState((prevState, prevProps) => ({
        //  TODO: find a better way to handle potential undefined props?
        title: prevProps?.initialFormValues?.title ?? ''
      }));
    }
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
      *
      * TODO:
      * Find a better workaround if possible
      */
  };

  submitForm = (): void => {
    this.props.submitForm({
      title: this.state.title,
      type: 'folder'
    })
    .then(() => {
      this.props.hideModal();
    })
    .catch((err) => {
      this.setState(prevState => ({
        ...prevState,
        submitError: err
      }));
      console.error(err);
    });
  };

  render (): JSX.Element {
    return (
      <div>
        <h5>Configure Folder</h5>
        <Form>
          <Form.Group controlId='formPortalTitle'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder='Enter folder name'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant='primary'
            className='horiz-spaced-buttons'
            onClick={this.submitForm}
          >
            {this.props.submitLabel}
          </Button>
          <Button
            variant='dark'
            className='horiz-spaced-buttons'
            onClick={this.props.hideModal}
          >
            Cancel
          </Button>
        </Form>
        <Alert
          id='item-modal-alert'
          show={this.state.submitError !== ''}
          variant='danger'
        >
          {this.state.submitError}
        </Alert>
      </div>
    );
  };
}
