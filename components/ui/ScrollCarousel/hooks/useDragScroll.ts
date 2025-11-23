import { useRef } from "react";

export const useDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const drag = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = true;
    startX.current = e.pageX;
    startScroll.current = ref.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current || !ref.current) {
      return;
    }
    ref.current.scrollLeft = startScroll.current - (e.pageX - startX.current);
  };

  const endDrag = () => {
    drag.current = false;
  };

  return { onMouseDown, onMouseMove, endDrag };
};
