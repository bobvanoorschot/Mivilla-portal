import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

function Modal({ show, children, buttonText }) {
  const [visible, setVisible] = useState(show);
  if (!visible) {
    return (
      <a className="info-button" onClick={() => setVisible(true)}>
        {buttonText}
      </a>
    );
  }

  return (
    <div className="bukazu-modal-container">
      <div className="bukazu-modal-container-inner">
        <div className="bukazu-modal-escape"onClick={() => setVisible(false)} ></div>
        <div className="bukazu-modal">
          <div className="bukazu-modal-content">{children}</div>

          <div className="bukazu-modal-footer">
            <a onClick={() => setVisible(false)}>
              <FormattedMessage id="close" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
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
