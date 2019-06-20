import React, { useState } from "react";
import {connect} from 'react-redux'
import styles from "./SearchInput.module.scss";
import { searchSnippets } from "../../../services/search";

const SearchInput = (props) => {
  const { busy, data } = props;
  let searchTerm = '';  
  const handleChange = (event) => {
    searchTerm = event.target.value;
    
    if(searchTerm.length > 2)
      executeSearch(searchTerm);
  }

  const executeSearch = searchTerm => {
    console.log("before search", data);
    searchSnippets(data, searchTerm);
  };

  return (
    <input
      disabled={busy}
      id="searchInput"
      className={styles.root}
      type="text"
      placeholder="Search"
      // onKeyPress={handleKeyPress}
      onChange = {handleChange}
    />
  );
};

const mapStateToProps = state => ({
  ...state.snippets
});

export default connect(mapStateToProps)(SearchInput);
