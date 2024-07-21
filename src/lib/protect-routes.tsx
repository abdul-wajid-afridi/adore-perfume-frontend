import { memo, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TUser } from "../api/user/fetchers";

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

export const ProtectAdminRoutes = memo(function ProtectRoutes(
  props: TProtectRouterProps
) {
  const localToken = localStorage.getItem("token");
  const user: TUser = JSON.parse(localStorage.getItem("user") as any);

  return (
    <div>
      {localToken && user?.role === "ADMIN" ? (
        props.children
      ) : (
        <RedirectAfterInterval />
      )}
    </div>
  );
});

export default ProtectRoutes;
