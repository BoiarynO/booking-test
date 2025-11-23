import React from "react";
import classnames from "classnames";

import styles from "../styles/Arrows.module.css";

type ArrowProps = {
  onClick?: () => void;
  disabled?: boolean;
  customClassName?: string;
};

export const ArrowNext: React.FC<ArrowProps> = ({
  onClick,
  disabled,
  customClassName,
}) => (
  <button
    type="button"
    className={classnames(styles.arrow, styles.next, customClassName)}
    onClick={onClick}
    disabled={disabled}
  >
    <svg width="24" height="24" viewBox="0 -1 12 24" fill="none">
      <path
        d="M8 4 L15 11 L8 18"
        stroke={disabled ? "#C0C1D1" : "#16171B"}
        strokeWidth="1"
      />
    </svg>
  </button>
);

export default ArrowNext;
