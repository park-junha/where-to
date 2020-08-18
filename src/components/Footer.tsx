import React, { Component } from 'react';
import {
  Nav
  , Navbar
  , Button
//, Dropdown
} from 'react-bootstrap';
import {
  IoLogoGithub
} from 'react-icons/io';
import {
  FiEdit
, FiPlus
} from 'react-icons/fi';
import {
  FcCancel
} from 'react-icons/fc';
import {
  GrPowerReset
} from 'react-icons/gr';

interface Props {
  currentComponent: string;
  showItemModal: () => void;
  showResetModal: () => void;
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
                  onClick={() =>
                    this.props.switchComponent('LandingPageNoFade')}
                >
                  <FcCancel />
                </Button>
              ) : (
                <Button
                  variant='dark'
                  className='footer-button'
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
                onClick={() => this.props.showResetModal()}
              >
                <GrPowerReset
                  style={{
                    filter: 'invert(100%)'
                  }}
                />
              </Button>
            </Nav.Item>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Nav.Item>
              <a
                href='https://github.com/park-junha/WhereTo'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button
                  variant='dark'
                  className='footer-button'
                >
                  <IoLogoGithub className='footer-ioicon' />
                </Button>
              </a>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}
