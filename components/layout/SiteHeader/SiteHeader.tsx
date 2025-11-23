import React from "react";

import styles from "./SiteHeader.module.css";

const SiteHeader: React.FC = ({
  text = "6037 Venture Partnership",
}: {
  text?: string;
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>{text}</div>
    </header>
  );
};

export default SiteHeader;
