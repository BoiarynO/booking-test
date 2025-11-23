import React, { useMemo } from "react";

import useBookingStore, { BookingState } from "@/state/useBookingStore";
import { getDatesArray } from "@/utils/getDatesArray";
import useWindowWidth from "@/hooks/useWindowWidth";
import {
  MOBILE_WIDTH,
  SLIDES_TO_SCROLL_DATES_DESKTOP,
  SLIDES_TO_SCROLL_DATES_MOBILE,
  SLIDES_TO_SHOW_DATES_DESKTOP,
  SLIDES_TO_SHOW_DATES_MOBILE,
} from "@/utils/constants";

import ScrollCarousel from "../../../../ui/ScrollCarousel/ScrollCarousel";

import styles from "./BookingCardDateSlots.module.css";
import DateSlot from "./DateSlot";

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
      <DateSlot
        key={id}
        {...{
          id,
          month,
          weekDay,
          day,
          timestamp,
          selected,
          setSelected,
          setSelectedTime,
          isMonth,
        }}
      />
    );
  });

  const slidesToShow =
    width < MOBILE_WIDTH
      ? SLIDES_TO_SHOW_DATES_MOBILE
      : SLIDES_TO_SHOW_DATES_DESKTOP;
  const slidesToScroll =
    width < MOBILE_WIDTH
      ? SLIDES_TO_SCROLL_DATES_MOBILE
      : SLIDES_TO_SCROLL_DATES_DESKTOP;
  const arrows = width > MOBILE_WIDTH;

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
