import React from "react";
import styles from "./AppBar.module.scss";
import { informationToast } from "../../components/Toaster";
import { close, minimize } from '../../services/commands'

const AppBar = () => {
  var os = "Unknown OS";
  if (navigator.appVersion.indexOf("Win") !== -1) os = "Windows";
  if (navigator.appVersion.indexOf("Mac") !== -1) os = "MacOS";
  if (navigator.appVersion.indexOf("X11") !== -1) os = "UNIX";
  if (navigator.appVersion.indexOf("Linux") !== -1) os = "Linux";

  const onminimize = () => {
    minimize();
  };

  const onMaximize = () => {
    informationToast(0, 'This app is already perfectly sized')
  };

  const onClose = () => {
    close();
  };

  const renderMacOs = () => {
    return (
      <div className={styles.toolbar}>
        <span className={styles.redDot} onClick={onClose} />
        <span className={styles.yellowDot} onClick={onminimize} />
        <span className={styles.greenDot} onClick={onMaximize} />
      </div>
    );
  };
  const renderWindows = () => {
    return (
      <div className={styles.toolbar}>
        <span className={styles.winButton} onClick={onClose} >X</span>
        <span className={styles.winButton} onClick={onMaximize} >□</span>
        <span className={styles.winButton} onClick={onminimize}>─</span>
      </div>
    );

    const renderLinux = () => {
      return (<div className={styles.toolbar}></div>);
    };

    const renderUnix = () => {
      return (<div className={styles.toolbar}></div>);
    };
  };

  return os === 'MacOs' ? renderMacOs() : renderWindows();
};

export default AppBar;
