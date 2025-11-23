import { useEffect, useState } from "react";

export const useAutoGap = (
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  firstItemRef: HTMLDivElement | null,
  slidesToShow: number
) => {
  const [gap, setGap] = useState<number>(0);
  const [itemFullWidth, setItemFullWidth] = useState<number>(0);

  useEffect(() => {
    if (!wrapperRef.current || !firstItemRef) return;

    const compute = () => {
      const containerWidth = wrapperRef.current!.offsetWidth ?? 0;
      const slideWidth = firstItemRef.offsetWidth ?? 0;
      const g =
        (containerWidth - slideWidth * slidesToShow) / (slidesToShow - 1);
      const fullItemWidth = slideWidth;
      setItemFullWidth(fullItemWidth > 0 ? fullItemWidth + g : 0);
      setGap(g > 0 ? g : 0);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [slidesToShow, firstItemRef, wrapperRef]);

  return [itemFullWidth, gap];
};
