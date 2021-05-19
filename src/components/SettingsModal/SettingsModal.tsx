import React, { Component } from 'react';
import { Modal, ButtonGroup, ToggleButton } from 'react-bootstrap';

import ConfirmReset from '../ConfirmReset/ConfirmReset';
import GeneralSettingsTab from '../GeneralSettingsTab/GeneralSettingsTab';
import TransferTab from '../TransferTab/TransferTab';
import LoadTab from '../LoadTab/LoadTab';
import { SETTINGS_TABS } from '../../models/constants';

interface Props {
  showModal: boolean;
  hideModal: () => void;
  portalSize: number;
  updatePortalSize: (newPortalSize: number) => void;
  loadContents: () => void;
  resetPortals: () => void;
}

interface State {
  currentTab: 'general' | 'transfer' | 'load' | 'reset';
}

export default class SettingsModal extends Component<Props, State> {
  state: State = {
    currentTab: 'general' // SETTINGS_TABS[0].name
  };

  renderOptions = (): JSX.Element => {
    switch (this.state.currentTab) {
    case 'general':
      return (
        <GeneralSettingsTab
          portalSize={this.props.portalSize}
          updatePortalSize={this.props.updatePortalSize}
        />
      );
    case 'transfer':
      return <TransferTab/>;
    case 'load':
      return (
        <LoadTab
          loadContents={this.props.loadContents}
        />
      );
    case 'reset':
      return (
        <ConfirmReset
          hideModal={this.props.hideModal}
          resetPortals={this.props.resetPortals}
        />
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
          <h4>Settings</h4>
        </Modal.Header>
        <Modal.Body
          className='new-item-modal'
        >
          <ButtonGroup
            toggle
          >
            {SETTINGS_TABS.map((setting, i) => (
              <ToggleButton
                key={i}
                type='radio'
                variant='secondary'
                name='setting'
                value={setting.name}
                checked={this.state.currentTab === setting.name}
                onChange={(event: React.ChangeEvent<any>) =>
                  this.setState({
                    currentTab: event.currentTarget.value
                  })
                }
              >
                {setting.title}
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
