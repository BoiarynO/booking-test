import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";

import useBookingStore, { BookingState } from "@/state/useBookingStore";
import { getDatesArray } from "@/utils/getDatesArray";

import Carousel from "../ui/Carousel/Carousel";

import styles from "./BookingCardDates.module.css";
import ScrollCarousel from "../ui/ScrollCarousel/ScrollCarousel";

const BookingCardDates: React.FC = () => {
  const [width, setWidth] = useState<number>(0);

  const selected = useBookingStore((s: BookingState) => s.selectedDateId);
  const setSelected = useBookingStore((s: BookingState) => s.setSelectedDate);
  const setSelectedTime = useBookingStore(
    (s: BookingState) => s.setSelectedTime
  );

  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;

      setWidth(width);
    };

    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWidth(width);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

export default BookingCardDates;
