import React, {
  Component
} from 'react';
import {
  Button
} from 'react-bootstrap';

/*  TODO: Convert to TypeScript

 *  import {
 *    LandingPageItem
 *  } from '../shared';
   
 *  interface Props {
 *    item: LandingPageItem;
 *    provided: any;  //  TODO: use proper type
 *    innerRef: any;  //  TODO: use proper type
 *    removeWebPortal: (id: string) => void;
 *    confirmRemove: (id: string) => void;
 *  }
   
 *  export default class DraggablePortal extends Component<Props> {
 *  render (): JSX.Element {

 */

export default class DraggablePortal extends Component {
  render () {
    const {
      item
      , provided
      , innerRef
    } = this.props;

    const delay = '-' + Math.random().toFixed(2).substring(1) + 's';
    const duration = (Math.random() / 5 + 0.2).toFixed(2).substring(1)
      + 's';

    switch (item.type) {
    case 'webportal':
      return (
        <span
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={innerRef}
        >
          <Button
            className='landing-button-big shake-portal'
            style={{
              animationDelay: delay
              , animationDuration: duration
            }}
            size='lg'
            variant='secondary'
            onClick={() =>
              this.props.confirmRemove(item.id)}
          >
            <span>{item.title}</span>
          </Button>
        </span>
      );
    default:
      return (
        <span
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={innerRef}
        >
          <Button
            className='landing-button-big shake-portal'
            style={{
              animationDelay: delay
              , animationDuration: duration
            }}
            size='lg'
            variant='dark'
            onClick={() => this.props.removeWebPortal(item.id)}
          >
            <span>N/A</span>
          </Button>
        </span>
      );
    }
  };
}
