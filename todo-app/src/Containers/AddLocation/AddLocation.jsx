import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./AddLocation.module.scss";
import Data from "../../Config/Localization";
import GoogleMap from "../../Components/GoogleMap/GoogleMap";

const AddLocation = ({ addNote }) => {
  const [ location, setLocation ] = useState();
  
  const googleLocationChanged = (place, lat, lng) => {
    setLocation(place);
};

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>{Data.addNote}</h1>
      <GoogleMap googleLocationChanged={googleLocationChanged}/>
      <div className={classes.btnWrap}>
        <button
          type="button"
          className={classes.button}
          onClick={(event) => {
            event.stopPropagation();
            location && addNote(location);
          }}
        >
         {Data.addNote}
        </button>
      </div>
    </div>
  );
};

export default AddLocation;

AddLocation.propTypes = {
  addNote: PropTypes.func.isRequired,
};
