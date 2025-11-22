import React, { useRef, useState, useCallback } from "react";

import styles from "./ScrollCarousel.module.css";
import { NextArrow, PrevArrow } from "./components/Arrows";
import { useAutoGap } from "./hooks/useAitoGap";
import { useDragScroll } from "./hooks/useDragScroll";
import { useMeasurements } from "./hooks/useMeasurements";

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

export const ScrollCarousel: React.FC<ScrollCarouselProps> = ({
  items,
  slidesToShow = 6,
  slidesToScroll = 3,
  arrows = true,
  className = "",
  nextArrowClassname = "",
  prevArrowClassname = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[] | null[]>([]);

  const [scrollPos, setScrollPos] = useState(0);

  const [firstItem, setFirstItem] = useState<HTMLDivElement | null>(null);

  const autoGap = useAutoGap(wrapperRef, firstItem, slidesToShow);
  const gap = autoGap ?? 12;

  const { onMouseDown, onMouseMove, endDrag } = useDragScroll(wrapperRef);

  // геттер ширин (стабільний завдяки useCallback)
  const getItemWidths = useCallback(() => {
    return itemRefs.current.map((el) => el?.offsetWidth ?? 0);
  }, []);

  const maxScroll = useMeasurements(
    wrapperRef,
    getItemWidths,
    gap,
    items.length
  );

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      itemRefs.current[index] = el;
      if (index === 0) setFirstItem(el);
    },
    []
  );

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
        delta += w + gap;
      }

      const target =
        dir === "right"
          ? Math.min(scrollPos + delta, maxScroll)
          : Math.max(scrollPos - delta, 0);

      wrapperRef.current.scrollTo({ left: target, behavior: "smooth" });
    },
    [scrollPos, maxScroll, slidesToShow, slidesToScroll, gap]
  );

  return (
    <div className={`${styles.root} ${className}`}>
      {arrows && (
        <PrevArrow
          onClick={() => scrollByItems("left")}
          disabled={scrollPos <= 2}
          className={prevArrowClassname}
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
        <div className={styles.inner} style={{ gap: gap }}>
          {items.map((el, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                marginRight: i === items.length - 1 && arrows ? gap : 0,
              }}
              ref={setItemRef(i)}
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
          className={nextArrowClassname}
        />
      )}
    </div>
  );
};

export default ScrollCarousel;
