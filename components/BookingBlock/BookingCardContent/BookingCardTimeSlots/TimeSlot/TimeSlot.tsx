import classnames from "classnames";

import styles from "./TimeSlot.module.css";

type TimeSlotProps = {
  value: string;
  label: string;
  disabled: boolean;
  active: boolean;
  setSelectedTime: (time: number | null) => void;
  timestamp: number;
};

const TimeSlot = ({
  value,
  label,
  disabled,
  active,
  setSelectedTime,
  timestamp,
}: TimeSlotProps) => {
  return (
    <div key={value} className={styles.slideWrapper}>
      <button
        className={classnames(styles.button, { [styles.active]: active })}
        disabled={disabled}
        onClick={() => !disabled && setSelectedTime(timestamp)}
      >
        <div className={styles.label}>{label}</div>
      </button>
    </div>
  );
};

export default TimeSlot;
