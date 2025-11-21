import React, { useMemo } from "react";
import clsx from "clsx";
import styles from "./BookingCardTimes.module.css";
import { getTimeSlots } from "@/utils/getTimeSlots";
import useBookingStore, { BookingState } from "@/state/useBookingStore";
import Carousel from "../ui/Carousel/Carousel";

const BookingCardTimes: React.FC = () => {
  const selectedDateId = useBookingStore(
    (s: BookingState) => s.selectedDateId ?? 0
  );
  const selectedTime = useBookingStore((s: BookingState) => s.selectedTime);
  const setSelectedTime = useBookingStore(
    (s: BookingState) => s.setSelectedTime
  );

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

  return (
    <div className={styles.root}>
      <Carousel
        items={items}
        slidesToShow={5}
        slidesToScroll={2}
        customSettings={{
          responsive: [
            {
              breakpoint: 568,
              settings: {
                slidesToShow: 4.2,
                slidesToScroll: 1,
                arrows: false,
              },
            },
          ],
        }}
      />
    </div>
  );
};

export default BookingCardTimes;
