import React from "react";
import Image from "next/image";

import ImageDesktop from "@/assets/images/ImageDesktop.webp";

import BookingCardHeader from "./BookingCardHeader";
import BookingCardContent from "./BookingCardContent";
import styles from "./BookingBlock.module.css";

const BookingBlock: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.upperBlock}>
          <Image
            src={ImageDesktop}
            alt="woman-image"
            className={styles.image}
            loading="eager"
          />
          <div className={styles.headerArea}>
            <BookingCardHeader />
          </div>
        </div>

        <div className={styles.contentArea}>
          <BookingCardContent />
        </div>
      </div>
    </section>
  );
};

export default BookingBlock;
