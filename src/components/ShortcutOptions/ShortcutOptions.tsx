import React, { Component } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { NewPortalForm, PortalFormOptions } from '../../models/interfaces';

interface Props {
  submitForm: (portal: NewPortalForm, options?: PortalFormOptions) =>
    Promise<string>;
  submitFormOptions?: PortalFormOptions;
  submitLabel: string;
  hideModal: () => void;
  initialFormValues?: NewPortalForm;
}

interface State {
  title: string;
  url: string;
  submitError: string;
}

export default class ShortcutOptions extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  state: State = {
    title: '',
    url: '',
    submitError: ''
  };

  componentDidMount(): void {
    if (this.props.initialFormValues && ['shortcut', 'webportal'].includes(
        this.props.initialFormValues.type)) {
      this.setState((prevState, prevProps) => ({
        title: prevProps?.initialFormValues?.title ?? '',
        url: prevProps?.initialFormValues?.url ?? ''
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
      */
  };

  submitForm = (): void => {
    this.props.submitForm({
      title: this.state.title,
      type: 'shortcut',
      url: this.state.url
    }, this.props.submitFormOptions)
    .then(() => {
      this.props.hideModal();
    })
    .catch((err) => {
      this.setState(prevState => ({
        ...prevState,
        submitError: err
      }));
    });
  };

  render (): JSX.Element {
    return (
      <div>
        <h5>Configure Shortcut</h5>
        <Form>
          <Form.Group controlId='formPortalTitle'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder='Enter name'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId='formPortalUrl'>
            <Form.Label>URL</Form.Label>
            <Form.Control
              placeholder='Enter URL'
              name='url'
              value={this.state.url}
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
