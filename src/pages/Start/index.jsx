import React from "react";
import ArrowIcon from "../../assets/ArrowIcon";
import SnippetSearch from "../../components/Search/SnippetSearch";
import styles from "./Start.module.scss";

const Start = props => {
  const { history } = props;
  const navigate = () => {
    history.push("/snippets");
  };

  return (
    <div className={styles.root}>
      <ArrowIcon className={styles.ArrowIcon} onClick={navigate} />
      <SnippetSearch />
    </div>
  );
};

export default Start;
