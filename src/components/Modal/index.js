import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

class Modal extends Component {
  state = {
    visible: this.props.show,
  };

  setVisible(visible) {
    this.setState({ visible: visible });
  }

  render() {
    const { children, buttonText } = this.props;

    const { visible } = this.state;
    if (!visible) {
      return (
        <a className="info-button" onClick={() => this.setVisible(true)}>
          {buttonText}
        </a>
      );
    }

    return (
      <div className="bukazu-modal-container">
        <div className="bukazu-modal-container-inner">
          <div
            className="bukazu-modal-escape"
            onClick={() => this.setVisible(false)}
          ></div>
          <div className="bukazu-modal">
            <div className="bukazu-modal-content">{children}</div>

            <div className="bukazu-modal-footer">
              <a onClick={() => this.setVisible(false)}>
                <FormattedMessage id="close" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  show: false,
};

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
  buttonText: PropTypes.node,
};

export default Modal;
