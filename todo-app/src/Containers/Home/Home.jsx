import React, { Component } from "react";
import classes from "./Home.module.scss";
import Data from "../../Config/Localization";
import { Modal, SearchInput } from "../../Components";
import { AddNote, NoteList, AddImage, AddLocation } from "..";

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

  /**
   * Function to add the notes to the list
   * store it in session storage
   * @param data note to be added.
   * @param type image/note/location.
   */
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

  /**
   * Function to delete the notes from the list
   * store it in session storage
   * @param id unique id of the note.
   */
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

  /**
   * Function to search the note in the list
   * @param value any string to be searched in the note list.
   */
  searchFunc = (value) => {
    let note = JSON.parse(sessionStorage.getItem("note"));
    if (value)
      note = note.filter((item) => {
        return item.note.toLowerCase().search(value.toLowerCase()) !== -1;
      });
    this.setState({
      note,
    });
  };

  /**
   * Function to search any string in note list
   * on pressing enter key
   * @param e event from the key press.
   */
  handleKeypress = (e) => {
    if (e.key === "Enter" && e.target.value.length != 0) {
      e.preventDefault();
      this.searchFunc(e.target.value);
    }
  };

  /**
   * Function to show the pop up data
   * @param type 1=note, 2=image, 3=location.
   */
  getPopupData = (type) => {
    switch (type) {
      case 1:
        return <AddNote addNote={(data) => this.addNote(data, "note")} />;
      case 2:
        return <AddImage addNote={(data) => this.addNote(data, "image")} />;
      case 3:
        return (
          <AddLocation addNote={(data) => this.addNote(data, "location")} />
        );
      default:
        break;
    }
  };

  /**
   * Function to show the pop up to add a new note
   * @param type 1=note, 2=image, 3=location.
   */
  showPopup = (type) => {
    let popup = <Modal close={this.hidePopup}>{this.getPopupData(type)}</Modal>;
    this.setState({
      showPopup: popup,
    });
  };

  /**
   * Function to close the pop up
   */
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
