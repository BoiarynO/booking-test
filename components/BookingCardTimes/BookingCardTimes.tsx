import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

import { getTimeSlots } from "@/utils/getTimeSlots";
import useBookingStore, { BookingState } from "@/state/useBookingStore";

import ScrollCarousel from "../ui/ScrollCarousel/ScrollCarousel";

import styles from "./BookingCardTimes.module.css";

const BookingCardTimes: React.FC = () => {
  const [width, setWidth] = useState<number>(0);

  const selectedDateId = useBookingStore(
    (s: BookingState) => s.selectedDateId ?? 0
  );
  const selectedTime = useBookingStore((s: BookingState) => s.selectedTime);
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

  const timeSlots = useMemo(() => {
    const selectedDate = new Date(selectedDateId);
    return getTimeSlots(selectedDate);
  }, [selectedDateId]);

  const items = timeSlots.map(({ label, value, disabled, timestamp }) => {
    const active = selectedTime === timestamp;
    return (
      <div key={value} className={styles.slideWrapper}>
        <button
          className={clsx(styles.button, { [styles.active]: active })}
          disabled={disabled}
          onClick={() => !disabled && setSelectedTime(timestamp)}
        >
          <div className={styles.label}>{label}</div>
        </button>
      </div>
    );
  });

  const slidesToShow = width < 568 ? 4.2 : 5;
  const slidesToScroll = width < 568 ? 1 : 2;
  const arrows = width > 568;

  return (
    <div className={styles.root}>
      <ScrollCarousel
        items={items}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
        arrows={arrows}
      />
    </div>
  );
};

export default BookingCardTimes;
