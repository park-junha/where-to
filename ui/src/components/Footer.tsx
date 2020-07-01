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
  AiOutlinePlus
} from 'react-icons/ai';
import {
  BsTrash
} from 'react-icons/bs';
import {
  RiArrowGoBackLine
} from 'react-icons/ri';

interface Props {
  currentComponent: string;
  showNewItemModal: () => void;
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
                onClick={() => this.props.showNewItemModal()}
              >
                <AiOutlinePlus />
              </Button>
            </Nav.Item>
            <Nav.Item>
              {this.props.currentComponent === 'RemovePortals' ? (
                <Button
                  variant='secondary'
                  className='footer-button'
                  onClick={() =>
                    this.props.switchComponent('LandingPageNoFade')}
                >
                  <RiArrowGoBackLine />
                </Button>
              ) : (
                <Button
                  variant='dark'
                  className='footer-button'
                  onClick={() =>
                    this.props.switchComponent('RemovePortals')}
                >
                  <BsTrash />
                </Button>
              )}
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
