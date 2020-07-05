import React, {
  Component
} from 'react';
import {
  Modal
  , Button
  , ButtonGroup
  , Form
} from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';

import {
  NewPortalForm
  , PORTALS
} from '../shared';

interface Props {
  showModal: boolean;
  hideModal: () => void;
  submitForm: (portal: NewPortalForm) => void;
  mode: string;
  initialFormValues?: NewPortalForm;
}

interface State {
  portalType: string;
}

interface WebPortalOptionsState {
  title: string;
  url: string;
}

interface WebPortalOptionsProps {
  submitForm: (portal: NewPortalForm) => void;
  submitLabel: string;
  hideModal: () => void;
  initialFormValues?: NewPortalForm;
}

export default class ItemModal extends Component<Props, State> {
  state: State = {
    portalType: PORTALS[0].name ?? 'N/A'
  };

  renderOptions = (): JSX.Element => {
    switch (this.state.portalType) {
    case 'webportal':
      return (
        <WebPortalOptions
          submitForm={this.props.submitForm}
          hideModal={this.props.hideModal}
          submitLabel={this.submitLabel()}
          initialFormValues={this.props.initialFormValues ?? undefined}
        />
      );
    default:
      return (
        <div>
          Sorry. We don&#39;t support that yet.
        </div>
      );
    }
  };

  renderHeader = (): JSX.Element => {
    switch (this.props.mode) {
      case 'create':
        return <h4>Add New Portal</h4>;
      case 'edit':
        return <h4>Edit Portal</h4>;
      //  should never get to this point
      default:
        return <h4>Portal Modal</h4>;
    }
  };

  submitLabel = (): string => {
    switch (this.props.mode) {
      case 'create':
        return 'Create';
      case 'edit':
        return 'Edit';
      //  should never get to this point
      default:
        return 'Submit';
    }
  };

  render (): JSX.Element {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.hideModal}
      >
        <Modal.Header
          className='new-item-modal'
          closeButton
        >
          {this.renderHeader()}
        </Modal.Header>
        <Modal.Body
          className='new-item-modal'
        >
          <h5>Select Portal Type:</h5>
          <ButtonGroup
            toggle
          >
            {/* TODO: replace 'any' below with proper type */}
            {PORTALS.map((portal, i) => (
              <ToggleButton
                key={i}
                type='radio'
                variant='secondary'
                name='portal'
                value={portal.name}
                checked={this.state.portalType === portal.name}
                onChange={(event: React.ChangeEvent<any>) =>
                  this.setState({
                    portalType: event.currentTarget.value
                  })
                }
              >
                {portal.title}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <p />
          {this.renderOptions()}
        </Modal.Body>
      </Modal>
    );
  };
}

class WebPortalOptions extends Component<WebPortalOptionsProps
  , WebPortalOptionsState> {
  constructor(props: WebPortalOptionsProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  state: WebPortalOptionsState = {
    title: ''
    , url: ''
  };

  componentDidMount(): void {
    if (this.props.initialFormValues &&
        this.props.initialFormValues.type === 'webportal') {
      this.setState((prevState, prevProps) => ({
        //  TODO: find a better way to handle potential undefined props?
        title: prevProps?.initialFormValues?.title ?? ''
        , url: prevProps?.initialFormValues?.url ?? ''
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
      title: this.state.title
      , type: 'webportal'
      , url: this.state.url
    });
    this.props.hideModal();
  };

  render (): JSX.Element {
    return (
      <div>
        <h5>Configure Web Portal</h5>
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
              placeholder='Enter URL of portal destination'
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
      </div>
    );
  };
}
