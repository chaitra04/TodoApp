import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./NoteList.module.scss";
import Data from "../../Assets/Data/data";
const NoteList = ({ note, deleteNote }) => {

  return (
    <div className={classes.container}>
      {note.length > 0 ? (
        note.map((note, index) => {
          return (
            <div key={index} className={classes.card}>
                <img src={"./images/delete.png"} className={classes.deleteImg} onClick={() => deleteNote(note.id)}/>
                {note.type === "image" ? (
                  <img src={note.note} className={classes.image}/>
                ) : <div className={classes.note}> {note.note} </div>}
            </div>
          );
        })
      ) : (
      <div className={classes.noData}>{Data.noNoteErr}</div>
      )}
    </div>
  );
};

export default NoteList;

NoteList.propTypes = {
  note: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteNote: PropTypes.func.isRequired
};
