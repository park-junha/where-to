import React, { Component } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { FiEdit, FiPlus, FiSettings } from 'react-icons/fi';
import { FcCancel } from 'react-icons/fc';
import { VERSION } from '../../shared';

interface Props {
  currentComponent: string;
  showItemModal: () => void;
  showSettingsModal: () => void;
  switchComponent: (newComponent: string) => void;
}

export default class Footer extends Component<Props, {}> {
  render () {
    return (
      <div>
        <Navbar
          className='footer-custom'
          fixed='bottom'
          bg='dark'
          variant='dark'
        >
          <Nav className='justify-content-left'>
            <Nav.Item>
              <Button
                variant='dark'
                className='footer-button'
                data-testid='footer-button-add'
                disabled={
                  this.props.currentComponent === 'LandingPage' ||
                  this.props.currentComponent === 'LandingPageNoFade' ?
                  false : true
                }
                onClick={() => this.props.showItemModal()}
              >
                <FiPlus />
              </Button>
            </Nav.Item>
            <Nav.Item>
              {this.props.currentComponent === 'EditPortals' ? (
                <Button
                  variant='secondary'
                  className='footer-button'
                  data-testid='footer-button-cancel-edit'
                  onClick={() =>
                    this.props.switchComponent('LandingPageNoFade')}
                >
                  <FcCancel />
                </Button>
              ) : (
                <Button
                  variant='dark'
                  className='footer-button'
                  data-testid='footer-button-edit'
                  disabled={
                    this.props.currentComponent === 'LoadWebsite' ?
                    true : false
                  }
                  onClick={() =>
                    this.props.switchComponent('EditPortals')}
                >
                  <FiEdit />
                </Button>
              )}
            </Nav.Item>
            <Nav.Item>
              <Button
                variant='dark'
                className='footer-button'
                data-testid='footer-button-reset'
                onClick={() => this.props.showSettingsModal()}
              >
                <FiSettings />
              </Button>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Nav.Item>
              <a
                href='https://github.com/park-junha/WhereTo'
                target='_blank'
                rel='noopener noreferrer'
                id='footer-version'
                data-testid='footer-button-source-code'
              >
                {VERSION}
              </a>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}
