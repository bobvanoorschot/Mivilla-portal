import React from "react";
import Icon from "../../icons/info.svg";
import Modal from "../formParts/Modal";

class Description extends React.Component {
  render() {
    const { description } = this.props;

    let val = <span />;
    if (description) {
      val = (
        <span style={{
            padding: "0 0 0 8px"
        }}>
          <Modal buttonText={<Icon />}>
            <p>{description}</p>
          </Modal>
        </span>
      );
    }
    return val;
  }
}

export default Description;
