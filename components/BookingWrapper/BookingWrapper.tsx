import React from "react";
import BookingCardHeader from "../BookingCardHeader";
import BookingCardContent from "../BookingCardContent";
import styles from "./BookingWrapper.module.css";

const BookingWrapper: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.upperBlock}>
          <div className={styles.imagePlaceholder} aria-hidden>
            Image Placeholder
          </div>
          <div className={styles.headerArea}>
            <BookingCardHeader />
          </div>
        </div>

        <div className={styles.contentArea}>
          <BookingCardContent />
        </div>
      </div>
    </section>
  );
};

export default BookingWrapper;
