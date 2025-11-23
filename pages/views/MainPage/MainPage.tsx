import React from "react";

import Hero from "@/components/layout/Hero";
import SiteHeader from "@/components/layout/SiteHeader";
import BookingBlock from "@/components/layout/BookingBlock";

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
