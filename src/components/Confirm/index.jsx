import React from "react";
import {H2} from "../Typography"
import styles from "./Confirm.module.scss";

const Confirm = props => {
  const { title, message, onOk, onCancel, canAbort } = props;

  return (
    <div className={styles.confirmDialog}>
      <H2>{title}</H2>
      <p>{message}</p>
      <div>
        <button onClick={onOk}>OK</button>
        {canAbort ? <button onClick={onCancel}>Cancel</button> : null}
      </div>
    </div>
  );
};

export default Confirm;
