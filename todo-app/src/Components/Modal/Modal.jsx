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
  constructor(props) {
    super(props);
    this.outletRef = React.createRef();
  }
  componentDidMount() {}

  closeFunc = (event) => {
    if (
      this.outletRef.current &&
      this.outletRef.current.contains(event.target)
    ) {
      return;
    }
    this.props.close();
  };

  render() {
    const { close, children } = this.props;
    return (
        <div className={classes.container} onClick={this.closeFunc}>
          <div className={classes.wrapper} style={this.props.style} ref={this.outletRef}>
            {children}
          </div>
        </div>
    );
  }
}

export default Modal;
