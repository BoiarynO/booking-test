import { useLayoutEffect, useState } from "react";

export const useMaxScrollWidth = (
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  getItemWidths: () => number[],
  gap: number,
  count: number
) => {
  const [maxScroll, setMaxScroll] = useState(0);

  useLayoutEffect(() => {
    if (!wrapperRef.current) {
      return;
    }

    const measure = () => {
      const widths = getItemWidths();
      const total =
        widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, count - 1);
      const containerWidth = wrapperRef.current?.clientWidth ?? 0;
      setMaxScroll(Math.max(0, total - containerWidth));
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [wrapperRef, gap, count, getItemWidths]);

  return maxScroll;
};
