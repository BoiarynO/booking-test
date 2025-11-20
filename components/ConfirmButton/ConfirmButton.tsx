import React from "react";
import styles from "./ConfirmButton.module.css";

const ConfirmButton: React.FC = () => {
  return (
    <button className={styles.btn} type="button" disabled>
      Confirm
    </button>
  );
};

export default ConfirmButton;
