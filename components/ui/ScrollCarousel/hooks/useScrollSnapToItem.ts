import { useEffect } from "react";

import findNearestItemInArray from "@/utils/findNearestItemInArray";

export const useScrollSnapToItem = ({
  wrapperRef,
  items,
  maxScroll,
  itemWidth,
  scrollScale,
  scrollPosition,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  items: React.ReactNode[];
  maxScroll: number;
  itemWidth: number;
  scrollScale: number[];
  scrollPosition: number;
}) => {
  useEffect(() => {
    if (!items?.length || !maxScroll || !itemWidth) {
      return;
    }

    let timer = null;
    timer = setTimeout(() => {
      const nearestCoordinate = findNearestItemInArray(
        scrollScale,
        (item: number) => item,
        scrollPosition
      );

      if (nearestCoordinate === scrollScale[scrollScale.length - 1]) {
        return;
      }

      wrapperRef.current?.scrollTo({
        left: nearestCoordinate,
        behavior: "smooth",
      });
    }, 300);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    scrollPosition,
    items?.length,
    maxScroll,
    itemWidth,
    scrollScale,
    wrapperRef,
  ]);
};
