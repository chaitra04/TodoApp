/*
 * Project          : Radius
 * Module           : Common
 * Source filename  : Modal.jsx
 * Description      : This defines Modal component.
 * Copyright        : Copyright © 2019, Radius,
 *                    Written under contract by Robosoft Technologies Pvt. Ltd.
 */

import React, { Component } from "react";
import classes from "./Modal.module.scss";

class Modal extends Component {
  componentDidMount() {}

  render() {
    const { close, children } = this.props;
    return (
      <div className={classes.container} onClick={close}>
        <div className={classes.wrapper} style={this.props.style}>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
