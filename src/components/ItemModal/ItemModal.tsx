import React, { Component } from 'react';
import { Modal, ButtonGroup } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { NewPortalForm, PortalFormOptions } from '../../models/interfaces';
import { PORTAL_TYPES } from '../../models/constants';
import ConfirmRemove from '../ConfirmRemove/ConfirmRemove';
import ShortcutOptions from '../ShortcutOptions/ShortcutOptions';

interface Props {
  showModal: boolean;
  hideModal: () => void;
  removePortal: () => void;
  submitForm: (portal: NewPortalForm, options?: PortalFormOptions) =>
    Promise<string>;
  mode: 'create' | 'edit';
  initialFormValues?: NewPortalForm;
}

interface State {
  portalType: string;
}

export default class ItemModal extends Component<Props, State> {
  state: State = {
    portalType: PORTAL_TYPES[0].name
  };

  renderOptions = (): JSX.Element => {
    switch (this.state.portalType) {
    case 'shortcut':
      return (
        <ShortcutOptions
          submitForm={this.props.submitForm}
          hideModal={this.props.hideModal}
          submitLabel={this.submitLabel()}
          initialFormValues={this.props.initialFormValues ?? undefined}
        />
      );
    case 'clone':
      return (
        <ShortcutOptions
          submitForm={this.props.submitForm}
          submitFormOptions={{clone: true}}
          hideModal={this.props.hideModal}
          submitLabel={this.submitLabel()}
          initialFormValues={this.props.initialFormValues ?? undefined}
        />
      );
    case 'delete':
      return (
        <ConfirmRemove
          hideModal={this.props.hideModal}
          removePortal={this.props.removePortal}
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
      default:
        throw new Error('Invalid ItemModal mode state');
    }
  };

  submitLabel = (): string => {
    switch (this.props.mode) {
      case 'create':
        return 'Create';
      case 'edit':
        return this.state.portalType === 'clone' ? 'Clone' : 'Save';
      default:
        throw new Error('Invalid ItemModal mode state');
    }
  };

  renderCloneIfEdit = (): JSX.Element => {
    if (this.props.mode === 'edit') {
      return (
        <ToggleButton
          key={-2}
          type='radio'
          variant='secondary'
          name='portal'
          value='clone'
          checked={this.state.portalType === 'clone'}
          onChange={(event: React.ChangeEvent<any>) =>
            this.setState({
              portalType: event.currentTarget.value
            })
          }
        >
          Clone
        </ToggleButton>
      );
    }
    return <></>;
  };

  renderDeleteIfEdit = (): JSX.Element => {
    if (this.props.mode === 'edit') {
      return (
        <ToggleButton
          key={-1}
          type='radio'
          variant='danger'
          name='portal'
          value='delete'
          checked={this.state.portalType === 'delete'}
          onChange={(event: React.ChangeEvent<any>) =>
            this.setState({
              portalType: event.currentTarget.value
            })
          }
        >
          Delete
        </ToggleButton>
      );
    }
    return <></>;
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
            {PORTAL_TYPES.map((portal, i) => (
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
            {this.renderCloneIfEdit()}
            {this.renderDeleteIfEdit()}
          </ButtonGroup>
          <p />
          {this.renderOptions()}
        </Modal.Body>
      </Modal>
    );
  };
}
