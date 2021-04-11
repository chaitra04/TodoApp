import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./AddImage.module.scss";
import { FileUpload } from "../../Components";
import Data from "../../Config/Localization";

const AddImage = ({ addNote }) => {
  const [uploadedFile, setUploadedFile] = useState();

  const handleUpload = (file) => {
    console.log(file);
    setUploadedFile(file);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>{Data.addNote}</h1>
      <FileUpload handleUpload={handleUpload} />
      {uploadedFile && (
        <img className={classes.imagesUploaded} src={uploadedFile} />
      )}
      <div className={classes.btnWrap}>
        <button
          type="button"
          className={classes.button}
          onClick={(event) => {
            event.stopPropagation();
            uploadedFile && addNote(uploadedFile);
          }}
        >
          {Data.addNote}
        </button>
      </div>
    </div>
  );
};

export default AddImage;

AddImage.propTypes = {
  addNote: PropTypes.func.isRequired,
};
