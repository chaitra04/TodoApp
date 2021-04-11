import React, { Component } from "react";
import classes from "./Home.module.scss";
import Data from "../../Assets/Data/data";
import { Modal, SearchInput } from "../../Components";
import { AddNote, NoteList, AddImage } from "..";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      note: sessionStorage.getItem("note")
        ? JSON.parse(sessionStorage.getItem("note"))
        : [],
    };
  }

  addNote = (data, type) => {
    let note = [...this.state.note];
    let obj = {
      id: `${type}_${Math.floor(Math.random() * 100)}_${note.length}`,
      note: data,
      type,
    };
    note.push(obj);
    this.setState(
      {
        note,
      },
      () => {
        this.hidePopup();
        sessionStorage.setItem("note", JSON.stringify(note));
      }
    );
  };

  deleteNote = (id) => {
    let note = [...this.state.note];
    note = note.filter((item) => item.id !== id);
    this.setState(
      {
        note,
      },
      () => {
        sessionStorage.setItem("note", JSON.stringify(note));
      }
    );
  };

  searchFunc = (value) => {
    let note = JSON.parse(sessionStorage.getItem("note"));
    if(value)
    note = note.filter((item) => item.note.includes(value));
    this.setState({
      note,
    });
  };

  handleKeypress = (e) => {
    if (e.key === "Enter" && e.target.value.length != 0) {
      e.preventDefault();
      this.searchFunc(e.target.value);
    }
  };

  getPopupData = (type) => {
    switch (type) {
      case 1:
        return <AddNote addNote={(data) => this.addNote(data, "note")} />;
      case 2:
        return <AddImage addNote={(data) => this.addNote(data, "image")} />;
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

  hidePopup = () => {
    this.setState({
      showPopup: false,
    });
  };

  render() {
    const { showPopup, note } = this.state;
    return (
      <div className={classes.container}>
        <h1 className={classes.header}>{Data.notes}</h1>
        <button
          type="button"
          className={classes.button}
          onClick={() => this.showPopup(1)}
        >
          {Data.addNote}
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={() => this.showPopup(2)}
        >
          {Data.addImage}
        </button>
        <button
          type="button"
          className={classes.button}
          onClick={() => this.showPopup(3)}
        >
          {Data.addLocation}
        </button>
        {showPopup}
        <div className={classes.wrapper}>
            <SearchInput
              searchFunc={this.searchFunc}
              handleKeypress={this.handleKeypress}
            />
          <div>
            <NoteList note={note} deleteNote={this.deleteNote} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
