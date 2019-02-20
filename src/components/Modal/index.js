// Libraries
import React from 'react';
import { Modal as SemanticModal } from 'semantic-ui-react';

class Modal extends React.Component {
  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { width, trigger, children } = this.props;
    const { isOpen } = this.state;

    return (
      <SemanticModal
        closeIcon
        open={isOpen}
        centered={false}
        trigger={trigger({ handleOpen: this.handleOpen })}
        children={children({ handleClose: this.handleClose })}
        onClose={this.handleClose}
        style={{ width }}
      />
    );
  }
}

export default Modal;
