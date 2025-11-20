import React from "react";
import styles from "./BookingCardHeader.module.css";

const BookingCardHeader: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Book a Session</h2>
      <p className={styles.desc}>
        Choose a date and time that is convenient for you to e-meet your stylist
      </p>
    </div>
  );
};

export default BookingCardHeader;
