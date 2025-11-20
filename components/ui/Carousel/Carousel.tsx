import React from "react";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Carousel.module.css";

type CarouselProps = {
  items: React.ReactNode[];
  slidesToShow?: number;
  slidesToScroll?: number;
  rtl?: boolean;
  speed?: number;
};

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const NextArrow: React.FC<ArrowProps> = ({
  className = "",
  style,
  onClick,
}) => (
  <button
    type="button"
    className={`${className} ${styles.arrow} ${styles.next}`}
    style={{ ...style }}
    onClick={onClick}
    aria-label="Next"
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 4l8 8-8 8"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const PrevArrow: React.FC<ArrowProps> = ({
  className = "",
  style,
  onClick,
}) => (
  <button
    type="button"
    className={`${className} ${styles.arrow} ${styles.prev}`}
    style={{ ...style }}
    onClick={onClick}
    aria-label="Previous"
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4l-8 8 8 8"
        stroke="#333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const Carousel: React.FC<CarouselProps> = ({
  items,
  slidesToShow = 6,
  slidesToScroll = 6,
  speed = 1000,
}) => {
  const settings: Settings = {
    dots: false,
    infinite: false,
    speed,
    slidesToShow,
    slidesToScroll,
    swipeToSlide: true,
    draggable: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.root}>
      <Slider {...settings}>
        {items.map((it, idx) => (
          <div key={idx} className={styles.slideWrapper}>
            {it}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
