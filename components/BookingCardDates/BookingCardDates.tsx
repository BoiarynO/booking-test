import styles from "./BookingCardDates.module.css";
import React, { useMemo } from "react";
import clsx from "clsx";
import useBookingStore, { BookingState } from "@/state/useBookingStore";

import Carousel from "../ui/Carousel/Carousel";
import { getDatesArray } from "@/utils/getDatesArray";

const BookingCardDates: React.FC = () => {
  const selected = useBookingStore((s: BookingState) => s.selectedDateId);
  const setSelected = useBookingStore((s: BookingState) => s.setSelectedDate);
  const setSelectedTime = useBookingStore(
    (s: BookingState) => s.setSelectedTime
  );
  const dates = useMemo(() => getDatesArray(), []);

  const items = dates.map(({ month, weekDay, day, timestamp }) => {
    const id = `${month}-${weekDay}-${day}`;

    return (
      <div key={id} className={styles.slideWrapper}>
        {+day === 1 && <div className={styles.month}>{month}</div>}
        <button
          className={clsx(styles.slide, {
            [styles.active]: selected === timestamp,
          })}
          onClick={() => {
            setSelected(timestamp);
            setSelectedTime(null);
          }}
        >
          <div className={styles.weekDay}>{weekDay}</div>
          <div className={styles.day}>{day}</div>
        </button>
      </div>
    );
  });

  return (
    <div className={styles.root}>
      <Carousel items={items} slidesToShow={6} />
    </div>
  );
};

export default BookingCardDates;
