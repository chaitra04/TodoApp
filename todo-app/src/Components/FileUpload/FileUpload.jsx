import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./FileUpload.module.scss";
import Data from "../../Config/Localization";

function FileUpload({ handleUpload }) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {      
      const reader = new FileReader();
      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        handleUpload(e.target.result);
      };
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/jpeg, image/png",
    multiple: false,
    onDrop
  });

  const files = acceptedFiles.length > 0 ? acceptedFiles.map((file) => (
    <span key={file.path}>
      {file.path}
    </span>
  )) : Data.chooseFile;

  return (
    <React.Fragment>
      <div>
        <section className={ classes.prdfucsection }>
          <div {...getRootProps({ className: classes.prdfucdropzone })}>
            <input {...getInputProps()}/>
            <button className={classes.button}>{files}</button>
          </div>          
        </section>
        </div>
    </React.Fragment>
  );
}

export default FileUpload;
