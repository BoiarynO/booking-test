import classnames from "classnames";

import styles from "./DateSlot.module.css";

type DateSlotProps = {
  id: string;
  month: string;
  weekDay: string;
  day: string;
  timestamp: number;
  selected: number | null;
  setSelected: (time: number | null) => void;
  setSelectedTime: (time: number | null) => void;
  isMonth: boolean;
};

const DateSlot = ({
  id,
  month,
  weekDay,
  day,
  timestamp,
  selected,
  setSelected,
  setSelectedTime,
  isMonth,
}: DateSlotProps) => {
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
};

export default DateSlot;
