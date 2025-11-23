import React from "react";
import { format } from "date-fns";

import useBookingStore from "@/state/useBookingStore";

import styles from "./ConfirmButton.module.css";

const ConfirmButton: React.FC = ({ label = "Confirm" }: { label?: string }) => {
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
      <p>{label}</p>
    </button>
  );
};

export default ConfirmButton;
