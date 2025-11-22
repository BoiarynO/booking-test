import React, { useRef, useEffect, useState, useCallback } from "react";

import styles from "./ScrollCarousel.module.css";

type ScrollCarouselProps = {
  items: React.ReactNode[];
  slidesToShow?: number; // how many items visible
  slidesToScroll?: number; // how many items to scroll per click
  arrows?: boolean;
  gap?: number;
  className?: string;
  nextArrowClassname?: string;
  prevArrowClassname?: string;
};

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
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
  disabled = false,
  customClassName = "",
}) => {
  // const disabled = className?.includes("slick-disabled");
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

export const ScrollCarousel: React.FC<ScrollCarouselProps> = ({
  items,
  slidesToShow = 6,
  slidesToScroll = 3,
  arrows = true,
  gap = 12,
  className = "",
  nextArrowClassname = "",
  prevArrowClassname = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const [scrollPos, setScrollPos] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [, /* itemsWidth */ setItemsWidth] = useState<number[]>([]);

  // measure items + container
  useEffect(() => {
    if (!wrapperRef.current) return;

    const resize = () => {
      const widths = itemRefs.current.map((el) => el?.offsetWidth || 0);
      setItemsWidth(widths);
      setContainerWidth(wrapperRef.current!.offsetWidth);

      const totalWidth =
        widths.reduce((acc, w) => acc + w, 0) + gap * (items.length - 1);

      setMaxScroll(Math.max(0, totalWidth - containerWidth));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [items, gap, containerWidth]);

  const scrollByItems = useCallback(
    (direction: "left" | "right") => {
      if (!wrapperRef.current) return;

      let newScroll = scrollPos;
      const dir = direction === "right" ? 1 : -1;
      const count = slidesToScroll;

      let distance = 0;
      for (let i = 0; i < count; i++) {
        const index = dir === 1 ? slidesToShow + i : i;
        const itemWidth = itemRefs.current[index]?.offsetWidth || 0;
        distance += itemWidth + gap;
      }

      newScroll = newScroll + distance * dir;

      // clamp
      newScroll = Math.max(0, Math.min(newScroll, maxScroll));
      wrapperRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
      setScrollPos(newScroll);
    },
    [scrollPos, maxScroll, slidesToScroll, slidesToShow, gap]
  );

  const handleScroll = () => {
    if (!wrapperRef.current) return;
    setScrollPos(wrapperRef.current.scrollLeft);
  };

  const isLeftDisabled = scrollPos <= 2;
  const isRightDisabled = scrollPos >= maxScroll - 2;

  // Drag/swipe support
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    startScrollLeft.current = wrapperRef.current!.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.pageX - startX.current;
    wrapperRef.current!.scrollLeft = startScrollLeft.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  return (
    <div className={`${styles.root} ${className}`}>
      {arrows && (
        <PrevArrow
          onClick={() => scrollByItems("left")}
          disabled={isLeftDisabled}
          customClassName={prevArrowClassname}
        />
      )}

      <div
        className={styles.track}
        ref={wrapperRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.inner} style={{ gap }}>
          {items.map((el, i) => (
            <div
              key={i}
              className={styles.item}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
            >
              {el}
            </div>
          ))}
        </div>
      </div>

      {arrows && (
        <NextArrow
          onClick={() => scrollByItems("right")}
          disabled={isRightDisabled}
          customClassName={nextArrowClassname}
        />
      )}
    </div>
  );
};

export default ScrollCarousel;
