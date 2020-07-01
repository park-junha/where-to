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
} from '../api';

interface Props {
  showModal: boolean;
  hideModal: () => void;
  createNewWebPortal: (portal: NewPortalForm) => void;
}

interface State {
  portalType: string;
}

interface NewWebPortalOptionsState {
  title: string;
  url: string;
}

interface NewWebPortalOptionsProps {
  createNewWebPortal: (portal: NewPortalForm) => void;
}

export default class NewItemModal extends Component<Props, State> {
  state: State = {
    portalType: PORTALS[0].name ?? 'N/A'
  };

  renderOptions = (): JSX.Element => {
    switch(this.state.portalType) {
    case 'webportal':
      return (
        <NewWebPortalOptions
          createNewWebPortal={this.props.createNewWebPortal}
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
          <h4>Add New Portal</h4>
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

class NewWebPortalOptions extends Component<NewWebPortalOptionsProps
  , NewWebPortalOptionsState> {
  constructor(props: NewWebPortalOptionsProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  state: NewWebPortalOptionsState = {
    title: ''
    , url: ''
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
            onClick={() => this.props.createNewWebPortal({
              title: this.state.title
              , type: 'webportal'
              , url: this.state.url
            })}
          >
            Create
          </Button>
        </Form>
      </div>
    );
  };
}
