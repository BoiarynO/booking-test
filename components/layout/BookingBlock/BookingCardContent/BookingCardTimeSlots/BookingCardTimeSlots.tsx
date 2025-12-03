"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";

import { getTimeSlots } from "@/utils/getTimeSlots";
import useBookingStore, { BookingState } from "@/state/useBookingStore";
import {
  MOBILE_WIDTH,
  SLIDES_TO_SCROLL_TIMES_DESKTOP,
  SLIDES_TO_SCROLL_TIMES_MOBILE,
  SLIDES_TO_SHOW_TIMES_DESKTOP,
  SLIDES_TO_SHOW_TIMES_MOBILE,
} from "@/utils/constants";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const ScrollCarousel = dynamic(
  () => import("../../../../ui/ScrollCarousel/ScrollCarousel"),
  { ssr: false }
);

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

  const slidesToShow =
    width < MOBILE_WIDTH
      ? SLIDES_TO_SHOW_TIMES_MOBILE
      : SLIDES_TO_SHOW_TIMES_DESKTOP;
  const slidesToScroll =
    width < MOBILE_WIDTH
      ? SLIDES_TO_SCROLL_TIMES_MOBILE
      : SLIDES_TO_SCROLL_TIMES_DESKTOP;
  const arrows = width > MOBILE_WIDTH;

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
