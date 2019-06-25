import React from "react";
import CodeIcon from "../../../assets/CodeIcon";
import styles from "./SearchResultItem.module.scss";

const SearchResultItem = props => {
    const { index, name, handleCopy, handleOpen } = props;
  return (
    <div key={index} className={styles.resultItem}>
      <div className={styles.resultName} onClick={handleCopy}>
        {name}
      </div>
      <div className={styles.buttonContainer} onClick={handleOpen}>
        <CodeIcon className={styles.CodeIcon}  />
      </div>
    </div>
  );
};


export default SearchResultItem;
