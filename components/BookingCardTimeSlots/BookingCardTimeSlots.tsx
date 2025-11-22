import React, { useMemo } from "react";

import { getTimeSlots } from "@/utils/getTimeSlots";
import useBookingStore, { BookingState } from "@/state/useBookingStore";
import useWindowWidth from "@/utils/hooks/useWindowWidth";

import ScrollCarousel from "../ui/ScrollCarousel/ScrollCarousel";

import styles from "./BookingCardTimeSlots.module.css";
import TimeSlot from "./TimeSlot";

const BookingCardTimeSlots: React.FC = () => {
  const width = useWindowWidth();

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
      <TimeSlot
        key={value}
        {...{ label, value, disabled, active, setSelectedTime, timestamp }}
      />
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

export default BookingCardTimeSlots;
