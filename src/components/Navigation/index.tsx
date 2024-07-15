import { ChevronLeft } from "lucide-react";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type TNavigationProps = {
  url: string;
};

const Navigation = memo(function Navigation(props: TNavigationProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={useCallback(() => {
        navigate(props.url);
      }, [navigate, props.url])}
      className="absolute top-2 left-2 z-50 h-10 w-10 rounded-full hover: shadow-md hover:scale-105 text-secondary hover:border-primary border-2 hover:text-primary bg-primary hover:bg-secondary grid place-items-center"
    >
      <ChevronLeft />
    </div>
  );
});

export default Navigation;
