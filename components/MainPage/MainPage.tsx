import React from "react";

import SiteHeader from "../SiteHeader";
import BookingWrapper from "../BookingWrapper";
import Hero from "../Hero";

import styles from "./MainPage.module.css";

const MainPage: React.FC = () => {
  return (
    <div className={styles.pageRoot}>
      <SiteHeader />
      <Hero />
      <main className={styles.mainArea}>
        <BookingWrapper />
      </main>
    </div>
  );
};

export default MainPage;
