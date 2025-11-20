import React from "react";
import styles from "./ConfirmButton.module.css";
import useBookingStore from "@/state/useBookingStore";
import { format } from "date-fns";

const ConfirmButton: React.FC = () => {
  const selectedTime = useBookingStore((s) => s.selectedTime ?? 0);

  const clickHandler = () => {
    console.log({
      timestamp: selectedTime,
      date: format(new Date(selectedTime), "yyyy-MM-dd-HH:mm"),
    });
  };

  return (
    <button
      className={styles.btn}
      type="button"
      disabled={!selectedTime}
      onClick={clickHandler}
    >
      Confirm
    </button>
  );
};

export default ConfirmButton;
