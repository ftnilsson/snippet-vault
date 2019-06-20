import React from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";
import Routes from "./routes/routes";
import { createHashHistory } from "history";
import Loader from './components/Loader';
import {loadSnippets} from './services/snippets'
import styles from './Main.module.scss';

let history;
history = createHashHistory();

const Main = props => {   
  const { busy } = props;
  if (busy) {
    return (
      <div className={styles.loaderContainer} id="main">
        <Loader />
      </div>
    );
  }
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
};

const mapStateToProps = state => ({
  ...state.snippets
});

loadSnippets();

export default connect(mapStateToProps)(Main);
