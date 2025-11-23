import Image from "next/image";

import Clock from "@/assets/icons/clock.svg";

import styles from "./DurationLabel.module.css";

const DurationLabel = ({ label = "30 min" }: { label?: string }) => {
  return (
    <div className={styles.durationLabel}>
      <Image src={Clock} alt="Clock" width={16} height={16} />
      <p>{label}</p>
    </div>
  );
};

export default DurationLabel;
