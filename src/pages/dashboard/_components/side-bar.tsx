import { memo } from "react";
import Logo from "./logo";
import SideBarRoutes from "./side-bar-routes";
import { DASHBOARD_ROUTES } from "../../../constants/routes";

const SideBar = memo(function SideBar() {
  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto border-r shadow-md">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes routes={DASHBOARD_ROUTES} />
      </div>
    </div>
  );
});

export default SideBar;
