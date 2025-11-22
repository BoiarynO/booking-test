import { useEffect } from "react";

import findNearestItemInArray from "@/utils/findNearestItemInArray";

const useScrollSnapToItem = ({
  wrapperRef,
  items,
  maxScroll,
  itemWidth,
  scrollScale,
  scrollPos,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  items: React.ReactNode[];
  maxScroll: number;
  itemWidth: number;
  scrollScale: number[];
  scrollPos: number;
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
        scrollPos
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
  }, [scrollPos, items?.length, maxScroll, itemWidth, scrollScale, wrapperRef]);
};

export default useScrollSnapToItem;
