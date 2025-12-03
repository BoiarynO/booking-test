import React, { useRef, useState, useCallback, useMemo } from "react";

import { throttle } from "@/utils/throttle";

import styles from "./ScrollCarousel.module.css";
import { useDragScroll } from "./hooks/useDragScroll";
import { useMaxScrollWidth } from "./hooks/useMaxScrollWidth";
import { getScrollScale } from "./utils/getScrollScale";
import { useItemSizes } from "./hooks/useItemSizes";
import { useScrollSnapToItem } from "./hooks/useScrollSnapToItem";
import { ArrowNext, ArrowPrev } from "./arrows";

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

const defaultGap = 12;

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

  const [scrollPosition, setScrollPosition] = useState(0);

  const [firstItem, setFirstItem] = useState<HTMLDivElement | null>(null);

  const [itemWidth, autoGap] = useItemSizes(
    wrapperRef,
    firstItem,
    slidesToShow
  );
  console.log(autoGap);
  const gap = autoGap ?? defaultGap;
  const lastItemMargin = gap * 2;

  const getLastItemMargin = (index: number) => {
    return index === items.length - 1 && !arrows ? lastItemMargin : 0;
  };

  const { onMouseDown, onMouseMove, endDrag } = useDragScroll(wrapperRef);

  const throttledSetScroll = useMemo(
    () => throttle((value: number) => setScrollPosition(value), 20),
    []
  );

  const handleScroll = useCallback(() => {
    const left = wrapperRef.current?.scrollLeft ?? 0;
    throttledSetScroll(left);
  }, [throttledSetScroll]);

  const getItemWidths = useCallback(() => {
    return itemRefs.current.map((el) => el?.offsetWidth ?? 0);
  }, []);

  const maxScroll = useMaxScrollWidth(
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

  const scrollByItems = useCallback(
    (direction: "left" | "right") => {
      if (!wrapperRef.current) {
        return;
      }

      let delta = 0;
      const count = slidesToScroll;

      for (let i = 0; i < count; i++) {
        const idx = direction === "right" ? slidesToShow + i : i;
        const width = itemRefs.current[idx]?.offsetWidth || 0;
        delta += width + gap;
      }

      const target =
        direction === "right"
          ? Math.min(scrollPosition + delta, maxScroll)
          : Math.max(scrollPosition - delta, 0);

      wrapperRef.current.scrollTo({ left: target, behavior: "smooth" });
    },
    [scrollPosition, maxScroll, slidesToShow, slidesToScroll, gap]
  );

  const scrollScale = useMemo(
    () => getScrollScale(items.length, slidesToShow, itemWidth),
    [items.length, itemWidth, slidesToShow]
  );

  useScrollSnapToItem({
    wrapperRef,
    items,
    maxScroll,
    itemWidth,
    scrollScale,
    scrollPosition,
  });

  return (
    <div className={`${styles.root} ${className}`}>
      {arrows && (
        <ArrowPrev
          onClick={() => scrollByItems("left")}
          disabled={scrollPosition <= 2}
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
        <div className={styles.inner} style={{ gap: gap }}>
          {items.map((el, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                marginRight: getLastItemMargin(i),
              }}
              ref={setItemRef(i)}
            >
              {el}
            </div>
          ))}
        </div>
      </div>

      {arrows && (
        <ArrowNext
          onClick={() => scrollByItems("right")}
          disabled={scrollPosition >= maxScroll - 2}
          customClassName={nextArrowClassname}
        />
      )}
    </div>
  );
};

export default ScrollCarousel;
