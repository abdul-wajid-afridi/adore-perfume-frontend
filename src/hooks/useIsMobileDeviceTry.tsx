import { useEffect, useState } from "react";

const useIsMobileDevice = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", () => handleWindowSizeChange());
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setIsMobile(width <= 768 ? true : false);
  }, [width]);

  return isMobile;
};

export default useIsMobileDevice;
