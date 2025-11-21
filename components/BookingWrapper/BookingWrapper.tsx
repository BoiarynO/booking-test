import React from "react";
import Image from "next/image";

import ImageDesktop from "@/assets/images/ImageDesktop.webp";

import BookingCardHeader from "../BookingCardHeader";
import BookingCardContent from "../BookingCardContent";
import Container from "../ui/Container/Container";

import styles from "./BookingWrapper.module.css";

const BookingWrapper: React.FC = () => {
  return (
    <Container className={styles.wrapper}>
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
    </Container>
  );
};

export default BookingWrapper;
