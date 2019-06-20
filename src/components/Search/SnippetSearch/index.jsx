import React from "react";
import SearchInput from "../SearchInput";
import SearchResults from "../SearchResults";
import {H2} from '../../Typography';
import styles from "./SnippetSearch.module.scss";
const SnippetSearch = () => {
  return (
    <div className={styles.root}>
      <div className={styles.searchContainer}>
        <H2 className={styles.header}>Snippet Vault</H2>        
        <SearchInput />
        <SearchResults />
      </div>
    </div>
  );
}; 

export default SnippetSearch;
