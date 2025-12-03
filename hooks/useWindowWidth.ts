import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      setWidth(width);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

export default useWindowWidth;
