import { memo, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectAfterInterval = memo(function RedirectAfterInterval() {
  const navigate = useNavigate();

  useEffect(
    function redirectAfterInterval() {
      const inter = setTimeout(() => {
        navigate("/");
      }, 0);
      return () => clearInterval(inter);
    },
    [navigate]
  );
  return <p>You are not logged in</p>;
});

type TProtectRouterProps = { children: ReactNode };

const ProtectRoutes = memo(function ProtectRoutes(props: TProtectRouterProps) {
  const localToken = localStorage.getItem("token");

  return <div>{localToken ? props.children : <RedirectAfterInterval />}</div>;
});

export default ProtectRoutes;
