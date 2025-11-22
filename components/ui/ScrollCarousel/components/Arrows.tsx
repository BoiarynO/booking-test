import React from "react";

import styles from "./Arrows.module.css";

type ArrowProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const NextArrow: React.FC<ArrowProps> = ({
  onClick,
  disabled,
  className,
}) => (
  <button
    type="button"
    className={`${styles.arrow} ${styles.next} ${className}`}
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

export const PrevArrow: React.FC<ArrowProps> = ({
  onClick,
  disabled,
  className,
}) => (
  <button
    type="button"
    className={`${styles.arrow} ${styles.prev} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    <svg width="24" height="24" viewBox="0 -1 24 24" fill="none">
      <path
        d="M7 4 L0 11 L7 18"
        stroke={disabled ? "#C0C1D1" : "#16171B"}
        strokeWidth="1"
      />
    </svg>
  </button>
);
