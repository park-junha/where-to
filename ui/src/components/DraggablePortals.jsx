import React, {
  Component
} from 'react';

//  TODO: Convert to TypeScript
export default class DraggablePortals extends Component {
  render () {
    const { provided, innerRef, children } = this.props;
    return (
      <div
        {...provided.droppableProps}
        ref={innerRef}
      >
        {children}
      </div>
    );
  };
}
