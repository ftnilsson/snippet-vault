import React from "react";
import { Provider } from "react-redux";
import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Main from './Main';
import { ToastContainer } from 'react-toastify';
import { store } from "./store";
import 'react-toastify/dist/ReactToastify.min.css';
import GitHubIcon from "./assets/GitHubIcon";
import styles from "./App.module.scss";

const App = () => {

  const onGitHub = (event) => {
    //TODO open browser
    event.preventDefault();
    console.log('here');
    let link = 'https://github.com/ftnilsson/snippet-vault';
    window.require("electron").shell.openExternal(link);
  };

  return (
    <div className="App">
      <Provider store={store}>      
        <ToastContainer />
        <AppBar></AppBar>
        <Main />
        <GitHubIcon className={styles.GitHubIcon} onClick={onGitHub} ></GitHubIcon>
      </Provider>
      <Footer />
      
    </div>
  );
};

export default App;
