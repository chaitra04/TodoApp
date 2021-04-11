import React, { useState } from "react";
import PropTypes from "prop-types";
import classes from "./SearchInput.module.scss";
import Data from "../../Assets/Data/data";

const SearchInput = ({ searchFunc, handleKeypress }) => {
  const [value, setValue] = useState();

  const handleChange = (event) => {
    if(event.target.value)
    setValue(event.target.value);
    else searchFunc();
  };

  return (
    <div className={classes.container}>
      <input className={classes.input} placeholder={Data.searchNotes} onChange={handleChange} onKeyPress={handleKeypress}/>
      <button className={classes.button} onClick={()=>searchFunc(value)}>
            {Data.search}
      </button>
    </div>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  searchFunc: PropTypes.func.isRequired,
  handleKeypress: PropTypes.func.isRequired
};
