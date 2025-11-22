import React, { useRef, useEffect, useState, useCallback } from "react";

import styles from "./ScrollCarousel.module.css";

type ScrollCarouselProps = {
  items: React.ReactNode[];
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
  gap?: number;
  className?: string;
  nextArrowClassname?: string;
  prevArrowClassname?: string;
};

type ArrowProps = {
  onClick?: () => void;
  disabled?: boolean;
  customClassName?: string;
};

const NextArrow: React.FC<ArrowProps> = ({
  onClick,
  disabled,
  customClassName,
}) => (
  <button
    type="button"
    className={`${styles.arrow} ${styles.next} ${customClassName}`}
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

const PrevArrow: React.FC<ArrowProps> = ({
  onClick,
  disabled,
  customClassName,
}) => (
  <button
    type="button"
    className={`${styles.arrow} ${styles.prev} ${customClassName}`}
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

export const ScrollCarousel: React.FC<ScrollCarouselProps> = ({
  items,
  slidesToShow = 6,
  slidesToScroll = 3,
  arrows = true,
  gap,
  className = "",
  nextArrowClassname = "",
  prevArrowClassname = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[] | null[]>([]);

  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [autoGap, setAutoGap] = useState<number | null>(null);

  const effectiveGap = autoGap ?? gap ?? 12;

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (!itemRefs.current[0]) return;

    const computeGap = () => {
      const containerWidth = wrapperRef.current!.offsetWidth;
      const slideWidth = itemRefs.current[0]?.offsetWidth ?? 0;

      const g =
        (containerWidth - slideWidth * slidesToShow) / (slidesToShow - 1);

      setAutoGap(g > 0 ? g : 0);
    };

    computeGap();
    window.addEventListener("resize", computeGap);

    return () => window.removeEventListener("resize", computeGap);
  }, [slidesToShow, items.length]);

  // Measure widths
  useEffect(() => {
    if (!wrapperRef.current) return;

    const measure = () => {
      const widths = itemRefs.current.map((el) => el?.offsetWidth || 0);
      const total =
        widths.reduce((a, b) => a + b, 0) + effectiveGap * (items.length - 1);

      const containerWidth = wrapperRef.current!.offsetWidth;
      setMaxScroll(Math.max(0, total - containerWidth));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items, effectiveGap]);

  // Sync scroll position
  const handleScroll = () => {
    setScrollPos(wrapperRef.current?.scrollLeft || 0);
  };

  // Scroll by “slidesToScroll”
  const scrollByItems = useCallback(
    (dir: "left" | "right") => {
      if (!wrapperRef.current) return;

      let delta = 0;
      const count = slidesToScroll;

      for (let i = 0; i < count; i++) {
        const idx = dir === "right" ? slidesToShow + i : i;
        const w = itemRefs.current[idx]?.offsetWidth || 0;
        delta += w + effectiveGap;
      }

      const target =
        dir === "right"
          ? Math.min(scrollPos + delta, maxScroll)
          : Math.max(scrollPos - delta, 0);

      wrapperRef.current.scrollTo({ left: target, behavior: "smooth" });
    },
    [scrollPos, maxScroll, slidesToShow, slidesToScroll, effectiveGap]
  );

  // Desktop drag
  const drag = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = true;
    startX.current = e.pageX;
    startScroll.current = wrapperRef.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current) return;
    wrapperRef.current!.scrollLeft =
      startScroll.current - (e.pageX - startX.current);
  };

  const endDrag = () => {
    drag.current = false;
  };

  return (
    <div className={`${styles.root} ${className}`}>
      {arrows && (
        <PrevArrow
          onClick={() => scrollByItems("left")}
          disabled={scrollPos <= 2}
          customClassName={prevArrowClassname}
        />
      )}

      <div
        ref={wrapperRef}
        className={styles.track}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
      >
        <div className={styles.inner} style={{ gap: effectiveGap }}>
          {items.map((el, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                marginRight:
                  i === items.length - 1 && arrows ? effectiveGap : 0,
              }}
              ref={(el: HTMLDivElement) => {
                if (el) {
                  itemRefs.current[i] = el;
                }
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
          disabled={scrollPos >= maxScroll - 2}
          customClassName={nextArrowClassname}
        />
      )}
    </div>
  );
};

export default ScrollCarousel;
