import { useLayoutEffect, useState } from "react";

export const useWindowWidth = () => {
  const getWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 0;

  const [width, setWidth] = useState<number>(getWidth);

  useLayoutEffect(() => {
    const handleResize = () => setWidth(getWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
