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
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <AppBar></AppBar>
        <Main />
      </Provider>
      <Footer />
      <GitHubIcon className={styles.GitHubIcon}></GitHubIcon>
    </div>
  );
};

export default App;
