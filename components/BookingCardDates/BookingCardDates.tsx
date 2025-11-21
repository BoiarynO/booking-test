import React, { useMemo } from "react";
import classnames from "classnames";

import useBookingStore, { BookingState } from "@/state/useBookingStore";
import { getDatesArray } from "@/utils/getDatesArray";

import Carousel from "../ui/Carousel/Carousel";

import styles from "./BookingCardDates.module.css";

const BookingCardDates: React.FC = () => {
  const selected = useBookingStore((s: BookingState) => s.selectedDateId);
  const setSelected = useBookingStore((s: BookingState) => s.setSelectedDate);
  const setSelectedTime = useBookingStore(
    (s: BookingState) => s.setSelectedTime
  );
  const dates = useMemo(() => getDatesArray(), []);

  const items = dates.map(({ month, weekDay, day, timestamp }, index) => {
    const id = `${month}-${weekDay}-${day}`;
    const isMonth = +dates[index + 1]?.day === 1 || +day === 1;

    return (
      <div key={id} className={styles.slideWrapper}>
        {
          <div
            className={classnames(styles.month, {
              [styles.visible]: isMonth,
            })}
          >
            {month}
          </div>
        }
        <button
          className={classnames(styles.button, {
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
      <Carousel
        items={items}
        slidesToShow={6}
        prevArrowClassname={styles.prevArrow}
        nextArrowClassname={styles.nextArrow}
      />
    </div>
  );
};

export default BookingCardDates;
