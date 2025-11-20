import React from "react";
import SiteHeader from "../SiteHeader";
import BookingWrapper from "../BookingWrapper";
import styles from "./MainPage.module.css";

const MainPage: React.FC = () => {
  return (
    <div className={styles.pageRoot}>
      <SiteHeader />
      <main className={styles.mainArea}>
        <BookingWrapper />
      </main>
    </div>
  );
};

export default MainPage;
