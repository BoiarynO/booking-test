import React from "react";

import BookingCardDates from "../BookingCardDates";
import BookingCardTimes from "../BookingCardTimes";
import ConfirmButton from "../ConfirmButton";

import styles from "./BookingCardContent.module.css";

const BookingCardContent: React.FC = () => {
  return (
    <div className={styles.contentRoot}>
      <div className={styles.column}>
        <BookingCardDates />
        <BookingCardTimes />
        {/* <div className={styles.fadeOverlay}></div> */}
      </div>

      <div className={styles.actions}>
        <ConfirmButton />
      </div>
    </div>
  );
};

export default BookingCardContent;
