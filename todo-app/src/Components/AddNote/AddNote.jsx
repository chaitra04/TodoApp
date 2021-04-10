import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./AddNote.module.scss";
import Data from "../../Assets/Data/data";

const AddNote = ({ addNote }) => {
  const [note, setNote] = useState();
  const handleChange = (event) => {
    console.log(event.bubbles);
    event.stopPropagation();
    setNote(event.target.value);
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>{Data.addNote}</h1>
      <textarea
        className={classes.input}
        onChange={handleChange}
        onClick={(event) => {
          event.stopPropagation();
        }}
        value={note}
      ></textarea>
      <button
        type="button"
        className={classes.button}
        onClick={(event) => {
          event.stopPropagation();
          addNote(note);
        }}
      >
        Add the Note
      </button>
    </div>
  );
};

export default AddNote;

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
};
