import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 0;
      setWidth(width);
    };
    const width = typeof window !== "undefined" ? window.innerWidth : 0;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWidth(width);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
};

export default useWindowWidth;
