import React from "react";

import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import BookingBlock from "@/components/BookingBlock";

import styles from "./MainPage.module.css";

const MainPage: React.FC = () => {
  return (
    <div className={styles.pageRoot}>
      <SiteHeader />
      <Hero />
      <main className={styles.mainArea}>
        <BookingBlock />
      </main>
    </div>
  );
};

export default MainPage;
