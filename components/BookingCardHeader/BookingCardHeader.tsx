import React from "react";

import styles from "./BookingCardHeader.module.css";

type Props = { title?: string; subtitle?: string };

const BookingCardHeader: React.FC = ({
  title = "Book a Session",
  subtitle = "Choose a date and time that is convenient for you to e-meet your stylist",
}: Props) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export default BookingCardHeader;
