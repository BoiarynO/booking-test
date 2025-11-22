import React, { useMemo } from "react";
import classnames from "classnames";

import useBookingStore, { BookingState } from "@/state/useBookingStore";
import { getDatesArray } from "@/utils/getDatesArray";
import useWindowWidth from "@/utils/hooks/useWindowWidth";

import ScrollCarousel from "../ui/ScrollCarousel/ScrollCarousel";

import styles from "./BookingCardDateSlots.module.css";

const BookingCardDateSlots: React.FC = () => {
  const width = useWindowWidth();

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

  const slidesToShow = width < 568 ? 5.3 : 6;
  const slidesToScroll = width < 568 ? 1 : 3;
  const arrows = width > 568;

  return (
    <div className={styles.root}>
      <ScrollCarousel
        items={items}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        arrows={arrows}
        prevArrowClassname={styles.prevArrow}
        nextArrowClassname={styles.nextArrow}
      />
    </div>
  );
};

export default BookingCardDateSlots;
