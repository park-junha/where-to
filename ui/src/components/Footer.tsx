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

export default class Footer extends Component<{}, {}> {
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
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            <Nav.Item>
              <Button
                variant='dark'
                className='footer-button'
              >
                <IoLogoGithub className='footer-ioicon' />
              </Button>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}
