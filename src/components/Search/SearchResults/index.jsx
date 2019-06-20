import React, { useState } from "react";
import { connect } from "react-redux";
import Loader from "../../Loader";
import Popper from "../../Popper";
import SearchResultItem from "../SearchResultItem";
import { copyToClipboard } from "../../../services/commands";
import styles from "./SearchResults.module.scss";

const SearchResults = props => {
  const { busy, data, copied } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [popperData, setPopperData] = useState("");

  const handleOpen = index => {
    setPopperData(data[index].item.data.__cdata);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCopy = index => {
    copyToClipboard(data[index].item.data.__cdata);
  };

  const renderContent = () => {
    if (busy) {
      return (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      );
    }

    return (
      <div className={styles.area} ss-container="true">
        {data.map((result, index) => (
          <SearchResultItem
            key={index}
            index={index}
            name={result.item.name}
            data={result.item.data.__cdata}
            handleCopy={() => handleCopy(index)}
            handleOpen={() => handleOpen(index)}
          />
        ))}
        {isOpen ? (
          <Popper handleClose={handleClose}>
            <pre>
              <code>{popperData}</code>
            </pre>
          </Popper>
        ) : null}
      </div>
    );
  };

  return <div className={styles.root}>{renderContent()}</div>;
};

const mapStateToProps = state => ({
  ...state.snippets.searchResult,
  copied: state.commands.copyCommand
});

export default connect(mapStateToProps)(SearchResults);
