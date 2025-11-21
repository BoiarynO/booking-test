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
  className?: string;
  nextArrowClassname?: string;
  prevArrowClassname?: string;
  customSettings?: Settings;
};

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  customClassName?: string;
};

const NextArrow: React.FC<ArrowProps> = ({
  className = "",
  style,
  onClick,
  customClassName = "",
}) => {
  const disabled = className?.includes("slick-disabled");

  return (
    <button
      type="button"
      className={`${styles.arrow} ${styles.next} ${customClassName}`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Next"
      disabled={disabled}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 -1 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4 L15 11 L8 18"
          stroke={disabled ? "#C0C1D1" : "#16171B"}
          strokeWidth="1"
        />
      </svg>
    </button>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({
  className = "",
  style,
  onClick,
  customClassName = "",
}) => {
  const disabled = className?.includes("slick-disabled");
  return (
    <button
      type="button"
      className={`${styles.arrow} ${styles.prev} ${customClassName}`}
      style={{ ...style }}
      onClick={onClick}
      aria-label="Previous"
      disabled={disabled}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 -1 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 4 L9 11 L16 18"
          stroke={disabled ? "#C0C1D1" : "#16171B"}
          strokeWidth="1"
        />
      </svg>
    </button>
  );
};
const Carousel: React.FC<CarouselProps> = ({
  items,
  slidesToShow = 6,
  slidesToScroll = 3,
  speed = 300,
  className = "",
  prevArrowClassname = "",
  nextArrowClassname = "",
  customSettings = {},
}) => {
  const settings: Settings = {
    className,
    dots: false,
    infinite: false,
    speed,
    slidesToShow,
    slidesToScroll,
    swipeToSlide: true,
    draggable: true,
    swipe: true,
    nextArrow: <NextArrow customClassName={nextArrowClassname} />,
    prevArrow: <PrevArrow customClassName={prevArrowClassname} />,
    responsive: [
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 5.2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
    ...customSettings,
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
