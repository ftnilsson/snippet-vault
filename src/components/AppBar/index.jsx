import React from "react";
import styles from "./AppBar.module.scss";
import {close, minimize} from '../../services/commands'

const AppBar = () => {
  var os = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") != -1) os = "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) os = "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) os = "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) os = "Linux";

  console.log(os);

  const renderMacOs = () => {
    return (
      <div className={styles.toolbar}>
        <span className={styles.redDot} />
        <span className={styles.yellowDot} />
        <span className={styles.greenDot} />
      </div>
    );
  };

  return renderMacOs();
};

export default AppBar;
