import { useState, useEffect } from "react";

const useIsMobileView = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(
    function showScreenSizeOnResize() {
      const showScreenSizeOnScreenChange = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      window.addEventListener("resize", showScreenSizeOnScreenChange);

      return () => {
        window.removeEventListener("resize", showScreenSizeOnScreenChange);
      };
    },
    [breakpoint]
  );

  return isMobile;
};

export default useIsMobileView;
