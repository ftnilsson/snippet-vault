import React from "react";
import { toast } from "react-toastify";
import styles from "./Toaster.module.scss";

const informationToast = (id, text) =>
  toast.info(
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>,
    {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false
    }
  );

  const errorToast = (id, text) =>
  toast.error(
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>,
    {
      position: "bottom-center",     
      hideProgressBar: true,
      autoClose: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false
    }
  );

  const successToast = (id, text) =>
  toast.success(
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
    </div>,
    {
      position: "bottom-center",     
      hideProgressBar: false,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false
    }
  );

export { informationToast, errorToast, successToast };
