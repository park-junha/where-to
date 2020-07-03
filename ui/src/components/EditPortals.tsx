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
  DragDropContext
  , Droppable
  , Draggable
} from 'react-beautiful-dnd';

import {
  LandingPageItems
} from '../shared';
import DraggablePortals from './DraggablePortals';
import DraggablePortal from './DraggablePortal';

interface Props {
  contents: LandingPageItems;
  removeWebPortal: (id: string) => void;
}

interface State {
  idToRemove: null | string;
}

export default class EditPortals extends Component<Props, State> {
  state: State = {
    idToRemove: null
  };

  hideModal = (): void => {
    this.setState({
      idToRemove: null
    });
  };

  removePortal = (): void => {
    this.props.removeWebPortal(this.state.idToRemove ?? '');
    this.hideModal();
  };

  confirmRemove = (id: string): void => {
    this.setState({
      idToRemove: id
    });
  };

  render (): JSX.Element {
    return (
      <div className='page-padding'>
        <Container>
          <Row>
            <Col />
            <Col xs={12}>
              <h1 className='fadein'>Select a Portal to Remove</h1>
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
              <DragDropContext
                onDragEnd={() => console.log(this.props.contents)}
              >
                <Droppable droppableId='yeet'>
                  {provided => (
                    <DraggablePortals
                      provided={provided}
                      innerRef={provided.innerRef}
                    >
                      {this.props.contents.map((item, index) =>
                        <Draggable
                          draggableId={item.id}
                          index={index}
                        >
                          {provided => (
                            <DraggablePortal
                              item={item}
                              provided={provided}
                              innerRef={provided.innerRef}
                              removeWebPortal={this.props.removeWebPortal}
                              confirmRemove={this.confirmRemove}
                            />
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </DraggablePortals>
                  )}
                </Droppable>
              </DragDropContext>
            </Col>
            <Col />
          </Row>
        </Container>
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
