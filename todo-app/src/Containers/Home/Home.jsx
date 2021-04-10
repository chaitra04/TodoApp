import React, { Component } from "react";
import classes from "./Home.module.scss";
import Data from "../../Assets/Data/data";
import { AddNote, Modal } from "../../Components";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
    };
  }

  hidePopup = () => {
    this.setState({
      showPopup: false,
    });
  };

  addNote = (data) => {
    console.log(data)
  }

  renderNote = () => {
    console.log("add note");
    return <AddNote addNote={this.addNote}/>;
  };

  getPopupData = (type) => {
    switch (type) {
      case 1:
        return this.renderNote();
      default:
        break;
    }
  };

  showPopup = (type) => {
    let popup = <Modal close={this.hidePopup}>{this.getPopupData(type)}</Modal>;
    this.setState({
      showPopup: popup,
    });
  };

  render() {
    const { showPopup } = this.state;
    return (
      <div className={classes.container}>
        <h1 className={classes.header}>{Data.notes}</h1>
        <button
          type="button"
          className={classes.button}
          onClick={() => this.showPopup(1)}
        >
          Add A Note
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={() => this.showPopup(2)}
        >
          Add an Image
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={() => this.showPopup(3)}
        >
          Add a Location
        </button>
        {showPopup}
      </div>
    );
  }
}

export default Home;
