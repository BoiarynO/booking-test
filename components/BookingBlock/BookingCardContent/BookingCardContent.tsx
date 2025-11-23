import React from "react";

import ConfirmButton from "./ConfirmButton";
import BookingCardDateSlots from "./BookingCardDateSlots";
import BookingCardTimeSlots from "./BookingCardTimeSlots";
import styles from "./BookingCardContent.module.css";

const BookingCardContent: React.FC = () => {
  return (
    <div className={styles.contentRoot}>
      <div className={styles.column}>
        <BookingCardDateSlots />
        <BookingCardTimeSlots />
        <div className={styles.fadeOverlay}></div>
      </div>

      <div className={styles.actions}>
        <ConfirmButton />
      </div>
    </div>
  );
};

export default BookingCardContent;
