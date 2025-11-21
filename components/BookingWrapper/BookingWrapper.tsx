import React from "react";
import BookingCardHeader from "../BookingCardHeader";
import BookingCardContent from "../BookingCardContent";
import styles from "./BookingWrapper.module.css";
import Container from "../ui/Container/Container";

import ImageDesktop from "@/assets/images/ImageDesktop.webp";

import Image from "next/image";

const BookingWrapper: React.FC = () => {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.upperBlock}>
          <Image
            src={ImageDesktop}
            alt=""
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
    </Container>
  );
};

export default BookingWrapper;
