import React from "react";
import styles from "./SiteHeader.module.css";

const SiteHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>6037 Venture Partnership</div>
    </header>
  );
};

export default SiteHeader;
