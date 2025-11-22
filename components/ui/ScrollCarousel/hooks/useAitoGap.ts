import { useEffect, useState } from "react";

export const useAutoGap = (
  wrapperRef: React.RefObject<HTMLDivElement | null>,
  firstItemRef: HTMLDivElement | null,
  slidesToShow: number
) => {
  const [gap, setGap] = useState<number | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !firstItemRef) return;

    const compute = () => {
      const containerWidth = wrapperRef.current!.offsetWidth;
      const slideWidth = firstItemRef.offsetWidth;
      const g =
        (containerWidth - slideWidth * slidesToShow) / (slidesToShow - 1);
      setGap(g > 0 ? g : 0);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [slidesToShow, firstItemRef, wrapperRef]);

  return gap;
};
