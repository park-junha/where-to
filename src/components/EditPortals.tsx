import React, {
  Component
} from 'react';
import {
  Container
  , Button
  , Row
  , Col
  , Modal
} from 'react-bootstrap';
import {
  ReactSortable
} from 'react-sortablejs';

import {
  LandingPageItems
  , NewPortalForm
} from '../shared';
import SortablePortal from './SortablePortal';
import ItemModal from './ItemModal';

interface Props {
  contents: LandingPageItems;
  editPortals: (newPortals: LandingPageItems) => void;
  editPortal: (idToEdit: string, portal: NewPortalForm) => void;
  removePortal: (id: string) => void;
}

interface State {
  idToRemove: null | string;
  idToEdit: null | string;
}

export default class EditPortals extends Component<Props, State> {
  state: State = {
    idToRemove: null
    , idToEdit: null
  };

  hideItemModal = (): void => {
    this.setState({
      idToEdit: null
    });
  };

  openEditModal = (id: string): void => {
    this.setState({
      idToEdit: id
    });
  };

  hideModal = (): void => {
    this.setState({
      idToEdit: null
    });
  };

  removePortal = (): void => {
    this.props.removePortal(this.state.idToEdit ?? '');
    this.hideModal();
  };

  confirmRemove = (id: string): void => {
    this.setState({
      idToEdit: id
    });
  };

  editPortal = (portal: NewPortalForm): void => {
    this.props.editPortal(this.state.idToEdit ?? '', portal);
    this.hideItemModal();
  };

  render (): JSX.Element {
    return (
      <div className='page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1 className='fadein'>Reorder or Remove Portals</h1>
              <br />
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col
              xs={12}
              id='portals-to-remove' 
            >
              <ReactSortable
                animation={200}
                list={this.props.contents}
                setList={newState => this.props.editPortals(newState)}
              >
                {this.props.contents.map(item => (
                  <div style={{display: 'inline-block'}}>
                    <SortablePortal
                      item={item}
                      removePortal={this.props.removePortal}
                      confirmRemove={this.confirmRemove}
                      openEditModal={this.openEditModal}
                    />
                  </div>
                ))}
              </ReactSortable>
            </Col>
            <Col />
          </Row>
        </Container>
        <ItemModal
          showModal={this.state.idToEdit !== null}
          hideModal={this.hideItemModal}
          removePortal={this.removePortal}
          submitForm={this.editPortal}
          mode='edit'
          initialFormValues={
            this.props.contents[this.props.contents.findIndex(i =>
              i.id === this.state.idToEdit)]
          }
        />
        <Modal
          show={this.state.idToRemove !== null}
          onHide={this.hideModal}
        >
          <Modal.Header
            className='new-item-modal'
            closeButton
          >
            <h4>Confirm Portal Removal</h4>
          </Modal.Header>
          <Modal.Body
            className='new-item-modal'
          >
            <h6>Are you sure you want to remove this portal?</h6>
            <p>You cannot undo this action!</p>
            <Button
              variant='danger'
              className='horiz-spaced-buttons'
              onClick={this.removePortal}
            >
              Yes
            </Button>
            <Button
              variant='dark'
              className='horiz-spaced-buttons'
              onClick={this.hideModal}
            >
              Cancel
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  };
}
